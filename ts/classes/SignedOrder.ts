import { ORDER_TYPE } from '../enums'
import { Bytes, Address, Bytes32, Uint8, Uint256 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'
import { Order } from './Order'
import { OrderInterface } from '../interfaces/Order'
import { SignedOrderInterface } from '../interfaces/SignedOrder'

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
      this.getTrader().getPhex(),
      this.quotToken.getPhex(),
      this.variToken.getPhex(),
      this.priceNumer.getPhex(),
      this.priceDenom.getPhex(),
      this.tokenLimit.getPhex(),
      this.signature.v.getNumber(),
      this.signature.r.getPhex(),
      this.signature.s.getPhex()
    ]
  }

  public getLigma(): Bytes {
    if (this.ligma) {
      return this.ligma
    }
    this.ligma = Bytes.fromArray([])
      .getAppended(this.prevBlockHash)
      .getAppended(Uint8.fromNumber(this.type))
      .getAppended(this.quotToken)
      .getAppended(this.variToken)
      .getAppended(this.priceNumer)
      .getAppended(this.priceDenom)
      .getAppended(this.tokenLimit)
      .getAppended(this.signature.v)
      .getAppended(this.signature.r)
      .getAppended(this.signature.s)
    return this.ligma

  }

  static fromLigma(ligma: Bytes): SignedOrder {
    const prevBlockHash: Bytes32 =
      ligma.getSlice(0, 32).getCasted<Bytes32>(Bytes32)
    const type: ORDER_TYPE =
      ligma.getUint8Array()[32]
    const quotToken: Address =
      ligma.getSlice(33, 53).getCasted<Address>(Address)
    const variToken: Address =
      ligma.getSlice(53, 73).getCasted<Address>(Address)
    const priceNumer: Uint256 =
      ligma.getSlice(73, 105).getCasted<Uint256>(Uint256)
    const priceDenom: Uint256 =
      ligma.getSlice(105, 137).getCasted<Uint256>(Uint256)
    const tokenLimit: Uint256 =
      ligma.getSlice(137, 169).getCasted<Uint256>(Uint256)
    const signatureV: Uint8 =
      ligma.getSlice(169, 170).getCasted<Uint8>(Uint8)
    const signatureR: Bytes32 =
      ligma.getSlice(170, 202).getCasted<Bytes32>(Bytes32)
    const signatureS: Bytes32 =
      ligma.getSlice(202, 234).getCasted<Bytes32>(Bytes32)

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
