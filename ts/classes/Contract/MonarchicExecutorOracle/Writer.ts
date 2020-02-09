import ethers from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractWriter } from '../../Contract'
import { monarchicExecutorOracleOutput } from '../../../contractOutputs'

export class MonarchicExecutorOracleWriter extends ContractWriter {

  constructor(
    signer: ethers.Signer,
    address: Address
  ) {
    super(signer, monarchicExecutorOracleOutput.abi, address)
  }

  async setHot(hot: Address): Promise<void> {
    await this.ethersContract.setHot(hot.uu.toPhex())
  }

  async setCold(cold: Address): Promise<void> {
    await this.ethersContract.setCold(cold.uu.toPhex())
  }


}
