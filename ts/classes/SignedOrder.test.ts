import { Order } from './Order'
import { SignedOrder } from './SignedOrder'
import { validOrderStruct, keypair } from '../fixtures'
import { Uint8, Bytes32 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'

const order = new Order(validOrderStruct)
const signature = keypair.getSignature(
  order.getSugmaHash()
)

test('Order -> SignedOrder', () => {
  new SignedOrder(order, signature)
})

test('getLigma/fromLigma', () => {
  const signedOrder0 = new SignedOrder(order, signature)
  const ligma = signedOrder0.getLigma()
  const signedOrder1 = SignedOrder.fromLigma(ligma)

  expect(
    signedOrder0.prevBlockHash.getIsEqual(
      signedOrder1.prevBlockHash
    )
  ).toBe(true)
  expect(signedOrder0.type).toBe(signedOrder1.type)
  expect(
    signedOrder0.quotToken.getIsEqual(
      signedOrder1.quotToken
    )
  ).toBe(true)
  expect(
    signedOrder0.variToken.getIsEqual(
      signedOrder1.variToken
    )
  ).toBe(true)
  expect(
    signedOrder0.priceNumer.getIsEqual(
      signedOrder1.priceNumer
    )
  ).toBe(true)
  expect(
    signedOrder0.priceDenom.getIsEqual(
      signedOrder1.priceDenom
    )
  ).toBe(true)
  expect(
    signedOrder0.tokenLimit.getIsEqual(
      signedOrder1.tokenLimit
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.v.getIsEqual(
      signedOrder1.signature.v
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.r.getIsEqual(
      signedOrder1.signature.r
    )
  ).toBe(true)
  expect(
    signedOrder0.signature.s.getIsEqual(
      signedOrder1.signature.s
    )
  ).toBe(true)
  expect(
    signedOrder0.getTrader().getIsEqual(
      signedOrder1.getTrader()
    )
  ).toBe(true)




  expect(
    signedOrder0.getTrader().getIsEqual(
      signedOrder1.getTrader()
    )
  ).toBe(true)


})
