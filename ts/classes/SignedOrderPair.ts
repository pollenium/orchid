import { Address, Uint256, Uint8, Bytes32 } from 'pollenium-buttercup'
import { SignedOrder } from './SignedOrder'
import { OrderPair } from './OrderPair'
import { ORDER_TYPE } from '../enums'
import { ChainStateInterface } from '../interfaces/ChainState'
import { SignedOrderPairInterface } from '../interfaces/SignedOrderPair'

export class SignedOrderPair extends OrderPair implements SignedOrderPairInterface {

  public buyyOrder: SignedOrder;
  public sellOrder: SignedOrder;

  private AddressVars: Address[];
  private uint256Vars: Uint256[];
  private uint008Vars: Uint8[];
  private bytes32Vars: Bytes32[];

  constructor(struct: SignedOrderPairInterface) {
    super(struct)
    Object.assign(this, struct)
  }
}
