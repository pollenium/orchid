import { ethers } from 'ethers';
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup';
import { ContractWriter } from '../../Contract';
import { SignedOrder } from '../../SignedOrder';
export declare class EngineWriter extends ContractWriter {
    constructor(signer: ethers.Signer, address: Address);
    setOwner(owner: Address): Promise<void>;
    setExecutorOracle(executorOracle: Address): Promise<void>;
    deposit(struct: {
        to: Address;
        token: Address;
        amount: Uint256;
    }): Promise<void>;
    execute(executionRequest: {
        prevBlockHash: Bytes32;
        buyyOrders: Array<SignedOrder>;
        sellOrders: Array<SignedOrder>;
        exchanges: Array<{
            signedBuyyOrderIndex: Uint8;
            signedSellOrderIndex: Uint8;
            quotTokenTrans: Uint256;
            variTokenTrans: Uint256;
            quotTokenArbit: Uint256;
        }>;
    }): Promise<void>;
}
