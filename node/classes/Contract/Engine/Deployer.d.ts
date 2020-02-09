import ethers from 'ethers';
import { Address } from 'pollenium-buttercup';
import { ContractDeployer } from '../../Contract';
export declare class EngineDeployer extends ContractDeployer {
    constructor(signer: ethers.Signer);
    deploy(): Promise<Address>;
}
