import { ethers } from 'ethers';
import { Address, Bytes, Bytes32, Uint256, Uint8 } from 'pollenium-buttercup';
import { SignedOrder } from './SignedOrder';
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
export declare class TokenDeployer extends ContractDeployer {
    constructor(signer: ethers.Signer);
    deploy(totalSupply: Uint256): Promise<Address>;
}
export declare class EngineDeployer extends ContractDeployer {
    constructor(signer: ethers.Signer);
    deploy(): Promise<Address>;
}
export declare class MonarchicExecutorOracleDeployer extends ContractDeployer {
    constructor(signer: ethers.Signer);
    deploy(): Promise<Address>;
}
export declare class TokenReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchBalance(holder: Address): Promise<Uint256>;
    fetchAllowance(struct: {
        holder: Address;
        spender: Address;
    }): Promise<Uint256>;
}
export declare class EngineReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchOwner(): Promise<Address>;
    fetchExecutorOracle(): Promise<Address>;
    fetchBalance(struct: {
        token: Address;
        holder: Address;
    }): Promise<Uint256>;
}
export declare class MonarchicExecutorOracleReader extends ContractReader {
    constructor(provider: ethers.providers.Provider, address: Address);
    fetchOwner(): Promise<Address>;
    fetchHot(): Promise<Address>;
    fetchCold(): Promise<Address>;
}
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
export declare class MonarchicExecutorOracleWriter extends ContractWriter {
    constructor(signer: ethers.Signer, address: Address);
    setHot(hot: Address): Promise<void>;
    setCold(cold: Address): Promise<void>;
}
