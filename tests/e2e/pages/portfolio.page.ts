import { type Page, expect } from '@playwright/test'

type Chain = 'ton' | 'eth'

export class PortfolioPage {
    constructor(public readonly page: Page) {}

    // Derived from page.url() — Playwright equivalent of route.path
    get chain(): Chain {
        const match = this.page.url().match(/\/portfolio\/(ton|eth)/)
        return (match?.[1] ?? 'ton') as Chain
    }

    // :visible needed because portfolio-content.vue renders two <app-tabs> (mobile + desktop)
    get tonTab() {
        return this.page.locator('[data-test="tab-ton"]:visible')
    }

    get ethTab() {
        return this.page.locator('[data-test="tab-eth"]:visible')
    }

    get addressInput() {
        return this.page.getByPlaceholder(`Paste ${this.chain.toUpperCase()} address...`)
    }

    get addButton() {
        return this.page.getByText('+ Add')
    }

    get walletItems() {
        return this.page.locator('[data-test="wallet-item"]')
    }

    get addWalletModal() {
        return this.page.locator('[data-test="add-wallet-modal"]')
    }

    get addWalletBtn() {
        return this.page.locator('[data-test="add-wallet-btn"]')
    }

    get inputError() {
        return this.page.locator('.input-error')
    }

    async goto(chain: Chain = 'ton') {
        await this.page.goto(`/portfolio/${chain}`)
        await this.expectLoaded()
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(`/portfolio/${this.chain}`)
        await expect(this.page.getByTestId('portfolio')).toBeVisible()
    }

    async mockPortfolioApi(address: string, chain: Chain) {
        await this.page.route(`/api/portfolio/${address}**`, (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: `mock-${chain}-wallet`,
                    name: 'MyWallet',
                    chain,
                    address: { raw: address, friendly: address },
                    totalBalanceUsd: 100,
                    totalDiff24h: 2.5,
                    nativeToken: {
                        symbol: chain === 'ton' ? 'TON' : 'ETH',
                        amount: 10,
                        priceUsd: chain === 'ton' ? 3 : 3000,
                        change24h: 0.5,
                    },
                    topTokens: [],
                }),
            }),
        )
    }
}
