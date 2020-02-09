import ethers from 'ethers'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractReader } from '../../Contract'
import { engineOutput } from '../../../contractOutputs'

export class EngineReader extends ContractReader {

  constructor(
    provider: ethers.providers.Provider,
    address: Address
  ) {
    super(provider, engineOutput.abi, address)
  }

  async fetchOwner(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.owner()
    ))
  }

  async fetchExecutorOracle(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.executorOracle()
    ))
  }

  async fetchBalance(struct: {
    token: Address,
    holder: Address
  }): Promise<Uint256> {
    const { holder, token } = struct
    const balanceBignumber = await this.ethersContract.balances(
      holder.uu.toPhex(),
      token.uu.toPhex()
    )
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(balanceBignumber)
    ))

  }

}
