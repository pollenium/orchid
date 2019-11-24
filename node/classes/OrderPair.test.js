"use strict";
exports.__esModule = true;
var enums_1 = require("../enums");
var __1 = require("../");
var __2 = require("../");
var OrderPair_1 = require("./OrderPair");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var fixtures_1 = require("../fixtures");
var MAX = Number.MAX_SAFE_INTEGER;
var fixtures = [
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
];
fixtures.forEach(function (fixture, index) {
    var buyyOrderPriceNumer = pollenium_buttercup_1.Uint256.fromNumber(fixture[0]);
    var buyyOrderPriceDenom = pollenium_buttercup_1.Uint256.fromNumber(fixture[1]);
    var sellOrderPriceNumer = pollenium_buttercup_1.Uint256.fromNumber(fixture[2]);
    var sellOrderPriceDenom = pollenium_buttercup_1.Uint256.fromNumber(fixture[3]);
    var buyyOrderTokenLimit = pollenium_buttercup_1.Uint256.fromNumber(fixture[4]);
    var sellOrderTokenLimit = pollenium_buttercup_1.Uint256.fromNumber(fixture[5]);
    var buyyOrderTokenFilled = pollenium_buttercup_1.Uint256.fromNumber(fixture[6]);
    var sellOrderTokenFilled = pollenium_buttercup_1.Uint256.fromNumber(fixture[7]);
    var buyyOrderTokenBalance = pollenium_buttercup_1.Uint256.fromNumber(fixture[8]);
    var sellOrderTokenBalance = pollenium_buttercup_1.Uint256.fromNumber(fixture[9]);
    var quotTokenTransNumber = fixture[10];
    var variTokenTransNumber = fixture[11];
    var quotTokenArbitNumber = fixture[12];
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: buyyOrderTokenLimit,
        priceNumer: buyyOrderPriceNumer,
        priceDenom: buyyOrderPriceDenom,
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.bob,
        tokenLimit: sellOrderTokenLimit,
        priceNumer: sellOrderPriceNumer,
        priceDenom: sellOrderPriceDenom,
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var orderPair = new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    var solution = orderPair.getSolution({
        buyyOrderTokenFilled: buyyOrderTokenFilled,
        sellOrderTokenFilled: sellOrderTokenFilled,
        buyyOrderTokenBalance: buyyOrderTokenBalance,
        sellOrderTokenBalance: sellOrderTokenBalance
    });
    test("order pair #" + index + ": quotTokenTrans", function () {
        expect(solution.quotTokenTrans.getNumber()).toBe(quotTokenTransNumber);
    });
    test("order pair #" + index + ": variTokenTrans", function () {
        expect(solution.variTokenTrans.getNumber()).toBe(variTokenTransNumber);
    });
    test("order pair #" + index + ": quotTokenArbit", function () {
        expect(solution.quotTokenArbit.getNumber()).toBe(quotTokenArbitNumber);
    });
});
test('InvalidBuyyOrderTypeError', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.InvalidBuyyOrderTypeError);
});
test('InvalidSellOrderTypeError', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.InvalidSellOrderTypeError);
});
test('QuotTokenMismatchError', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.usdc,
        variToken: fixtures_1.weth,
        originator: fixtures_1.bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.QuotTokenMismatchError);
});
test('VariTokenMismatchError', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.mkr,
        originator: fixtures_1.bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.VariTokenMismatchError);
});
test('PriceConstraintError', function () {
    var buyyOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.BUYY,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.alice,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    var sellOrder = new __1.Order({
        type: enums_1.ORDER_TYPE.SELL,
        quotToken: fixtures_1.dai,
        variToken: fixtures_1.weth,
        originator: fixtures_1.bob,
        tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
        priceNumer: pollenium_buttercup_1.Uint256.fromNumber(2),
        priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
        expiration: pollenium_buttercup_1.Uint256.fromNumber(1),
        salt: pollenium_buttercup_1.Uint256.fromNumber(1)
    });
    expect(function () {
        new __2.OrderPair({ buyyOrder: buyyOrder, sellOrder: sellOrder });
    }).toThrow(OrderPair_1.PriceConstraintError);
});
