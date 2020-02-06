import { Bytes, Address } from 'pollenium-buttercup';
import { Signature } from 'pollenium-ilex';
import { Order } from './Order';
import { OrderInterface } from '../interfaces/Order';
import { SignedOrderInterface } from '../interfaces/SignedOrder';
export declare class SignedOrder extends Order implements SignedOrderInterface {
    signature: Signature;
    private trader;
    private ligma;
    constructor(orderStruct: OrderInterface, signature: Signature);
    getTrader(): Address;
    getEthersArg(): any;
    getLigma(): Bytes;
    static fromLigma(ligma: Bytes): SignedOrder;
}
