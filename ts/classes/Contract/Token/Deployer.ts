import ethers from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractDeployer } from '../../Contract'
import { tokenOutput } from '../../../contractOutputs'

export class TokenDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, tokenOutput.abi, tokenOutput.bytecode)
  }

  async deploy(totalSupply: Uint256): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy(totalSupply.u)
    return new Address(Uu.fromHexish(ethersContract.address))
  }
}
