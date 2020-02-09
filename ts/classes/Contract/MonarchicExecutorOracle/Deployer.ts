import ethers from 'ethers'
import { Address } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractDeployer } from '../../Contract'
import { monarchicExecutorOracleOutput } from '../../../contractOutputs'

export class MonarchicExecutorOracleDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, monarchicExecutorOracleOutput.abi, monarchicExecutorOracleOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return new Address(Uu.fromHexish(ethersContract.address))
  }
}
