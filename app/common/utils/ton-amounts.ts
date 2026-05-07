export const fromNano = (amount: number | string, decimals: number): number => {
    let correctAmount = 0

    if (typeof amount === 'string') correctAmount = Number(amount)
    if (typeof amount === 'number') correctAmount = amount

    return correctAmount / Math.pow(10, decimals)
}

export const toNano = (amount: number | string, decimals: number): number => {
    let correctAmount = 0

    if (typeof amount === 'string') correctAmount = Number(amount)
    if (typeof amount === 'number') correctAmount = amount

    return correctAmount * Math.pow(10, decimals)
}
