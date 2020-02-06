import { SignedOrder } from './SignedOrder';
import { OrderPair } from './OrderPair';
import { SignedOrderPairInterface } from '../interfaces/SignedOrderPair';
export declare class SignedOrderPair extends OrderPair implements SignedOrderPairInterface {
    buyyOrder: SignedOrder;
    sellOrder: SignedOrder;
    private AddressVars;
    private uint256Vars;
    private uint008Vars;
    private bytes32Vars;
    constructor(struct: SignedOrderPairInterface);
}
