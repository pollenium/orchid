import { AccountNames } from '../fixtures'
import { Wallet } from 'ethers'
import { getKeypair } from './getKeypair'
import { web3Provider } from '../web3Provider'

const wallets = {}

export function getWallet(accountName: AccountNames): Wallet {
  if (wallets[accountName]) {
    return wallets[accountName]
  }
  const keypair = getKeypair(accountName)
  wallets[accountName] = new Wallet(
    keypair.privateKey.u,
    web3Provider
  )
  return wallets[accountName]
}
