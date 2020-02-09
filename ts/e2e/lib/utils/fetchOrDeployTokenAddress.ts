import { AccountNames, TokenNames, totalSupply } from '../fixtures'
import { getWallet } from './getWallet'
import { TokenDeployer } from '../../../'
import { Address } from 'pollenium-buttercup'

const tokenAddresses = {}

export async function fetchOrDeployTokenAddress(tokenName: TokenNames): Promise<Address> {
  if (tokenAddresses[tokenName]) {
    return tokenAddresses[tokenName]
  }
  const tokenContractDeployer = new TokenDeployer(
    getWallet(AccountNames.DEPLOYER)
  )
  const tokenAddress = await tokenContractDeployer.deploy(totalSupply)
  tokenAddresses[tokenName] = tokenAddress
  return tokenAddress
}
