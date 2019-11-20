import { ORDER_TYPE } from '../enums'
import { Bytes20, Uint256 } from 'pollenium-buttercup'

export interface OrderStruct {
  type: ORDER_TYPE,
  quotToken: Bytes20,
  variToken: Bytes20,
  originator: Bytes20,
  priceNumer: Uint256,
  priceDenom: Uint256,
  tokenLimit: Uint256,
  expiration: Uint256,
  salt: Uint256,
}
