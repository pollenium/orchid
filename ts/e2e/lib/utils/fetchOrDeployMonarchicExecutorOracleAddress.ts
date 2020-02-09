import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { MonarchicExecutorOracleDeployer } from '../../../'
import { Address } from 'pollenium-buttercup'

let monarchicExecutorOracleAddress

export async function fetchOrDeployMonarchicExecutorOracleAddress(): Promise<Address> {
  if (monarchicExecutorOracleAddress) {
    return monarchicExecutorOracleAddress
  }
  const monarchicExecutorOracleDeployer = new MonarchicExecutorOracleDeployer(
    getWallet(AccountNames.DEPLOYER)
  )
  monarchicExecutorOracleAddress = await monarchicExecutorOracleDeployer.deploy()
  return monarchicExecutorOracleAddress
}
