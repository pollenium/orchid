"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bn_js_1 = __importDefault(require("bn.js"));
var pollenium_buttercup_1 = require("pollenium-buttercup");
function getNowNumber() {
    return Math.floor((new Date).getTime() / 1000);
}
exports.getNowNumber = getNowNumber;
function getNowBn() {
    return new bn_js_1["default"](getNowNumber());
}
exports.getNowBn = getNowBn;
function generateSalt() {
    return pollenium_buttercup_1.Buttercup.random(32);
}
exports.generateSalt = generateSalt;
