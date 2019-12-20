import { Address, Uint256, Bytes, Bytes1, Bytes32, Uint8 } from 'pollenium-buttercup'
import { ORDER_TYPE } from '../enums'
import { OrderInterface } from '../interfaces/Order'
import crypto from 'crypto'

export class Order implements OrderInterface {

  public type: ORDER_TYPE;
  public prevBlockHash: Bytes32;
  public quotToken: Address;
  public variToken: Address;
  public originator: Address;
  public tokenLimit: Uint256;
  public priceNumer: Uint256;
  public priceDenom: Uint256;
  public expiration: Uint256;
  public salt: Uint256;

  private anchor: Bytes;
  private anchorHash: Bytes32;
  private encoding: Bytes;
  private encodingHash: Bytes32;

  constructor(struct: OrderInterface) {
    Object.assign(this, struct)

    if (this.quotToken.getIsEqual(this.variToken)) {
      throw new QuotVariTokenMatchError(this.quotToken)
    }

    if (this.quotToken.getIsNull()) {
      throw new NullQuotTokenError
    }

    if (this.variToken.getIsNull()) {
      throw new NullVariTokenError
    }

    if (this.originator.getIsNull()) {
      throw new NullOriginatorError
    }

    if (this.tokenLimit.getIsZero()) {
      throw new ZeroTokenLimitError
    }

    if (this.priceNumer.getIsZero()) {
      throw new ZeroPriceNumerError
    }

    if (this.priceDenom.getIsZero()) {
      throw new ZeroPriceDenomError
    }

    if (this.expiration.getIsZero()) {
      throw new ZeroExpirationError
    }

    if (this.salt.getIsZero()) {
      throw new ZeroSaltError
    }

  }

  getAnchor(): Bytes {
    if (this.anchor) {
      return this.anchor
    }
    this.anchor = Bytes.fromArray([])
      .getAppended(this.prevBlockHash)
      .getAppended(this.quotToken)
      .getAppended(this.variToken)
    return this.anchor
  }

  getAnchorHash(): Bytes32 {
    if (this.anchorHash) {
      return this.anchorHash
    }
    this.anchorHash = Bytes32.fromBuffer(
      crypto.createHash('sha256').update(this.getAnchor().getBuffer()).digest()
    )
    return this.anchorHash
  }

  private getEncoding(): Bytes {
    if (this.encoding) {
      return this.encoding
    }
    this.encoding = Bytes.fromArray([])
      .getAppended(this.getAnchor())
      .getAppended(Uint8.fromNumber(this.type))
      .getAppended(this.priceNumer)
      .getAppended(this.priceDenom)
      .getAppended(this.tokenLimit)
    return this.encoding
  }

  getEncodingHash(): Bytes32 {
    if (this.encodingHash) {
      return this.encodingHash
    }
    this.encodingHash = Bytes32.fromBuffer(
      crypto.createHash('sha256').update(this.getEncoding().getBuffer()).digest()
    )
    return this.encodingHash
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

export class QuotVariTokenMatchError extends Error {
  constructor(token) {
    super(`quotToken and variToken should be different, received ${token.getHex()} for both`)
    Object.setPrototypeOf(this, QuotVariTokenMatchError.prototype)
  }
}

class NullError extends Error {
  constructor(variableName: string) {
    super(`${variableName} should not be null`)
  }
}

class ZeroError extends Error {
  constructor(variableName: string) {
    super(`${variableName} should not be zero`)
  }
}

export class NullQuotTokenError extends NullError {
  constructor() {
    super('quotToken')
    Object.setPrototypeOf(this, NullQuotTokenError.prototype)
  }
}

export class NullVariTokenError extends NullError {
  constructor() {
    super('variToken')
    Object.setPrototypeOf(this, NullVariTokenError.prototype)
  }
}

export class NullOriginatorError extends NullError {
  constructor() {
    super('originator')
    Object.setPrototypeOf(this, NullOriginatorError.prototype)
  }
}

export class ZeroTokenLimitError extends ZeroError {
  constructor() {
    super('tokenLimit')
    Object.setPrototypeOf(this, ZeroTokenLimitError.prototype)
  }
}

export class ZeroPriceNumerError extends ZeroError {
  constructor() {
    super('priceNumer')
    Object.setPrototypeOf(this, ZeroPriceNumerError.prototype)
  }
}

export class ZeroPriceDenomError extends ZeroError {
  constructor() {
    super('priceDenom')
    Object.setPrototypeOf(this, ZeroPriceDenomError.prototype)
  }
}

export class ZeroExpirationError extends ZeroError {
  constructor() {
    super('expiration')
    Object.setPrototypeOf(this, ZeroExpirationError.prototype)
  }
}

export class ZeroSaltError extends ZeroError {
  constructor() {
    super('salt')
    Object.setPrototypeOf(this, ZeroSaltError.prototype)
  }
}
