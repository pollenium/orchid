"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var __1 = require("../");
var crypto_1 = __importDefault(require("crypto"));
var pollenium_buttercup_1 = require("pollenium-buttercup");
var alice = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var bob = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var dai = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
var weth = pollenium_buttercup_1.Bytes20.fromBuffer(crypto_1["default"].randomBytes(20));
test('order', function () {
    var order = new __1.Order(__1.ORDER_TYPE.BUYY, dai, weth, alice, pollenium_buttercup_1.Uint256.fromNumber(1000), pollenium_buttercup_1.Uint256.fromNumber(37), pollenium_buttercup_1.Uint256.fromNumber(100), pollenium_buttercup_1.Uint256.fromNumber(0), pollenium_buttercup_1.Uint256.fromNumber(0));
});
