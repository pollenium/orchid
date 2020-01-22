import { ORDER_TYPE } from '../enums'
import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'

export interface OrderInterface {
  prevBlockHash: Bytes32,
  type: ORDER_TYPE,
  quotToken: Address,
  variToken: Address,
  priceNumer: Uint256,
  priceDenom: Uint256,
  tokenLimit: Uint256,
}
