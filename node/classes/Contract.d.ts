import { ethers } from 'ethers';
import { Address, Bytes } from 'pollenium-buttercup';
export declare class ContractReader {
    readonly provider: ethers.providers.Provider;
    readonly abi: any;
    readonly address: Address;
    readonly ethersContract: any;
    constructor(provider: ethers.providers.Provider, abi: any, address: Address);
}
export declare class ContractWriter {
    readonly signer: ethers.Signer;
    readonly abi: any;
    readonly address: Address;
    readonly ethersContract: any;
    constructor(signer: ethers.Signer, abi: any, address: Address);
}
export declare abstract class ContractDeployer {
    readonly signer: ethers.Signer;
    readonly abi: any;
    readonly bytecode: Bytes;
    readonly ethersContractFactory: ethers.ContractFactory;
    abstract deploy(...args: any): Promise<Address>;
    constructor(signer: ethers.Signer, abi: any, bytecode: Bytes);
}
