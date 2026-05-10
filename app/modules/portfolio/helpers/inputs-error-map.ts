export type ErrorKey = 'invalid-ton' | 'already-added' | 'invalid-eth' | 'error'

export const errorMap: Record<ErrorKey, string> = {
    'invalid-ton': 'Invalid TON address',
    'already-added': 'This wallet has already been added.',
    'invalid-eth': 'Invalid ETH address',
    'error': 'Unknown error',
}
