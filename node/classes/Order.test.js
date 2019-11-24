"use strict";
exports.__esModule = true;
var fixtures_1 = require("../fixtures");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var enums_1 = require("../enums");
var Order_1 = require("./Order");
var validOrder = {
    type: enums_1.ORDER_TYPE.BUYY,
    quotToken: fixtures_1.usdc,
    variToken: fixtures_1.weth,
    originator: fixtures_1.alice,
    tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
    priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
    priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
    expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
    salt: pollenium_buttercup_1.Uint256.fromNumber(1)
};
var invalidOrderFixtures = [
    {
        error: Order_1.QuotVariTokenMatchError,
        delta: {
            variToken: fixtures_1.usdc
        }
    },
    {
        error: Order_1.NullQuotTokenError,
        delta: {
            quotToken: fixtures_1.nullAddress
        }
    },
    {
        error: Order_1.NullVariTokenError,
        delta: {
            variToken: fixtures_1.nullAddress
        }
    },
    {
        error: Order_1.NullOriginatorError,
        delta: {
            originator: fixtures_1.nullAddress
        }
    },
    {
        error: Order_1.ZeroTokenLimitError,
        delta: {
            tokenLimit: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroPriceNumerError,
        delta: {
            priceNumer: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroPriceDenomError,
        delta: {
            priceDenom: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroExpirationError,
        delta: {
            expiration: fixtures_1.uint256Zero
        }
    },
    {
        error: Order_1.ZeroSaltError,
        delta: {
            salt: fixtures_1.uint256Zero
        }
    }
];
test('valid', function () {
    new Order_1.Order(validOrder);
});
invalidOrderFixtures.forEach(function (fixture) {
    test(fixture.error.name, function () {
        expect(function () {
            var orderStruct = Object.assign(Object.assign({}, validOrder), fixture.delta);
            new Order_1.Order(orderStruct);
        }).toThrow(fixture.error);
    });
});
