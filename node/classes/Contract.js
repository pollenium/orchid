"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var ContractReader = /** @class */ (function () {
    function ContractReader(provider, abi, address) {
        this.provider = provider;
        this.abi = abi;
        this.address = address;
        this.ethersContract = new ethers_1.ethers.Contract(address.uu.toPhex(), this.abi, provider);
    }
    return ContractReader;
}());
exports.ContractReader = ContractReader;
var ContractWriter = /** @class */ (function () {
    function ContractWriter(signer, abi, address) {
        this.signer = signer;
        this.abi = abi;
        this.address = address;
        this.ethersContract = new ethers_1.ethers.Contract(address.uu.toPhex(), this.abi, signer);
    }
    return ContractWriter;
}());
exports.ContractWriter = ContractWriter;
var ContractDeployer = /** @class */ (function () {
    function ContractDeployer(signer, abi, bytecode) {
        this.signer = signer;
        this.abi = abi;
        this.bytecode = bytecode;
        this.ethersContractFactory = new ethers_1.ethers.ContractFactory(abi, bytecode.u, signer);
    }
    return ContractDeployer;
}());
exports.ContractDeployer = ContractDeployer;
