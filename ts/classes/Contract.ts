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

export class TokenDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, tokenOutput.abi, tokenOutput.bytecode)
  }

  async deploy(totalSupply: Uint256): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy(totalSupply.u)
    return new Address(Uu.fromHexish(ethersContract.address))
  }
}

export class EngineDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, engineOutput.abi, engineOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return new Address(Uu.fromHexish(ethersContract.address))
  }
}

export class MonarchicExecutorOracleDeployer extends ContractDeployer {

  constructor(signer: ethers.Signer) {
    super(signer, monarchicExecutorOracleOutput.abi, monarchicExecutorOracleOutput.bytecode)
  }

  async deploy(): Promise<Address> {
    const ethersContract = await this.ethersContractFactory.deploy()
    return new Address(Uu.fromHexish(ethersContract.address))
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
    const holderBignumber = await this.ethersContract.balanceOf(holder.uu.toPhex())
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(holderBignumber)
    ))
  }

  async fetchAllowance(struct: {
    holder: Address,
    spender: Address
  }): Promise<Uint256> {
    const { holder, spender } = struct
    const allowanceBignumber = await this.ethersContract.allowance(
      holder.uu.toPhex(),
      spender.uu.toPhex()
    )
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(allowanceBignumber)
    ))
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
