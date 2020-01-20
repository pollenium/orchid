import { TokenNames, traderNames, startBalance } from './lib/fixtures'
import { $enum } from 'ts-enum-util'
import {
  fetchTokenReader,
  fetchTokenWriter,
  fetchEngineReader,
  fetchEngineWriter,
  fetchOrDeployTokenAddress,
  fetchOrDeployEngineAddress,
  getAccountAddress
} from './lib/utils'

require('./engine.test')
require('./tokens.test')

let engineReader

test('should fetch engineReader', async () => {
  engineReader = await fetchEngineReader()
})

traderNames.forEach((traderName) => {
  $enum(TokenNames).forEach((tokenName) => {
    test(`${traderName} should approve ${tokenName}`, async () => {
      const tokenWriter = await fetchTokenWriter(traderName, tokenName)
      await tokenWriter.setAllowance({
        spender: await fetchOrDeployEngineAddress(),
        amount: startBalance
      })
    })
    test(`${traderName} allowance of ${tokenName} should be startBalance`, async () => {
      const tokenReader = await fetchTokenReader(tokenName)
      const allowance = await tokenReader.fetchAllowance({
        holder: getAccountAddress(traderName),
        spender: await fetchOrDeployEngineAddress()
      })
      expect(allowance.getIsEqual(startBalance)).toBe(true)
    })
    test(`${traderName} should deposit ${tokenName}`, async () => {
      const engineWriter = await fetchEngineWriter(traderName)
      await engineWriter.deposit({
        to: getAccountAddress(traderName),
        token: await fetchOrDeployTokenAddress(tokenName),
        amount: startBalance
      })
    })
  })
})
