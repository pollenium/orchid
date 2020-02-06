import { Address, Uint256, Bytes32 } from 'pollenium-buttercup';
import { ORDER_TYPE } from '../enums';
import { OrderInterface } from '../interfaces/Order';
export declare class Order implements OrderInterface {
    type: ORDER_TYPE;
    prevBlockHash: Bytes32;
    quotToken: Address;
    variToken: Address;
    tokenLimit: Uint256;
    priceNumer: Uint256;
    priceDenom: Uint256;
    private sugma;
    private sugmaHash;
    constructor(struct: OrderInterface);
    private getSugma;
    getSugmaHash(): Bytes32;
    getTokenUnfilled(tokenFilled: Uint256): Uint256;
    getTokenAvail(tokenFilled: Uint256, tokenBalance: Uint256): Uint256;
}
export declare class QuotVariTokenMatchError extends Error {
    constructor(token: any);
}
declare class NullError extends Error {
    constructor(variableName: string);
}
declare class ZeroError extends Error {
    constructor(variableName: string);
}
export declare class NullQuotTokenError extends NullError {
    constructor();
}
export declare class NullVariTokenError extends NullError {
    constructor();
}
export declare class ZeroTokenLimitError extends ZeroError {
    constructor();
}
export declare class ZeroPriceNumerError extends ZeroError {
    constructor();
}
export declare class ZeroPriceDenomError extends ZeroError {
    constructor();
}
export {};
