import { TokenWriter } from '../../../'
import { fetchOrDeployTokenAddress } from './fetchOrDeployTokenAddress'
import { ethers } from 'ethers'
import { AccountNames, TokenNames } from '../fixtures'
import { getWallet } from './getWallet'

const tokenContractWriters = {}

export async function fetchTokenWriter(
  accountName: AccountNames,
  tokenName: TokenNames
): Promise<TokenWriter> {
  if (!tokenContractWriters[accountName]) {
    tokenContractWriters[accountName] = {}
  }
  if (tokenContractWriters[accountName][tokenName]) {
    return tokenContractWriters[accountName][tokenName]
  }
  const tokenAddress = await fetchOrDeployTokenAddress(tokenName)
  const tokenContractWriter = new TokenWriter(
    getWallet(accountName),
    tokenAddress
  )
  tokenContractWriters[accountName][tokenName] = tokenContractWriter
  return tokenContractWriter
}
