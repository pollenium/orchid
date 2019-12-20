import frangipani from 'pollenium-frangipani'
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
import { alice, bob, weth, mkr, dai, usdc, nullBytes32 } from '../fixtures'

frangipani.forEach((fixture, index) => {

  const chainState = {
    buyyOrderTokenFilled: Uint256.fromNumber(fixture.chainState.buyyOrderTokenFilled),
    sellOrderTokenFilled: Uint256.fromNumber(fixture.chainState.sellOrderTokenFilled),
    buyyOrderTokenBalance: Uint256.fromNumber(fixture.chainState.buyyOrderTokenBalance),
    sellOrderTokenBalance: Uint256.fromNumber(fixture.chainState.sellOrderTokenBalance)
  }

  const buyyOrder = new Order({
    prevBlockHash: nullBytes32,
    type: ORDER_TYPE.BUYY,
    quotToken: dai,
    variToken: weth,
    originator: alice,
    tokenLimit: Uint256.fromNumber(fixture.orders.buyy.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.buyy.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.buyy.priceDenom),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const sellOrder = new Order({
    prevBlockHash: nullBytes32,
    type: ORDER_TYPE.SELL,
    quotToken: dai,
    variToken: weth,
    originator: bob,
    tokenLimit: Uint256.fromNumber(fixture.orders.sell.tokenLimit),
    priceNumer: Uint256.fromNumber(fixture.orders.sell.priceNumer),
    priceDenom: Uint256.fromNumber(fixture.orders.sell.priceDenom),
    expiration: Uint256.fromNumber(1),
    salt: Uint256.fromNumber(1)
  })

  const orderPair = new OrderPair({ buyyOrder, sellOrder })
  const solution = orderPair.getSolution(chainState)

  test(`order pair #${index}: quotTokenTrans`, () => {
    expect(solution.quotTokenTrans.getNumber()).toBe(fixture.solution.quotTokenTrans)
  })
  test(`order pair #${index}: variTokenTrans`, () => {
    expect(solution.variTokenTrans.getNumber()).toBe(fixture.solution.variTokenTrans)
  })
  test(`order pair #${index}: quotTokenArbit`, () => {
    expect(solution.quotTokenArbit.getNumber()).toBe(fixture.solution.quotTokenArbit)
  })

})

test('InvalidBuyyOrderTypeError', () => {
  const buyyOrder = new Order({
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
    prevBlockHash: nullBytes32,
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
