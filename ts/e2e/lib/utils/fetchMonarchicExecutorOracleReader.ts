import { MonarchicExecutorOracleReader } from '../../../'
import { fetchOrDeployMonarchicExecutorOracleAddress } from './fetchOrDeployMonarchicExecutorOracleAddress'
import { gaillardia } from '../gaillardia'

let monarchicExecutorOracleReader

export async function fetchMonarchicExecutorOracleReader(): Promise<MonarchicExecutorOracleReader> {
  if (monarchicExecutorOracleReader) {
    return monarchicExecutorOracleReader
  }
  const monarchicExecutorOracleAddress = await fetchOrDeployMonarchicExecutorOracleAddress()
  monarchicExecutorOracleReader = new MonarchicExecutorOracleReader(
    gaillardia.ethersWeb3Provider,
    monarchicExecutorOracleAddress
  )
  return monarchicExecutorOracleReader
}
