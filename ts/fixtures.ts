import { Address, Uint256 } from 'pollenium-buttercup'
import { ORDER_TYPE } from './enums'
import crypto from 'crypto'
import { Keypair } from 'pollenium-ilex'

export const alice = Address.fromBuffer(crypto.randomBytes(20))
export const bob = Address.fromBuffer(crypto.randomBytes(20))
export const dai = Address.fromBuffer(crypto.randomBytes(20))
export const usdc = Address.fromBuffer(crypto.randomBytes(20))
export const weth = Address.fromBuffer(crypto.randomBytes(20))
export const mkr = Address.fromBuffer(crypto.randomBytes(20))
export const nullAddress = Address.genNull()
export const uint256Zero = Uint256.fromNumber(0)

export const keypair = Keypair.generate()

export const validOrderStruct = {
  type: ORDER_TYPE.BUYY,
  quotToken: usdc,
  variToken: weth,
  originator: keypair.getAddress(),
  tokenLimit: Uint256.fromNumber(1),
  priceNumer: Uint256.fromNumber(1),
  priceDenom: Uint256.fromNumber(1),
  expiration: Uint256.fromNumber(1),
  salt: Uint256.fromNumber(1)
}
