import ethers from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractReader } from '../../Contract'
import { monarchicExecutorOracleOutput } from '../../../contractOutputs'

export class MonarchicExecutorOracleReader extends ContractReader {

  constructor(
    provider: ethers.providers.Provider,
    address: Address
  ) {
    super(provider, monarchicExecutorOracleOutput.abi, address)
  }

  async fetchOwner(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.owner()
    ))
  }

  async fetchHot(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.hot()
    ))
  }

  async fetchCold(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.cold()
    ))
  }

}
