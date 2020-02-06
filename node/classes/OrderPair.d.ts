import { Address } from 'pollenium-buttercup';
import { Order } from './Order';
import { ChainStateInterface } from '../interfaces/ChainState';
import { SolutionInterface } from '../interfaces/Solution';
import { OrderPairInterface } from '../interfaces/OrderPair';
export declare class OrderPair implements OrderPairInterface {
    buyyOrder: Order;
    sellOrder: Order;
    quotToken: Address;
    variToken: Address;
    constructor(struct: OrderPairInterface);
    getSolution(chainState: ChainStateInterface): SolutionInterface;
}
export declare class InvalidBuyyOrderTypeError extends Error {
    constructor();
}
export declare class InvalidSellOrderTypeError extends Error {
    constructor();
}
export declare class QuotTokenMismatchError extends Error {
    constructor();
}
export declare class VariTokenMismatchError extends Error {
    constructor();
}
export declare class PriceConstraintError extends Error {
    constructor();
}
