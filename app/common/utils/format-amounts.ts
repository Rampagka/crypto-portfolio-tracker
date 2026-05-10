const fmtUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'trunc',
} as Intl.NumberFormatOptions)

const fmtPercent = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'percent',
    roundingMode: 'trunc',
} as Intl.NumberFormatOptions)

const fmtDecimal = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    roundingMode: 'trunc',
} as Intl.NumberFormatOptions)

export const getFormattedAmount = (amount: number, currency: string | null = null): string => {
    if (currency === 'USD') return fmtUSD.format(amount)
    if (currency === '%') return fmtPercent.format(amount)
    const formatted = fmtDecimal.format(amount)
    return currency ? `${formatted} ${currency}` : formatted
}
