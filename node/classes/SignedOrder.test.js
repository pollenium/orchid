"use strict";
exports.__esModule = true;
var Order_1 = require("./Order");
var SignedOrder_1 = require("./SignedOrder");
var fixtures_1 = require("../fixtures");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var order = new Order_1.Order(fixtures_1.validOrderStruct);
var signature = fixtures_1.keypair.getSignature(order.getSugmaHash());
var invalidSignature = fixtures_1.keypair.getSignature(pollenium_buttercup_1.Bytes32.fromArray([]));
test('Order -> SignedOrder', function () {
    new SignedOrder_1.SignedOrder(order, signature);
});
test('InvalidSignatureError', function () {
    expect(function () {
        new SignedOrder_1.SignedOrder(order, invalidSignature);
    }).toThrow(SignedOrder_1.InvalidSignatureError);
});
