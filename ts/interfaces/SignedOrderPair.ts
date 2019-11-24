import { SignedOrder } from '../classes/SignedOrder'

export interface SignedOrderPairInterface {
  buyyOrder: SignedOrder;
  sellOrder: SignedOrder;
}
