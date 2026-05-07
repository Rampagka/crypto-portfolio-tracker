import { Address } from '@ton/core'

interface AddressError {
    message: string
}

class TonAddress {
    parseAddress(address: string): Address | AddressError {
        if (!this.validate(address)) return new Error('Not a valid address')

        return Address.parse(address)
    }

    toFriendly(raw: string): string {
        this.validate(raw)
        if (!Address.isRaw(raw) && Address.isFriendly(raw)) return raw

        const address = this.parseAddress(raw) as Address
        return address.toString({ bounceable: false, urlSafe: true })
    }

    validate(address: string): boolean {
        try {
            Address.parse(address)
            return true
        } catch {
            throw createError({ statusCode: 400, statusMessage: 'Invalid address' })
        }
    }

    isTestnet(address: string): boolean {
        if (!Address.isFriendly(address)) return false
        return Address.parseFriendly(address).isTestOnly
    }
}

export default new TonAddress()
