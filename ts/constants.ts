import { Bytes32, Bytes1 } from 'pollenium-buttercup'
import crypto from 'crypto'

export const ORDER_ENCODING_PREFIX_PREHASH_UTF8 ='\x00Alchemilla V1 Order'
export const ORDER_ENCODING_PREFIX = Bytes32.fromBuffer(
  crypto.createHash('sha256').update(ORDER_ENCODING_PREFIX_PREHASH_UTF8).digest()
)
