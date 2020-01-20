import { web3 } from '../web3'
import { Bytes32 } from 'pollenium-buttercup'

export async function fetchBlockHash() {
  const block = await web3.eth.getBlock('latest')
  return Bytes32.fromHexish(block.hash)
}
