"use strict";
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var ContractOutput = /** @class */ (function () {
    function ContractOutput(fileName, contractName) {
        this.fileName = fileName;
        this.contractName = contractName;
        this.abi = pollenium_alchemilla_1.output.contracts[fileName][contractName].abi;
        this.bytecode = new pollenium_buttercup_1.Bytes(pollenium_uvaursi_1.Uu.fromHexish(pollenium_alchemilla_1.output.contracts[fileName][contractName].evm.bytecode.object));
    }
    return ContractOutput;
}());
exports.ContractOutput = ContractOutput;
