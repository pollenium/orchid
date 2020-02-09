import ethers from 'ethers';
import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractReader } from '../../Contract';
export declare class EngineReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchOwner(): Promise<Address>;
    fetchExecutorOracle(): Promise<Address>;
    fetchBalance(struct: {
        token: Address;
        holder: Address;
    }): Promise<Uint256>;
}
