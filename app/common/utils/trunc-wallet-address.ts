import type { Chain } from '~/common/models/types/networks.type'

export const truncWalletAddress = (
    chain: Chain,
    address: string,
    divider: string = '...',
): string => {
    switch (chain) {
        case 'ton':
            return address.slice(0, 4) + divider + address.slice(-4)
        case 'eth':
            return address.slice(0, 6) + divider + address.slice(-4)
    }
}
