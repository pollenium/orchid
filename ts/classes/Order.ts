import { Bytes20, Uint256, Bytes, Bytes1 } from 'pollenium-buttercup'
import { Ilex } from 'pollenium-ilex'
import { PERSONAL_MESSAGE_PREFIX } from '../constants'
import { ORDER_TYPE } from '../enums'
import { OrderStruct } from '../interfaces/OrderStruct'

export class Order implements OrderStruct {

  public type: ORDER_TYPE;
  public quotToken: Bytes20;
  public variToken: Bytes20;
  public originator: Bytes20;
  public tokenLimit: Uint256;
  public priceNumer: Uint256;
  public priceDenom: Uint256;
  public expiration: Uint256;
  public salt: Uint256;


  constructor(public struct: OrderStruct) {
    Object.assign(this, struct)
  }

  getPersonalMessage(): Bytes {
    return PERSONAL_MESSAGE_PREFIX
      .getAppended(Bytes1.fromArray([this.type]))
      .getAppended(this.quotToken)
      .getAppended(this.variToken)
      .getAppended(this.originator)
      .getAppended(this.tokenLimit)
      .getAppended(this.priceNumer)
      .getAppended(this.priceDenom)
      .getAppended(this.expiration)
      .getAppended(this.salt)
  }

  getTokenUnfilled(tokenFilled: Uint256): Uint256 {
    return this.tokenLimit.sub(tokenFilled)
  }

  getTokenAvail(tokenFilled: Uint256, tokenBalance: Uint256): Uint256 {
    const tokenUnfilled = this.getTokenUnfilled(tokenFilled)
    if (tokenUnfilled.lt(tokenBalance)) {
      return tokenUnfilled
    } else {
      return tokenBalance
    }
  }

}
