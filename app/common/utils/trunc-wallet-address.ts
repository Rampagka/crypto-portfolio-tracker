import type { Chain } from '~/common/models/types/networks.type'

export const truncWalletAddress = (
    chain: Chain,
    address: string,
    symbols: number = 4,
    divider: string = '...',
): string => {
    switch (chain) {
        case 'ton':
            return address.slice(0, symbols) + divider + address.slice(-symbols)
        case 'eth':
            return address.slice(0, 6) + divider + address.slice(-4)
    }
}
