"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var ganacheProvider_1 = require("./ganacheProvider");
exports.web3Provider = new ethers_1.providers.Web3Provider(ganacheProvider_1.ganacheProvider, { name: 'ganache', chainId: 1 });
