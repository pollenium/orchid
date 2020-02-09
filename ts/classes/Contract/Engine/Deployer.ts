import ethers from 'ethers'
import { Address } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractDeployer } from '../../Contract'
import { engineOutput } from '../../../contractOutputs'

export class EngineDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, engineOutput.abi, engineOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return new Address(Uu.fromHexish(ethersContract.address))
  }
}
