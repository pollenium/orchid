import { alice, weth, usdc, nullAddress, uint256Zero } from '../fixtures'
import { Uint256 } from 'pollenium-buttercup'
import { ORDER_TYPE } from '../enums'
import {
  Order,
  QuotVariTokenMatchError,
  NullQuotTokenError,
  NullVariTokenError,
  NullOriginatorError,
  ZeroTokenLimitError,
  ZeroPriceNumerError,
  ZeroPriceDenomError,
  ZeroExpirationError,
  ZeroSaltError
} from './Order'

const validOrder = {
  type: ORDER_TYPE.BUYY,
  quotToken: usdc,
  variToken: weth,
  originator: alice,
  tokenLimit: Uint256.fromNumber(1),
  priceNumer: Uint256.fromNumber(1),
  priceDenom: Uint256.fromNumber(1),
  expiration: Uint256.fromNumber(1),
  salt: Uint256.fromNumber(1)
}

const invalidOrderFixtures = [
  {
    error: QuotVariTokenMatchError,
    delta: {
      variToken: usdc
    }
  },
  {
    error: NullQuotTokenError,
    delta: {
      quotToken: nullAddress
    }
  },
  {
    error: NullVariTokenError,
    delta: {
      variToken: nullAddress
    }
  },
  {
    error: NullOriginatorError,
    delta: {
      originator: nullAddress
    }
  },
  {
    error: ZeroTokenLimitError,
    delta: {
      tokenLimit: uint256Zero
    }
  },
  {
    error: ZeroPriceNumerError,
    delta: {
      priceNumer: uint256Zero
    }
  },
  {
    error: ZeroPriceDenomError,
    delta: {
      priceDenom: uint256Zero
    }
  },
  {
    error: ZeroExpirationError,
    delta: {
      expiration: uint256Zero
    }
  },
  {
    error: ZeroSaltError,
    delta: {
      salt: uint256Zero
    }
  }
]

test('valid', () => {
  new Order(validOrder)
})

invalidOrderFixtures.forEach((fixture) => {
  test(fixture.error.name, () => {
    expect(() => {
      const orderStruct = Object.assign(Object.assign({}, validOrder), fixture.delta)
      new Order(orderStruct)
    }).toThrow(fixture.error)
  })
})
