import { TokenReader } from '../../../'
import { fetchOrDeployTokenAddress } from './fetchOrDeployTokenAddress'
import { web3Provider } from '../web3Provider'
import { TokenNames } from '../fixtures'

const tokenContractReaders = {}

export async function fetchTokenReader(tokenName: TokenNames): Promise<TokenReader> {
  if (tokenContractReaders[tokenName]) {
    return tokenContractReaders[tokenName]
  }
  const tokenAddress = await fetchOrDeployTokenAddress(tokenName)
  const tokenContractReader = new TokenReader(
    web3Provider,
    tokenAddress
  )
  tokenContractReaders[tokenName] = tokenContractReader
  return tokenContractReader
}
