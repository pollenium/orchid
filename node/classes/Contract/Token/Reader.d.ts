import ethers from 'ethers';
import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractReader } from '../../Contract';
export declare class TokenReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchBalance(holder: Address): Promise<Uint256>;
    fetchAllowance(struct: {
        holder: Address;
        spender: Address;
    }): Promise<Uint256>;
}
