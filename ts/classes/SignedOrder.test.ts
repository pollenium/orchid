import { Order } from './Order'
import { SignedOrder, InvalidSignatureError } from './SignedOrder'
import { validOrderStruct, keypair } from '../fixtures'
import { Uint8, Bytes32 } from 'pollenium-buttercup'
import { Signature } from 'pollenium-ilex'

const order = new Order(validOrderStruct)
const signature = keypair.getSignature(
  order.getSugmaHash()
)
const invalidSignature = keypair.getSignature(
  Bytes32.fromArray([])
)

test('Order -> SignedOrder', () => {
  new SignedOrder(order, signature)
})

test('InvalidSignatureError', () => {
  expect(() => {
    new SignedOrder(order, invalidSignature)
  }).toThrow(InvalidSignatureError)
})
