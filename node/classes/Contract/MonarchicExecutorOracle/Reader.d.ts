import { ethers } from 'ethers';
import { Address } from 'pollenium-buttercup';
import { ContractReader } from '../../Contract';
export declare class MonarchicExecutorOracleReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchOwner(): Promise<Address>;
    fetchHot(): Promise<Address>;
    fetchCold(): Promise<Address>;
}
