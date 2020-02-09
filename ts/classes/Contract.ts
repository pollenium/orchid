import { ethers } from 'ethers'
import { tokenOutput, engineOutput, monarchicExecutorOracleOutput } from '../contractOutputs'
import { ContractOutput } from './ContractOutput'
import { Address, Bytes, Bytes32, Uint256, Uint8 } from 'pollenium-buttercup'
import { SignedOrder } from './SignedOrder'
import { Uu } from 'pollenium-uvaursi'

export class ContractReader {
  readonly ethersContract

  constructor(
    readonly provider: ethers.providers.Provider,
    readonly abi: any,
    readonly address: Address
  ) {
    this.ethersContract = new ethers.Contract(
      address.uu.toPhex(),
      this.abi,
      provider
    )
  }
}

export class ContractWriter {
  readonly ethersContract

  constructor(
    readonly signer: ethers.Signer,
    readonly abi: any,
    readonly address: Address
  ) {
    this.ethersContract = new ethers.Contract(
      address.uu.toPhex(),
      this.abi,
      signer
    )
  }
}

export abstract class ContractDeployer {

  readonly ethersContractFactory: ethers.ContractFactory

  abstract deploy(...args: any): Promise<Address>;


  constructor(
    readonly signer: ethers.Signer,
    readonly abi: any,
    readonly bytecode: Bytes
  ) {
    this.ethersContractFactory = new ethers.ContractFactory(
      abi,
      bytecode.u,
      signer
    )
  }

}
