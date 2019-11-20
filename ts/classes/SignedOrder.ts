import { ORDER_TYPE } from '../enums'
import { Bytes20, Uint256 } from 'pollenium-buttercup'
import { Ilex } from 'pollenium-ilex'
import { Order } from './Order'
import { OrderStruct } from '../interfaces/OrderStruct'

export class SignedOrder extends Order {

  constructor(struct: OrderStruct, public signature: Ilex) {
    super(struct)
  }

  static fromOrder(order: Order, signature: Ilex) {
    return new SignedOrder(order.struct, signature)
  }

}
