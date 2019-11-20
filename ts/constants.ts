import { Bytes, Bytes1 } from 'pollenium-buttercup'

export const PERSONAL_MESSAGE_PREFIX_UTF8 ='Alchemilla V1 Order:\n'
export const PERSONAL_MESSAGE_PREFIX = Bytes.fromBuffer(Buffer.from(PERSONAL_MESSAGE_PREFIX_UTF8, 'utf8'))
