export const getFormattedAmount = (amount: number, currency: string | null = null): string => {
    // 1. Если это USD, используем стандартный валютный формат
    if (currency === 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            roundingMode: 'trunc',
        }).format(amount)
    }

    if (currency === '%') {
        return new Intl.NumberFormat('en-US', {
            style: 'unit',
            unit: 'percent',
            roundingMode: 'trunc',
        }).format(amount)
    }

    // 2. Для всего остального (TON, ETH и т.д.) форматируем только число
    const formattedNumber = new Intl.NumberFormat('en-US', {
        style: 'decimal', // Просто число с запятыми
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        roundingMode: 'trunc',
    }).format(amount)

    return currency ? `${formattedNumber} ${currency}` : formattedNumber
}
