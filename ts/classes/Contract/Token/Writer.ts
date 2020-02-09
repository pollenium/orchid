import { ethers } from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractWriter } from '../../Contract'
import { tokenOutput } from '../../../contractOutputs'

export class TokenWriter extends ContractWriter {

  constructor(
    signer: ethers.Signer,
    address: Address
  ) {
    super(signer, tokenOutput.abi, address)
  }


  async transfer(struct: {
    to: Address,
    amount: Uint256
  }): Promise<void> {
    const { to, amount } = struct
    await this.ethersContract.transfer(to.uu.toPhex(), amount.uu.toPhex())
  }

  async setAllowance(struct: {
    spender: Address,
    amount: Uint256
  }) {
    const { spender, amount } = struct
    await this.ethersContract.approve(spender.uu.toPhex(), amount.uu.toPhex())
  }

}
