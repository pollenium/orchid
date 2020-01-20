import { AccountNames } from './fixtures'
import { getKeypair } from './utils'
import { $enum } from 'ts-enum-util'
import ganache from 'ganache-cli'

export const ganacheProvider = ganache.provider({
  gasLimit: 0xfffffffffff,
  gasPrice: 0x01,
  accounts: $enum(AccountNames).map((name) => {
    const keypair = getKeypair(name)
    return {
      balance: Number.MAX_SAFE_INTEGER,
      secretKey: keypair.privateKey.getBuffer()
    }
  })
})
