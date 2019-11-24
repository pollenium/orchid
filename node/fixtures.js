"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var crypto_1 = __importDefault(require("crypto"));
exports.alice = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.bob = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.dai = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.usdc = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.weth = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.mkr = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.nullAddress = pollenium_buttercup_1.Address.genNull();
exports.uint256Zero = pollenium_buttercup_1.Uint256.fromNumber(0);
