import PortfolioContent from '~/modules/portfolio/components/portfolio-content.vue'

import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const navigateToMock = vi.hoisted(() => vi.fn())
mockNuxtImport('navigateTo', () => navigateToMock)

describe('portfolio-content', () => {
    beforeEach(() => {
        navigateToMock.mockClear()
    })

    it('redirects to ton on invalid chain', async () => {
        await mountSuspended(PortfolioContent, { route: '/portfolio/btc' })
        expect(navigateToMock).toHaveBeenCalledWith('/portfolio/ton', { replace: true })
    })

    it('does not redirect on valid chain', async () => {
        await mountSuspended(PortfolioContent, { route: '/portfolio/eth' })
        expect(navigateToMock).not.toHaveBeenCalled()
    })

    it('does not redirect when no chain param', async () => {
        await mountSuspended(PortfolioContent, { route: '/portfolio' })
        expect(navigateToMock).not.toHaveBeenCalled()
    })
})
