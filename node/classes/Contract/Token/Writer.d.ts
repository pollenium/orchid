import ethers from 'ethers';
import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractWriter } from '../../Contract';
export declare class TokenWriter extends ContractWriter {
    constructor(signer: ethers.Signer, address: Address);
    transfer(struct: {
        to: Address;
        amount: Uint256;
    }): Promise<void>;
    setAllowance(struct: {
        spender: Address;
        amount: Uint256;
    }): Promise<void>;
}
