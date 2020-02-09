import { AccountNames, TokenNames, traderNames, totalSupply, startBalance } from './lib/fixtures'
import {
  getKeypair,
  fetchOrDeployTokenAddress,
  fetchTokenReader,
  fetchTokenWriter,
  getAccountAddress
} from './lib/utils'
import { $enum } from 'ts-enum-util'
import { TokenReader } from '../'

const deployerAddress = getAccountAddress(AccountNames.DEPLOYER)

$enum(TokenNames).forEach((tokenName) => {

  let tokenReader: TokenReader

  test(`fetch ${tokenName} reader/writer`, async () => {
    tokenReader = await fetchTokenReader(tokenName)
  })
  test('balance of DEPLOYER should be totalSupply', async () => {
    const balance = await tokenReader.fetchBalance(deployerAddress)
    expect(balance.toNumber()).toBe(totalSupply.toNumber())
  })
  traderNames.forEach((traderName) => {
    test(`transfer startBalance to ${traderName}`, async () => {
      const tokenContractWriter = await fetchTokenWriter(AccountNames.DEPLOYER, tokenName)
      await tokenContractWriter.transfer({
        to: getAccountAddress(traderName),
        amount: startBalance
      })
    })
  })
  traderNames.forEach((traderName) => {
    test(`balance of ${traderName} should be startBalance`, async () => {
      const balance = await tokenReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.toNumber()).toBe(startBalance.toNumber())
    })
  })
  test('balance of DEPLOYER should be 0', async () => {
    const balance = await tokenReader.fetchBalance(deployerAddress)
    expect(balance.toNumber()).toBe(0)
  })

})
