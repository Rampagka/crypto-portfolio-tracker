import { getAddress, isAddress } from 'viem'

class EthAddress {
    validate(address: string): boolean {
        if (!isAddress(address)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid ETH address' })
        }
        return true
    }

    toChecksum(address: string): string {
        return getAddress(address) // EIP-55: 0xabc... → 0xAbC...
    }

    toRaw(address: string): string {
        return address.toLowerCase()
    }
}

export default new EthAddress()
