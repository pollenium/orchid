import { ORDER_TYPE } from '../enums'
import { ORDER_ENCODING_PREFIX } from '../constants'
import { Bytes, Bytes20, Bytes32, Uint8, Uint256 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'
import { Order } from './Order'
import { OrderInterface } from '../interfaces/Order'
import { SignedOrderInterface } from '../interfaces/SignedOrder'
import crypto from 'crypto'

export class SignedOrder extends Order implements SignedOrderInterface {

  private encoding: Bytes;
  private encodingHash: Bytes32;
  private isValidSignature: boolean;

  constructor(orderStruct: OrderInterface, public signature: Signature) {
    super(orderStruct)
  }

  private getEncoding(): Bytes {
    if (this.encoding) {
      return this.encoding
    }
    this.encoding = ORDER_ENCODING_PREFIX.getCasted(Bytes)
      .getAppended(Uint8.fromArray([this.type]))
      .getAppended(this.quotToken)
      .getAppended(this.variToken)
      .getAppended(this.originator)
      .getAppended(this.tokenLimit)
      .getAppended(this.priceNumer)
      .getAppended(this.priceDenom)
      .getAppended(this.expiration)
      .getAppended(this.salt)
    return this.encoding
  }

  private getEncodingHash(): Bytes32 {
    if (this.encodingHash) {
      return this.encodingHash
    }
    this.encodingHash = Bytes32.fromBuffer(
      crypto.createHash('sha256').update(this.getEncoding().getBuffer()).digest()
    )
    return this.encodingHash
  }

  getIsValidSignature(): boolean {
    if (this.isValidSignature) {
      return this.isValidSignature
    }
    const signer = this.signature.getSigner(this.getEncodingHash())
    this.isValidSignature = signer.getIsEqual(this.originator)
    return this.isValidSignature
  }


}
