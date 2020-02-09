import { ethers } from 'ethers';
import { Address, Uint256 } from 'pollenium-buttercup';
import { ContractDeployer } from '../../Contract';
export declare class TokenDeployer extends ContractDeployer {
    constructor(signer: ethers.Signer);
    deploy(totalSupply: Uint256): Promise<Address>;
}
