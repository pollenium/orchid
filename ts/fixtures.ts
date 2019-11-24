import { Address, Uint256 } from 'pollenium-buttercup'
import crypto from 'crypto'

export const alice = Address.fromBuffer(crypto.randomBytes(20))
export const bob = Address.fromBuffer(crypto.randomBytes(20))
export const dai = Address.fromBuffer(crypto.randomBytes(20))
export const usdc = Address.fromBuffer(crypto.randomBytes(20))
export const weth = Address.fromBuffer(crypto.randomBytes(20))
export const mkr = Address.fromBuffer(crypto.randomBytes(20))
export const nullAddress = Address.genNull()
export const uint256Zero = Uint256.fromNumber(0)
