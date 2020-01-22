import {
  takeSnapshot,
  restoreSnapshot,
  fetchTokenReader,
  fetchEngineReader,
  fetchEngineWriter,
  getAccountAddress,
  fetchOrDeployTokenAddress,
  getKeypair,
  fetchBlockHash
} from './lib/utils'
import { Bytes32, Uint256, Uint8 } from 'pollenium-buttercup'
import frangipani from 'pollenium-frangipani'
import { traderNames, TokenNames, AccountNames, startBalance } from './lib/fixtures'
import { $enum } from 'ts-enum-util'
import { ORDER_TYPE, Order, SignedOrder } from '../'

require('./deposit.test')

let snapshotId
let engineReader

function arrayOf(length, callback) {
  const array = []
  for (let i = 0; i < length; i ++) {
    array.push(callback(i))
  }
  return array
}


test('fetch engineReader', async () => {
  engineReader = await fetchEngineReader()
})

test('snapshot', async () => {
  snapshotId = await takeSnapshot()
})

frangipani.forEach(async (fixture, index) => {
  describe(`fixture ${index}`, () => {

    const quotTokenTrans = Uint256.fromNumber(fixture.solution.quotTokenTrans)
    const variTokenTrans = Uint256.fromNumber(fixture.solution.variTokenTrans)
    const quotTokenArbit = Uint256.fromNumber(fixture.solution.quotTokenArbit)
    const quotTokenTotal = quotTokenTrans.add(quotTokenArbit)

    traderNames.forEach((traderName) => {
      $enum(TokenNames).forEach((tokenName) => {
        test(`${traderName}'s ${tokenName} balance should be startBalance`, async () => {
          await restoreSnapshot(snapshotId)
          snapshotId = await takeSnapshot()
          const balance = await engineReader.fetchBalance({
            holder: getAccountAddress(traderName),
            token: await fetchOrDeployTokenAddress(tokenName)
          })
          expect(balance.getIsEqual(startBalance)).toBe(true)
        })
      })
      test('execute', async () => {
        await restoreSnapshot(snapshotId)
        snapshotId = await takeSnapshot()
        const prevBlockHash = await fetchBlockHash()

        const buyyOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.BUYY,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom)
        })

        const sellOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.SELL,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
          priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
          priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom)
        })

        const signedBuyyOrder = new SignedOrder(
          buyyOrder,
          getKeypair(AccountNames.ALICE).getSignature(buyyOrder.getSugmaHash())
        )

        const signedSellOrder = new SignedOrder(
          sellOrder,
          getKeypair(AccountNames.BOB).getSignature(sellOrder.getSugmaHash())
        )

        const engineWriter = await fetchEngineWriter(AccountNames.MONARCH_HOT)
        await engineWriter.execute({
          prevBlockHash: prevBlockHash,
          buyyOrders: [signedBuyyOrder],
          sellOrders: [signedSellOrder],
          exchanges: [
            {
              signedBuyyOrderIndex: Uint8.fromNumber(0),
              signedSellOrderIndex: Uint8.fromNumber(0),
              quotTokenTrans,
              variTokenTrans,
              quotTokenArbit
            }
          ]
        })

      })

      test('should have transferred DAI from ALICE to BOB and MONARCH_COLD', async () => {
        const balanceAlice = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.ALICE),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })
        const balanceBob = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.BOB),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })
        const balanceMonarchCold = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.MONARCH_COLD),
          token: await fetchOrDeployTokenAddress(TokenNames.DAI)
        })

        expect(balanceAlice.getNumber()).toBe(startBalance.sub(quotTokenTotal).getNumber())
        expect(balanceBob.getNumber()).toBe(startBalance.add(quotTokenTrans).getNumber())
        expect(balanceMonarchCold.getNumber()).toBe(quotTokenArbit.getNumber())
      })

      test('should have transferred WETH from BOB to ALICE', async () => {
        const balanceAlice = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.ALICE),
          token: await fetchOrDeployTokenAddress(TokenNames.WETH)
        })
        const balanceBob = await engineReader.fetchBalance({
          holder: getAccountAddress(AccountNames.BOB),
          token: await fetchOrDeployTokenAddress(TokenNames.WETH)
        })
        expect(balanceAlice.getNumber()).toBe(startBalance.add(variTokenTrans).getNumber())
        expect(balanceBob.getNumber()).toBe(startBalance.sub(variTokenTrans).getNumber())
      })
    })
  })
})
describe('multis', () => {

  const multisFixtures = [
    {
      buyyOrdersCount: 1,
      buyyOrderTokenLimit: 1,
      sellOrdersCount: 1,
      sellOrderTokenLimit: 1,
      exchanges: [{
        buyyOrderIndex: 0,
        sellOrderIndex: 0
      }]
    },
    {
      buyyOrdersCount: 1,
      buyyOrderTokenLimit: 5,
      sellOrdersCount: 5,
      sellOrderTokenLimit: 1,
      exchanges: arrayOf(5, (i) => {
        return {
          buyyOrderIndex: 0,
          sellOrderIndex: i
        }
      })
    }
  ]

  multisFixtures.forEach((multisFixture, index) => {
    /*TODO: Add back */
    return
    describe(`multisFixture #${index}: [${multisFixture.buyyOrdersCount}, ${multisFixture.sellOrdersCount}, ${multisFixture.exchanges.length}]`, () => {
      it(`should execute batch of orders`, async () => {

        await restoreSnapshot(snapshotId)
        snapshotId = await takeSnapshot()
        const prevBlockHash = await fetchBlockHash()

        const buyyOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.BUYY,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(multisFixture.buyyOrderTokenLimit),
          priceNumer: Uint256.fromNumber(1),
          priceDenom: Uint256.fromNumber(1)
        })

        const sellOrder = new Order({
          prevBlockHash: prevBlockHash,
          type: ORDER_TYPE.SELL,
          quotToken: await fetchOrDeployTokenAddress(TokenNames.DAI),
          variToken: await fetchOrDeployTokenAddress(TokenNames.WETH),
          tokenLimit: Uint256.fromNumber(multisFixture.sellOrderTokenLimit),
          priceNumer: Uint256.fromNumber(1),
          priceDenom: Uint256.fromNumber(1)
        })

        const signedBuyyOrder = new SignedOrder(
          buyyOrder,
          getKeypair(AccountNames.ALICE).getSignature(buyyOrder.getSugmaHash())
        )

        const signedSellOrder = new SignedOrder(
          sellOrder,
          getKeypair(AccountNames.BOB).getSignature(sellOrder.getSugmaHash())
        )

        const signedBuyyOrders = []
        const signedSellOrders = []
        const exchanges = []

        for (let i = 0; i < multisFixture.buyyOrdersCount; i++) {
          signedBuyyOrders.push(signedBuyyOrder)
        }

        for (let i = 0; i < multisFixture.sellOrdersCount; i++) {
          signedSellOrders.push(signedSellOrder)
        }

        for (let i = 0; i < multisFixture.exchanges.length; i++) {
          const exchangeFixture = multisFixture.exchanges[i]
          exchanges.push({
            signedBuyyOrderIndex: Uint8.fromNumber(exchangeFixture.buyyOrderIndex),
            signedSellOrderIndex: Uint8.fromNumber(exchangeFixture.sellOrderIndex),
            quotTokenTrans: Uint256.fromNumber(1),
            variTokenTrans: Uint256.fromNumber(1),
            quotTokenArbit: Uint256.fromNumber(0)
          })
        }

        const engineWriter = await fetchEngineWriter(AccountNames.MONARCH_HOT)
        await engineWriter.execute({
          prevBlockHash: prevBlockHash,
          buyyOrders: signedBuyyOrders,
          sellOrders: signedSellOrders,
          exchanges: exchanges
        })
      })

    })
  })
})
