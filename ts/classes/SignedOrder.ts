import { ORDER_TYPE } from '../enums'
import { Bytes, Address, Bytes32, Uint8, Uint256 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'
import { Order } from './Order'
import { OrderInterface } from '../interfaces/Order'
import { SignedOrderInterface } from '../interfaces/SignedOrder'

export class SignedOrder extends Order implements SignedOrderInterface {

  private isValidSignature: boolean;

  constructor(orderStruct: OrderInterface, public signature: Signature) {
    super(orderStruct)
    if (!this.getIsValidSignature()) {
      throw new InvalidSignatureError
    }
  }

  private getIsValidSignature(): boolean {
    if (this.isValidSignature) {
      return this.isValidSignature
    }
    const signer = this.signature.getSigner(this.getEncodingHash())
    this.isValidSignature = signer.getIsEqual(this.originator)
    return this.isValidSignature
  }

}

export class InvalidSignatureError extends Error {
  constructor() {
    super('Invalid signature')
    Object.setPrototypeOf(this, InvalidSignatureError.prototype)
  }
}
