"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fixtures_1 = require("./fixtures");
var utils_1 = require("./utils");
var ts_enum_util_1 = require("ts-enum-util");
var ganache_cli_1 = __importDefault(require("ganache-cli"));
exports.ganacheProvider = ganache_cli_1["default"].provider({
    gasLimit: 0xfffffffffff,
    gasPrice: 0x01,
    accounts: ts_enum_util_1.$enum(fixtures_1.AccountNames).map(function (name) {
        var keypair = utils_1.getKeypair(name);
        return {
            balance: Number.MAX_SAFE_INTEGER,
            secretKey: keypair.privateKey.getBuffer()
        };
    })
});
