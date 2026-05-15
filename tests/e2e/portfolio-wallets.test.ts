import { PortfolioPage } from './pages/portfolio.page'

import { expect, test } from '@playwright/test'

const TON_ADDRESS = 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2'
const ETH_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

test.describe('Portfolio wallet management', () => {
    let portfolio: PortfolioPage

    test.beforeEach(async ({ page }) => {
        portfolio = new PortfolioPage(page)
        await portfolio.goto('ton')
    })

    test('add ton wallet with invalid address', async () => {
        await expect(portfolio.addressInput).toBeVisible()
        await expect(portfolio.addButton).toHaveAttribute('disabled')

        await portfolio.addressInput.fill('no-valid-address')
        await expect(portfolio.addButton).not.toHaveAttribute('disabled')
        await portfolio.addButton.click()

        await expect(portfolio.inputError).toBeVisible()
        await expect(portfolio.inputError).toHaveText('! Invalid TON address')

        await portfolio.addressInput.fill('')
        await expect(portfolio.inputError).not.toBeVisible()
    })

    test('add ton wallet with valid address', async () => {
        await portfolio.mockPortfolioApi(TON_ADDRESS, 'ton')

        await expect(portfolio.addressInput).toBeVisible()
        await expect(portfolio.addButton).toHaveAttribute('disabled')

        await portfolio.addressInput.fill(TON_ADDRESS)
        await expect(portfolio.addButton).not.toHaveAttribute('disabled')
        await portfolio.addButton.click()

        await expect(portfolio.addWalletModal).toBeVisible()
        await expect(portfolio.addWalletBtn).not.toHaveAttribute('disabled')
        await portfolio.addWalletBtn.click()

        await expect(portfolio.addWalletModal).not.toBeVisible()
        await expect(portfolio.walletItems).toHaveCount(1)
    })

    test('switch chain tab from ton to eth', async () => {
        await expect(portfolio.tonTab).toBeVisible()
        await expect(portfolio.ethTab).toBeVisible()

        // TON is active initially
        await expect(portfolio.tonTab).toContainClass('text-accent')
        await expect(portfolio.ethTab).toContainClass('text-mute')
        await expect(portfolio.addressInput).toHaveAttribute('placeholder', 'Paste TON address...')

        await portfolio.ethTab.click()
        await expect(portfolio.page).toHaveURL('/portfolio/eth')

        // ETH is active after switching
        await expect(portfolio.ethTab).toContainClass('text-accent')
        await expect(portfolio.tonTab).toContainClass('text-mute')
        await expect(portfolio.addressInput).toHaveAttribute('placeholder', 'Paste ETH address...')
    })

    test('add wallet in both ton and eth networks', async () => {
        await portfolio.mockPortfolioApi(TON_ADDRESS, 'ton')
        await portfolio.mockPortfolioApi(ETH_ADDRESS, 'eth')

        // Add TON wallet
        await portfolio.addressInput.fill(TON_ADDRESS)
        await portfolio.addButton.click()

        await expect(portfolio.addWalletModal).toBeVisible()
        await portfolio.addWalletBtn.click()
        await expect(portfolio.addWalletModal).not.toBeVisible()

        await expect(portfolio.walletItems).toHaveCount(1)
        await expect(portfolio.addressInput).toHaveValue('')

        // Switch to ETH — TON wallets should not appear
        await portfolio.ethTab.click()
        await expect(portfolio.page).toHaveURL('/portfolio/eth')
        await expect(portfolio.walletItems).toHaveCount(0)

        // Add ETH wallet
        await portfolio.addressInput.fill(ETH_ADDRESS)
        await portfolio.addButton.click()

        await expect(portfolio.addWalletModal).toBeVisible()
        await portfolio.addWalletBtn.click()
        await expect(portfolio.addWalletModal).not.toBeVisible()

        await expect(portfolio.walletItems).toHaveCount(1)
        await expect(portfolio.addressInput).toHaveValue('')
    })
})
