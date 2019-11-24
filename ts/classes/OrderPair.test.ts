import { ORDER_TYPE } from '../enums'
import { Order } from '../'
import { OrderPair } from '../'
import {
  InvalidBuyyOrderTypeError,
  InvalidSellOrderTypeError,
  QuotTokenMismatchError,
  VariTokenMismatchError,
  PriceConstraintError
} from './OrderPair'
import crypto from 'crypto'
import { Uint256, Address } from 'pollenium-buttercup'
import { alice, bob, weth, mkr, dai, usdc } from '../fixtures'


const MAX = Number.MAX_SAFE_INTEGER

const fixtures = [
  [
    1, 1,
    1, 1,
    1, 1,
    0, 0,
    MAX, MAX,
    1, 1, 0
  ],
  [
    2, 1,
    1, 1,
    2, 1,
    0, 0,
    MAX, MAX,
    1, 1, 1
  ],
  [
    37, 100,
    37, 100,
    370, 1000,
    0, 0,
    MAX, MAX,
    370, 1000, 0
  ],
  [
    38, 100,
    37, 100,
    380, 1000,
    0, 0,
    MAX, MAX,
    370, 1000, 10
  ],
  [
    2, 1,
    15, 10,
    100, 100,
    0, 0,
    MAX, MAX,
    75, 50, 25
  ],
  [
    2, 1,
    15, 10,
    100, 10,
    0, 0,
    MAX, MAX,
    15, 10, 5
  ],
  [
    2, 1,
    15, 10,
    100, 10,
    0, 0,
    5, 7,
    3, 2, 1
  ],
  [
    1, 2,
    5, 11,
    100, 10,
    0, 0,
    12, 11,
    4, 10, 1
  ],
  [
    1, 2,
    5, 11,
    100, 10,
    0, 0,
    MAX, MAX,
    4, 10, 1
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
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: sellOrderTokenLimit,
    priceNumer: sellOrderPriceNumer,
    priceDenom: sellOrderPriceDenom,
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const orderPair = new OrderPair({ buyyOrder, sellOrder })
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

test('InvalidBuyyOrderTypeError', () => {
  const buyyOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(InvalidBuyyOrderTypeError)
})

test('InvalidSellOrderTypeError', () => {
  const buyyOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(InvalidSellOrderTypeError)
})

test('QuotTokenMismatchError', () => {
  const buyyOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: usdc,
    variToken: weth,
    originator: bob,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(QuotTokenMismatchError)
})


test('VariTokenMismatchError', () => {
  const buyyOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: mkr,
    originator: bob,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(VariTokenMismatchError)
})

test('PriceConstraintError', () => {
  const buyyOrder = new Order({
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: Uint256.fromNumber(1),
    priceNumer: Uint256.fromNumber(2),
    priceDenom: Uint256.fromNumber(1),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  expect(() => {
    new OrderPair({ buyyOrder, sellOrder })
  }).toThrow(PriceConstraintError)
})
