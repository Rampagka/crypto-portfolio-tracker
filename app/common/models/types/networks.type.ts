export const NETWORKS = {
    ton: 'TON',
    eth: 'ETH',
} as const

export type Chain = keyof typeof NETWORKS // "ton" | "eth"
export type NetworkName = (typeof NETWORKS)[Chain] // "TON" | "ETH"
