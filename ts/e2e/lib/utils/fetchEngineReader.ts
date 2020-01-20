import { EngineReader } from '../../../classes/Contract'
import { fetchOrDeployEngineAddress } from './fetchOrDeployEngineAddress'
import { web3Provider } from '../web3Provider'

let engineReader

export async function fetchEngineReader(): Promise<EngineReader> {
  if (engineReader) {
    return engineReader
  }
  const engineAddress = await fetchOrDeployEngineAddress()
  engineReader = new EngineReader(
    web3Provider,
    engineAddress
  )
  return engineReader
}
