import { MonarchicExecutorOracleReader } from '../../../classes/Contract'
import { fetchOrDeployMonarchicExecutorOracleAddress } from './fetchOrDeployMonarchicExecutorOracleAddress'
import { web3Provider } from '../web3Provider'

let monarchicExecutorOracleReader

export async function fetchMonarchicExecutorOracleReader(): Promise<MonarchicExecutorOracleReader> {
  if (monarchicExecutorOracleReader) {
    return monarchicExecutorOracleReader
  }
  const monarchicExecutorOracleAddress = await fetchOrDeployMonarchicExecutorOracleAddress()
  monarchicExecutorOracleReader = new MonarchicExecutorOracleReader(
    web3Provider,
    monarchicExecutorOracleAddress
  )
  return monarchicExecutorOracleReader
}
