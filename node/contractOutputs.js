"use strict";
exports.__esModule = true;
var ContractOutput_1 = require("./classes/ContractOutput");
exports.engineOutput = new ContractOutput_1.ContractOutput('Engine.sol', 'Engine');
exports.tokenOutput = new ContractOutput_1.ContractOutput('Token.sol', 'Token');
exports.monarchicExecutorOracleOutput = new ContractOutput_1.ContractOutput('MonarchicExecutorOracle.sol', 'MonarchicExecutorOracle');
