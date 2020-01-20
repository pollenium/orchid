"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var web3_1 = __importDefault(require("web3"));
var ganacheProvider_1 = require("./ganacheProvider");
exports.web3 = new web3_1["default"](ganacheProvider_1.ganacheProvider);
