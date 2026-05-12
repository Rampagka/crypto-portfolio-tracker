export type ErrorKey = 'invalid-ton' | 'already-added' | 'invalid-eth' | 'error' | 'max-wallets'

export const errorMap: Record<ErrorKey, string> = {
    'invalid-ton': 'Invalid TON address',
    'already-added': 'This wallet has already been added.',
    'invalid-eth': 'Invalid ETH address',
    'max-wallets': 'You already have the maximum number of wallets',
    error: 'Unknown error',
}
