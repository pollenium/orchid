import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { EngineDeployer } from '../../../'
import { Address } from 'pollenium-buttercup'

let engineAddress

export async function fetchOrDeployEngineAddress(): Promise<Address> {
  if (engineAddress) {
    return engineAddress
  }
  const engineDeployer = new EngineDeployer(
    getWallet(AccountNames.DEPLOYER)
  )
  engineAddress = await engineDeployer.deploy()
  return engineAddress
}
