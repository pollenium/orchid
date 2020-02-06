import { ORDER_TYPE } from '../enums'
import { Bytes, Address, Bytes32, Uint8, Uint256 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'
import { Order } from './Order'
import { OrderInterface } from '../interfaces/Order'
import { SignedOrderInterface } from '../interfaces/SignedOrder'
import { Uu } from 'pollenium-uvaursi'

export class SignedOrder extends Order implements SignedOrderInterface {

  private trader: Address;
  private ligma: Bytes;

  constructor(orderStruct: OrderInterface, public signature: Signature) {
    super(orderStruct)
  }

  getTrader(): Address {
    if (this.trader) {
      return this.trader
    }
    this.trader = this.signature.getSigner(this.getSugmaHash())
    return this.trader
  }

  public getEthersArg(): any {
    return [
      this.getTrader().uu.toPhex(),
      this.quotToken.uu.toPhex(),
      this.variToken.uu.toPhex(),
      this.priceNumer.uu.toPhex(),
      this.priceDenom.uu.toPhex(),
      this.tokenLimit.uu.toPhex(),
      this.signature.v.toNumber(),
      this.signature.r.uu.toPhex(),
      this.signature.s.uu.toPhex()
    ]
  }

  public getLigma(): Bytes {
    if (this.ligma) {
      return this.ligma
    }
    this.ligma = new Bytes(Uu.genConcat([
      this.prevBlockHash,
      Uint8.fromNumber(this.type),
      this.quotToken,
      this.variToken,
      this.priceNumer,
      this.priceDenom,
      this.tokenLimit,
      this.signature.v,
      this.signature.r,
      this.signature.s
    ]))
    return this.ligma

  }

  static fromLigma(ligma: Bytes): SignedOrder {
    const prevBlockHash = new Bytes32(ligma.u.slice(0, 32))
    const type: ORDER_TYPE = ligma.u[32]
    const quotToken = new Address(ligma.u.slice(33, 53))
    const variToken = new Address(ligma.u.slice(53, 73))
    const priceNumer = new Uint256(ligma.u.slice(73, 105))
    const priceDenom = new Uint256(ligma.u.slice(105, 137))
    const tokenLimit = new Uint256(ligma.u.slice(137, 169))
    const signatureV = new Uint8(ligma.u.slice(169, 170))
    const signatureR = new Bytes32(ligma.u.slice(170, 202))
    const signatureS = new Bytes32(ligma.u.slice(202, 234))

    const orderStruct = {
      prevBlockHash,
      type,
      quotToken,
      variToken,
      priceNumer,
      priceDenom,
      tokenLimit
    }
    const signature = new Signature({
      v: signatureV,
      r: signatureR,
      s: signatureS
    })
    return new SignedOrder(orderStruct, signature)
  }

}
