import { Bytes20, Uint256, Uint8, Bytes32 } from 'pollenium-buttercup'
import { SignedOrder } from './SignedOrder'
import { OrderPair } from './OrderPair'
import { ChainState } from '../interfaces/ChainState'
import { ORDER_TYPE } from '../enums' 

export class SignedOrderPair extends OrderPair {

  private Bytes20Vars: Bytes20[];
  private uint256Vars: Uint256[];
  private uint008Vars: Uint8[];
  private bytes32Vars: Bytes32[];

  constructor(
    public buyyOrder: SignedOrder,
    public sellOrder: SignedOrder
  ) {
    super(buyyOrder, sellOrder)
  }
  getBytes20Vars(): Bytes20[] {
    if (this.Bytes20Vars) {
      return this.Bytes20Vars
    }
    this.Bytes20Vars = [
      this.quotToken,
      this.variToken,
      this.buyyOrder.originator,
      this.sellOrder.originator
    ]
    return this.Bytes20Vars
  }
  getUint256Vars(chainState: ChainState): Uint256[] {

    if (this.uint256Vars) {
      return this.uint256Vars
    }

    const solution = this.getSolution(chainState)

    this.uint256Vars = [
      solution.quotTokenTrans,
      solution.variTokenTrans,
      solution.quotTokenArbit,
      this.buyyOrder.tokenLimit,
      this.buyyOrder.priceNumer,
      this.buyyOrder.priceDenom,
      this.buyyOrder.expiration,
      this.buyyOrder.salt,
      this.sellOrder.tokenLimit,
      this.sellOrder.priceNumer,
      this.sellOrder.priceDenom,
      this.sellOrder.expiration,
      this.sellOrder.salt
    ]
    return this.uint256Vars
  }
  getUint008Vars(): Uint8[] {
    if (this.uint008Vars) {
      return this.uint008Vars
    }
    this.uint008Vars = [
      this.buyyOrder.signature.v,
      this.buyyOrder.signature.v
    ]
    return this.uint008Vars
  }
  getBytes32Vars(): Bytes32[] {
    if (this.bytes32Vars) {
      return this.bytes32Vars
    }
    this.bytes32Vars = [
      this.buyyOrder.signature.r,
      this.buyyOrder.signature.s,
      this.sellOrder.signature.r,
      this.sellOrder.signature.s,
    ]
    return this.bytes32Vars
  }
}
