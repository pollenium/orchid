import { ethers } from 'ethers';
import { Address } from 'pollenium-buttercup';
import { ContractWriter } from '../../Contract';
export declare class MonarchicExecutorOracleWriter extends ContractWriter {
    constructor(signer: ethers.Signer, address: Address);
    setHot(hot: Address): Promise<void>;
    setCold(cold: Address): Promise<void>;
}
