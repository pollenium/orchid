"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var enums_1 = require("../enums");
var __1 = require("../");
var __2 = require("../");
var crypto_1 = __importDefault(require("crypto"));
var pollenium_buttercup_1 = require("pollenium-buttercup");
var alice = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var bob = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var dai = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var weth = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
test('order', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: dai,
        variToken: weth,
        originator: alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1000),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(37),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(100),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(0),
        salt: pollenium_buttercup_1.Uint256.fromNumber(0)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: dai,
        variToken: weth,
        originator: bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1000),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(37),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(100),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(0),
        salt: pollenium_buttercup_1.Uint256.fromNumber(0)
    });
    var orderPair = new __2.OrderPair(buyyOrder, sellOrder);
    var solution = orderPair.getSolution({
        buyyOrderTokenFilled: pollenium_buttercup_1.Uint256.fromNumber(0),
        sellOrderTokenFilled: pollenium_buttercup_1.Uint256.fromNumber(0),
        buyyOrderTokenBalance: pollenium_buttercup_1.Uint256.fromNumber(Number.MAX_SAFE_INTEGER),
        sellOrderTokenBalance: pollenium_buttercup_1.Uint256.fromNumber(Number.MAX_SAFE_INTEGER)
    });
    console.log(solution.variTokenTrans.getNumber());
    console.log(solution.quotTokenTrans.getNumber());
});
