import type { PortfolioData } from '@/modules/portfolio/models/interfaces/portfolio.interface'

import type { Chain } from '~/common/models/types/networks.type'

export const fetchPortfolio = (address: string, chain: Chain, name: string) => {
    return $fetch<PortfolioData | null>(`/api/portfolio/${address}`, {
        query: { chain, name },
    })
}
