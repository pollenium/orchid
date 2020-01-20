import { AccountNames, TokenNames, traderNames, totalSupply, startBalance } from './lib/fixtures'
import {
  getKeypair,
  fetchOrDeployTokenAddress,
  fetchTokenReader,
  fetchTokenWriter,
  getAccountAddress
} from './lib/utils'
import { $enum } from 'ts-enum-util'

const deployerAddress = getAccountAddress(AccountNames.DEPLOYER)

$enum(TokenNames).forEach((tokenName) => {
  let tokenContractReader
  test(`fetch ${tokenName} reader/writer`, async () => {
    tokenContractReader = await fetchTokenReader(tokenName)
  })
  test('balance of DEPLOYER should be totalSupply', async () => {
    const balance = await tokenContractReader.fetchBalance(deployerAddress)
    expect(balance.getNumber()).toBe(totalSupply.getNumber())
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
      const balance = await tokenContractReader.fetchBalance(getAccountAddress(traderName))
      expect(balance.getNumber()).toBe(startBalance.getNumber())
    })
  })
  test('balance of DEPLOYER should be 0', async () => {
    const balance = await tokenContractReader.fetchBalance(deployerAddress)
    expect(balance.getNumber()).toBe(0)
  })

})
