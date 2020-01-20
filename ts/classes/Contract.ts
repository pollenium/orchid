import { ethers } from 'ethers'
import { tokenOutput, engineOutput, monarchicExecutorOracleOutput } from '../contractOutputs'
import { ContractOutput } from './ContractOutput'
import { Address, Bytes, Bytes32, Uint256, Uint8 } from 'pollenium-buttercup'
import { SignedOrder } from './SignedOrder'

export class ContractReader {
  readonly ethersContract

  constructor(
    readonly provider: ethers.providers.Provider,
    readonly abi: any,
    readonly address: Address
  ) {
    this.ethersContract = new ethers.Contract(
      address.getPhex(),
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
      address.getPhex(),
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
      bytecode.getUint8Array(),
      signer
    )
  }

}

export class TokenDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, tokenOutput.abi, tokenOutput.bytecode)
  }

  async deploy(totalSupply: Uint256): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy(totalSupply.getUint8Array())
    return Address.fromHexish(ethersContract.address)
  }
}

export class EngineDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, engineOutput.abi, engineOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return Address.fromHexish(ethersContract.address)
  }
}

export class MonarchicExecutorOracleDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, monarchicExecutorOracleOutput.abi, monarchicExecutorOracleOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return Address.fromHexish(ethersContract.address)
  }
}


export class TokenReader extends ContractReader {

  constructor(
    provider: ethers.providers.Provider,
    address: Address
  ) {
    super(provider, tokenOutput.abi, address)
  }


  async fetchBalance(holder: Address): Promise<Uint256> {
    const holderBignumber = await this.ethersContract.balanceOf(holder.getPhex())
    return Uint256.fromHexish(
      await ethers.utils.hexlify(holderBignumber)
    )
  }

  async fetchAllowance(struct: {
    holder: Address,
    spender: Address
  }): Promise<Uint256> {
    const { holder, spender } = struct
    const allowanceBignumber = await this.ethersContract.allowance(
      holder.getPhex(),
      spender.getPhex()
    )
    return Uint256.fromHexish(
      await ethers.utils.hexlify(allowanceBignumber)
    )
  }

}

export class EngineReader extends ContractReader {

  constructor(
    provider: ethers.providers.Provider,
    address: Address
  ) {
    super(provider, engineOutput.abi, address)
  }

  async fetchOwner(): Promise<Address> {
    return Address.fromHexish(
      await this.ethersContract.owner()
    )
  }

  async fetchExecutorOracle(): Promise<Address> {
    return Address.fromHexish(
      await this.ethersContract.executorOracle()
    )
  }

  async fetchBalance(struct: {
    token: Address,
    holder: Address
  }): Promise<Uint256> {
    const { holder, token } = struct
    const balanceBignumber = await this.ethersContract.balances(
      holder.getPhex(),
      token.getPhex()
    )
    return Uint256.fromHexish(
      await ethers.utils.hexlify(balanceBignumber)
    )

  }

}

export class MonarchicExecutorOracleReader extends ContractReader {

  constructor(
    provider: ethers.providers.Provider,
    address: Address
  ) {
    super(provider, monarchicExecutorOracleOutput.abi, address)
  }

  async fetchOwner(address: Address): Promise<Address> {
    return Address.fromHexish(
      await this.ethersContract.owner()
    )
  }

  async fetchHot(): Promise<Address> {
    return Address.fromHexish(
      await this.ethersContract.hot()
    )
  }

  async fetchCold(): Promise<Address> {
    return Address.fromHexish(
      await this.ethersContract.cold()
    )
  }


}



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
    await this.ethersContract.transfer(to.getPhex(), amount.getPhex())
  }

  async setAllowance(struct: {
    spender: Address,
    amount: Uint256
  }) {
    const { spender, amount } = struct
    await this.ethersContract.approve(spender.getPhex(), amount.getPhex())
  }

}

export class EngineWriter extends ContractWriter {

  constructor(
    signer: ethers.Signer,
    address: Address
  ) {
    super(signer, engineOutput.abi, address)
  }

  async setOwner(owner: Address): Promise<void> {
    await this.ethersContract.transferOwnership(owner.getPhex())
  }

  async setExecutorOracle(executorOracle: Address): Promise<void> {
    await this.ethersContract.setExecutorOracle(executorOracle.getPhex())
  }


  async deposit(struct: {
    to: Address,
    token: Address,
    amount: Uint256
  }): Promise<void> {
    const { to, token, amount } = struct
    await this.ethersContract.deposit(
      to.getPhex(),
      token.getPhex(),
      amount.getPhex()
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
      executionRequest.prevBlockHash.getPhex(),
      executionRequest.buyyOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.sellOrders.map((signedOrder) => {
        return signedOrder.getEthersArg()
      }),
      executionRequest.exchanges.map((exchange) => {
        return {
          buyyOrderIndex: exchange.signedBuyyOrderIndex.getPhex(),
          sellOrderIndex: exchange.signedSellOrderIndex.getPhex(),
          quotTokenTrans: exchange.quotTokenTrans.getPhex(),
          variTokenTrans: exchange.variTokenTrans.getPhex(),
          quotTokenArbit: exchange.quotTokenArbit.getPhex()
        }
      })
    ]

    await this.ethersContract.execute(...args)

  }

}

export class MonarchicExecutorOracleWriter extends ContractWriter {

  constructor(
    signer: ethers.Signer,
    address: Address
  ) {
    super(signer, monarchicExecutorOracleOutput.abi, address)
  }

  async setHot(hot: Address): Promise<void> {
    await this.ethersContract.setHot(hot.getPhex())
  }

  async setCold(cold: Address): Promise<void> {
    await this.ethersContract.setCold(cold.getPhex())
  }


}
