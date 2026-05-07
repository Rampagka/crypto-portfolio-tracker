import type { Chain } from '~/common/models/types/networks.type'

export const truncWalletAddress = (
    chain: Chain,
    address: string,
    symbols: number = 4,
    divider: string = '...',
): string => {
    if (chain === 'ton') {
        return address.slice(0, symbols) + divider + address.slice(-symbols, address.length)
    } else {
        return address
    }
}
