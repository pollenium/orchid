"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var crypto_1 = __importDefault(require("crypto"));
exports.ORDER_ENCODING_PREFIX_PREHASH_UTF8 = '\x00Alchemilla V1 Order';
exports.ORDER_ENCODING_PREFIX = pollenium_buttercup_1.Bytes32.fromBuffer(crypto_1["default"].createHash('sha256').update(exports.ORDER_ENCODING_PREFIX_PREHASH_UTF8).digest());
