import { EngineReader } from '../../../'
import { fetchOrDeployEngineAddress } from './fetchOrDeployEngineAddress'
import { gaillardia } from '../gaillardia'

let engineReader

export async function fetchEngineReader(): Promise<EngineReader> {
  if (engineReader) {
    return engineReader
  }
  const engineAddress = await fetchOrDeployEngineAddress()
  engineReader = new EngineReader(
    gaillardia.ethersWeb3Provider,
    engineAddress
  )
  return engineReader
}
