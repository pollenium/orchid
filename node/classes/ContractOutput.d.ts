import { Bytes } from 'pollenium-buttercup';
export declare class ContractOutput {
    readonly fileName: string;
    readonly contractName: string;
    readonly abi: any;
    readonly bytecode: Bytes;
    constructor(fileName: string, contractName: string);
}
