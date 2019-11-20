import { ORDER_TYPE } from '../enums'
import { Bytes20, Uint256 } from 'pollenium-buttercup'
import { Order } from './Order'
import { ChainState } from '../interfaces/ChainState'
import { Solution } from '../interfaces/Solution'
import Bn from 'bn.js'

export class OrderPair {

  public quotToken: Bytes20;
  public variToken: Bytes20;

  constructor(
    public buyyOrder: Order,
    public sellOrder: Order
  ) {
    this.quotToken = this.buyyOrder.quotToken,
    this.variToken = this.buyyOrder.variToken
  }

  getSolution(chainState: ChainState): Solution {

    const quotTokenAvail = this.buyyOrder.getTokenAvail(
      chainState.buyyOrderTokenFilled,
      chainState.buyyOrderTokenBalance
    )
    const variTokenAvail = this.buyyOrder.getTokenAvail(
      chainState.buyyOrderTokenFilled,
      chainState.buyyOrderTokenBalance
    )

    const buyyOrderVariTokenTransMax
      = quotTokenAvail
        .mul(this.sellOrder.priceDenom)
        .divDn(this.sellOrder.priceDenom)

    console.log('buyyOrderVariTokenTransMax', buyyOrderVariTokenTransMax.getNumber())

    const variTokenTransMax
      = (buyyOrderVariTokenTransMax < variTokenAvail)
      ? buyyOrderVariTokenTransMax
      : variTokenAvail

    console.log('variTokenTransMax', variTokenTransMax.getNumber())

    const variTokenTransRemainder = Uint256.fromNumber(0)

    const variTokenTrans = variTokenTransMax.sub(variTokenTransRemainder)

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
