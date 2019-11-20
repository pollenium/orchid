import { ORDER_TYPE } from '../enums'
import { Order } from '../'
import { OrderPair } from '../'
import crypto from 'crypto'
import { Uint256, Bytes20 } from 'pollenium-buttercup'

const alice = Bytes20.fromBuffer(crypto.randomBytes(20))
const bob = Bytes20.fromBuffer(crypto.randomBytes(20))
const dai = Bytes20.fromBuffer(crypto.randomBytes(20))
const weth = Bytes20.fromBuffer(crypto.randomBytes(20))

const MAX = Number.MAX_SAFE_INTEGER

const fixtures = [
  // [
  //   37, 100,
  //   37, 100,
  //   1000, 370,
  //   0, 0,
  //   MAX, MAX,
  //   370, 1000, 0
  // ],
  [
    38, 100,
    37, 100,
    1000, 380,
    0, 0,
    MAX, MAX,
    370, 1000, 10
  ]
]

fixtures.forEach((fixture, index) => {

  const buyyOrderPriceNumer = Uint256.fromNumber(fixture[0])
  const buyyOrderPriceDenom = Uint256.fromNumber(fixture[1])
  const sellOrderPriceNumer = Uint256.fromNumber(fixture[2])
  const sellOrderPriceDenom = Uint256.fromNumber(fixture[3])

  const buyyOrderTokenLimit = Uint256.fromNumber(fixture[4])
  const sellOrderTokenLimit = Uint256.fromNumber(fixture[5])

  const buyyOrderTokenFilled = Uint256.fromNumber(fixture[6])
  const sellOrderTokenFilled = Uint256.fromNumber(fixture[7])

  const buyyOrderTokenBalance = Uint256.fromNumber(fixture[8])
  const sellOrderTokenBalance = Uint256.fromNumber(fixture[9])

  const quotTokenTransNumber = fixture[10]
  const variTokenTransNumber = fixture[11]
  const quotTokenArbitNumber = fixture[12]

  const buyyOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: buyyOrderTokenLimit,
    priceNumer: buyyOrderPriceNumer,
    priceDenom: buyyOrderPriceDenom,
    expiration: Uint256.fromNumber(0),
    salt: Uint256.fromNumber(0)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: buyyOrderTokenLimit,
    priceNumer: buyyOrderPriceNumer,
    priceDenom: buyyOrderPriceDenom,
    expiration: Uint256.fromNumber(0),
    salt: Uint256.fromNumber(0)
  })

  const orderPair = new OrderPair(buyyOrder, sellOrder)
  const solution = orderPair.getSolution({
    buyyOrderTokenFilled,
    sellOrderTokenFilled,
    buyyOrderTokenBalance,
    sellOrderTokenBalance
  })

  test(`order pair #${index}: quotTokenTrans`, () => {
    expect(solution.quotTokenTrans.getNumber()).toBe(quotTokenTransNumber)
  })
  test(`order pair #${index}: variTokenTrans`, () => {
    expect(solution.variTokenTrans.getNumber()).toBe(variTokenTransNumber)
  })
  test(`order pair #${index}: quotTokenArbit`, () => {
    expect(solution.quotTokenArbit.getNumber()).toBe(quotTokenArbitNumber)
  })

})
