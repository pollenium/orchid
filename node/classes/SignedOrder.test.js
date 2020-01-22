"use strict";
exports.__esModule = true;
var Order_1 = require("./Order");
var SignedOrder_1 = require("./SignedOrder");
var fixtures_1 = require("../fixtures");
var order = new Order_1.Order(fixtures_1.validOrderStruct);
var signature = fixtures_1.keypair.getSignature(order.getSugmaHash());
test('Order -> SignedOrder', function () {
    new SignedOrder_1.SignedOrder(order, signature);
});
test('getLigma/fromLigma', function () {
    var signedOrder0 = new SignedOrder_1.SignedOrder(order, signature);
    var ligma = signedOrder0.getLigma();
    var signedOrder1 = SignedOrder_1.SignedOrder.fromLigma(ligma);
    expect(signedOrder0.prevBlockHash.getIsEqual(signedOrder1.prevBlockHash)).toBe(true);
    expect(signedOrder0.type).toBe(signedOrder1.type);
    expect(signedOrder0.quotToken.getIsEqual(signedOrder1.quotToken)).toBe(true);
    expect(signedOrder0.variToken.getIsEqual(signedOrder1.variToken)).toBe(true);
    expect(signedOrder0.priceNumer.getIsEqual(signedOrder1.priceNumer)).toBe(true);
    expect(signedOrder0.priceDenom.getIsEqual(signedOrder1.priceDenom)).toBe(true);
    expect(signedOrder0.tokenLimit.getIsEqual(signedOrder1.tokenLimit)).toBe(true);
    expect(signedOrder0.signature.v.getIsEqual(signedOrder1.signature.v)).toBe(true);
    expect(signedOrder0.signature.r.getIsEqual(signedOrder1.signature.r)).toBe(true);
    expect(signedOrder0.signature.s.getIsEqual(signedOrder1.signature.s)).toBe(true);
    expect(signedOrder0.getTrader().getIsEqual(signedOrder1.getTrader())).toBe(true);
    expect(signedOrder0.getTrader().getIsEqual(signedOrder1.getTrader())).toBe(true);
});
