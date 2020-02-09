import ethers from 'ethers'
import { Address, Uint256, Bytes32, Uint8 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { ContractWriter } from '../../Contract'
import { engineOutput } from '../../../contractOutputs'
import { SignedOrder } from '../../SignedOrder'

export class EngineWriter extends ContractWriter {

  constructor(
    signer: ethers.Signer,
    address: Address
  ) {
    super(signer, engineOutput.abi, address)
  }

  async setOwner(owner: Address): Promise<void> {
    await this.ethersContract.transferOwnership(owner.uu.toPhex())
  }

  async setExecutorOracle(executorOracle: Address): Promise<void> {
    await this.ethersContract.setExecutorOracle(executorOracle.uu.toPhex())
  }


  async deposit(struct: {
    to: Address,
    token: Address,
    amount: Uint256
  }): Promise<void> {
    const { to, token, amount } = struct
    await this.ethersContract.deposit(
      to.uu.toPhex(),
      token.uu.toPhex(),
      amount.uu.toPhex()
    )
  }

  async execute(executionRequest: {
    prevBlockHash: Bytes32,
    buyyOrders: Array<SignedOrder>,
    sellOrders: Array<SignedOrder>,
    exchanges: Array<{
      signedBuyyOrderIndex: Uint8,
      signedSellOrderIndex: Uint8,
      quotTokenTrans: Uint256,
      variTokenTrans: Uint256,
      quotTokenArbit: Uint256
    }>
  }): Promise<void> {

    const args = [
      executionRequest.prevBlockHash.uu.toPhex(),
      executionRequest.buyyOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.sellOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.exchanges.map((exchange) => {
        return {
          buyyOrderIndex: exchange.signedBuyyOrderIndex.uu.toPhex(),
          sellOrderIndex: exchange.signedSellOrderIndex.uu.toPhex(),
          quotTokenTrans: exchange.quotTokenTrans.uu.toPhex(),
          variTokenTrans: exchange.variTokenTrans.uu.toPhex(),
          quotTokenArbit: exchange.quotTokenArbit.uu.toPhex()
        }
      })
    ]

    await this.ethersContract.execute(...args)

  }

}
