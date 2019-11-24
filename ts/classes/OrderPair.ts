import { ORDER_TYPE } from '../enums'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Order } from './Order'
import { ChainStateInterface } from '../interfaces/ChainState'
import { SolutionInterface } from '../interfaces/Solution'
import { OrderPairInterface } from '../interfaces/OrderPair'
import Bn from 'bn.js'

export class OrderPair implements OrderPairInterface {

  public buyyOrder: Order;
  public sellOrder: Order;
  public quotToken: Address;
  public variToken: Address;

  constructor(struct: OrderPairInterface) {

    Object.assign(this, struct)

    if (this.buyyOrder.type !== ORDER_TYPE.BUYY) {
      throw new InvalidBuyyOrderTypeError()
    }

    if (this.sellOrder.type !== ORDER_TYPE.SELL) {
      throw new InvalidSellOrderTypeError()
    }

    if (!this.buyyOrder.quotToken.getIsEqual(this.sellOrder.quotToken)) {
      throw new QuotTokenMismatchError()
    }

    if (!this.buyyOrder.variToken.getIsEqual(this.sellOrder.variToken)) {
      throw new VariTokenMismatchError()
    }

    if (
      this.buyyOrder.priceNumer.mul(this.sellOrder.priceDenom)
        .lt(
          this.buyyOrder.priceDenom.mul(this.sellOrder.priceNumer)
        )
    ) {
      throw new PriceConstraintError
    }

    this.quotToken = this.buyyOrder.quotToken,
    this.variToken = this.buyyOrder.variToken
  }

  getSolution(chainState: ChainStateInterface): SolutionInterface {

    const quotTokenAvail = this.buyyOrder.getTokenAvail(
      chainState.buyyOrderTokenFilled,
      chainState.buyyOrderTokenBalance
    )
    const variTokenAvail = this.sellOrder.getTokenAvail(
      chainState.buyyOrderTokenFilled,
      chainState.buyyOrderTokenBalance
    )

    const buyyOrderVariTokenTransMax
      = quotTokenAvail
        .mul(this.buyyOrder.priceDenom)
        .divDn(this.buyyOrder.priceNumer)

    const variTokenTrans
      = (buyyOrderVariTokenTransMax.lt(variTokenAvail))
      ? buyyOrderVariTokenTransMax
      : variTokenAvail

    const quotTokenTrans
      = variTokenTrans
        .mul(this.sellOrder.priceNumer)
        .divDn(this.sellOrder.priceDenom)

    const quotTokenArbit
      = variTokenTrans
        .mul(this.buyyOrder.priceNumer)
        .divDn(this.buyyOrder.priceDenom)
        .sub(quotTokenTrans)

    return {
      quotTokenTrans,
      quotTokenArbit,
      variTokenTrans
    }
  }
}

export class InvalidBuyyOrderTypeError extends Error {
  constructor() {
    super('buyyOrder has invalid type')
    Object.setPrototypeOf(this, InvalidBuyyOrderTypeError.prototype)
  }
}

export class InvalidSellOrderTypeError extends Error {
  constructor() {
    super('sellOrder has invalid type')
    Object.setPrototypeOf(this, InvalidSellOrderTypeError.prototype)
  }
}

export class QuotTokenMismatchError extends Error {
  constructor() {
    super('quotToken mismatch')
    Object.setPrototypeOf(this, QuotTokenMismatchError.prototype)
  }
}

export class VariTokenMismatchError extends Error {
  constructor() {
    super('variToken mismatch')
    Object.setPrototypeOf(this, VariTokenMismatchError.prototype)
  }
}

export class PriceConstraintError extends Error {
  constructor() {
    super('buyy order price should not be less than sell order price')
    Object.setPrototypeOf(this, PriceConstraintError.prototype)
  }
}
