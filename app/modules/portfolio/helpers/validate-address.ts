export const isValidTonAddress = (address: string): boolean => {
    const friendly = /^[A-Za-z0-9_-]{48}$/.test(address)
    const raw = /^-?[0-9]:[0-9a-fA-F]{64}$/.test(address)
    return friendly || raw
}
