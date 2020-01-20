"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var enums_1 = require("./enums");
var crypto_1 = __importDefault(require("crypto"));
var pollenium_ilex_1 = require("pollenium-ilex");
exports.alice = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.bob = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.dai = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.usdc = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.weth = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.mkr = pollenium_buttercup_1.Address.fromBuffer(crypto_1["default"].randomBytes(20));
exports.nullAddress = pollenium_buttercup_1.Address.genNull();
exports.uint256Zero = pollenium_buttercup_1.Uint256.fromNumber(0);
exports.nullBytes32 = new pollenium_buttercup_1.Bytes32((new Uint8Array(32)).fill(0));
exports.keypair = pollenium_ilex_1.Keypair.generate();
exports.validOrderStruct = {
    prevBlockHash: exports.nullBytes32,
    type: enums_1.ORDER_TYPE.BUYY,
    quotToken: exports.usdc,
    variToken: exports.weth,
    originator: exports.keypair.getAddress(),
    tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1),
    priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
    priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1)
};
