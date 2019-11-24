import { ORDER_TYPE } from '../enums'
import { Address, Uint256 } from 'pollenium-buttercup'

export interface OrderInterface {
  type: ORDER_TYPE,
  quotToken: Address,
  variToken: Address,
  originator: Address,
  priceNumer: Uint256,
  priceDenom: Uint256,
  tokenLimit: Uint256,
  expiration: Uint256,
  salt: Uint256,
}
