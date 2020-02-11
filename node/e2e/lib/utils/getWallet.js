"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var getKeypair_1 = require("./getKeypair");
var gaillardia_1 = require("../gaillardia");
var wallets = {};
function getWallet(accountName) {
    if (wallets[accountName]) {
        return wallets[accountName];
    }
    var keypair = getKeypair_1.getKeypair(accountName);
    wallets[accountName] = new ethers_1.Wallet(keypair.privateKey.u, gaillardia_1.gaillardia.ethersWeb3Provider);
    return wallets[accountName];
}
exports.getWallet = getWallet;
