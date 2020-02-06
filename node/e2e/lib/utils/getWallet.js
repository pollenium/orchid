"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var getKeypair_1 = require("./getKeypair");
var web3Provider_1 = require("../web3Provider");
var wallets = {};
function getWallet(accountName) {
    if (wallets[accountName]) {
        return wallets[accountName];
    }
    var keypair = getKeypair_1.getKeypair(accountName);
    wallets[accountName] = new ethers_1.Wallet(keypair.privateKey.u, web3Provider_1.web3Provider);
    return wallets[accountName];
}
exports.getWallet = getWallet;
