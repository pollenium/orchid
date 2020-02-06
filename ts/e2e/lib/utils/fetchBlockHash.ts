import { web3 } from '../web3'
import { Bytes32 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'

export async function fetchBlockHash() {
  const block = await web3.eth.getBlock('latest')
  return new Bytes32(Uu.fromHexish(block.hash))
}
