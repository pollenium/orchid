"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var contractOutputs_1 = require("../contractOutputs");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var ContractReader = /** @class */ (function () {
    function ContractReader(provider, abi, address) {
        this.provider = provider;
        this.abi = abi;
        this.address = address;
        this.ethersContract = new ethers_1.ethers.Contract(address.getPhex(), this.abi, provider);
    }
    return ContractReader;
}());
exports.ContractReader = ContractReader;
var ContractWriter = /** @class */ (function () {
    function ContractWriter(signer, abi, address) {
        this.signer = signer;
        this.abi = abi;
        this.address = address;
        this.ethersContract = new ethers_1.ethers.Contract(address.getPhex(), this.abi, signer);
    }
    return ContractWriter;
}());
exports.ContractWriter = ContractWriter;
var ContractDeployer = /** @class */ (function () {
    function ContractDeployer(signer, abi, bytecode) {
        this.signer = signer;
        this.abi = abi;
        this.bytecode = bytecode;
        this.ethersContractFactory = new ethers_1.ethers.ContractFactory(abi, bytecode.getUint8Array(), signer);
    }
    return ContractDeployer;
}());
exports.ContractDeployer = ContractDeployer;
var TokenDeployer = /** @class */ (function (_super) {
    __extends(TokenDeployer, _super);
    function TokenDeployer(signer) {
        return _super.call(this, signer, contractOutputs_1.tokenOutput.abi, contractOutputs_1.tokenOutput.bytecode) || this;
    }
    TokenDeployer.prototype.deploy = function (totalSupply) {
        return __awaiter(this, void 0, void 0, function () {
            var ethersContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContractFactory.deploy(totalSupply.getUint8Array())];
                    case 1:
                        ethersContract = _a.sent();
                        return [2 /*return*/, pollenium_buttercup_1.Address.fromHexish(ethersContract.address)];
                }
            });
        });
    };
    return TokenDeployer;
}(ContractDeployer));
exports.TokenDeployer = TokenDeployer;
var EngineDeployer = /** @class */ (function (_super) {
    __extends(EngineDeployer, _super);
    function EngineDeployer(signer) {
        return _super.call(this, signer, contractOutputs_1.engineOutput.abi, contractOutputs_1.engineOutput.bytecode) || this;
    }
    EngineDeployer.prototype.deploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethersContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContractFactory.deploy()];
                    case 1:
                        ethersContract = _a.sent();
                        return [2 /*return*/, pollenium_buttercup_1.Address.fromHexish(ethersContract.address)];
                }
            });
        });
    };
    return EngineDeployer;
}(ContractDeployer));
exports.EngineDeployer = EngineDeployer;
var MonarchicExecutorOracleDeployer = /** @class */ (function (_super) {
    __extends(MonarchicExecutorOracleDeployer, _super);
    function MonarchicExecutorOracleDeployer(signer) {
        return _super.call(this, signer, contractOutputs_1.monarchicExecutorOracleOutput.abi, contractOutputs_1.monarchicExecutorOracleOutput.bytecode) || this;
    }
    MonarchicExecutorOracleDeployer.prototype.deploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ethersContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContractFactory.deploy()];
                    case 1:
                        ethersContract = _a.sent();
                        return [2 /*return*/, pollenium_buttercup_1.Address.fromHexish(ethersContract.address)];
                }
            });
        });
    };
    return MonarchicExecutorOracleDeployer;
}(ContractDeployer));
exports.MonarchicExecutorOracleDeployer = MonarchicExecutorOracleDeployer;
var TokenReader = /** @class */ (function (_super) {
    __extends(TokenReader, _super);
    function TokenReader(provider, address) {
        return _super.call(this, provider, contractOutputs_1.tokenOutput.abi, address) || this;
    }
    TokenReader.prototype.fetchBalance = function (holder) {
        return __awaiter(this, void 0, void 0, function () {
            var holderBignumber, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.balanceOf(holder.getPhex())];
                    case 1:
                        holderBignumber = _c.sent();
                        _b = (_a = pollenium_buttercup_1.Uint256).fromHexish;
                        return [4 /*yield*/, ethers_1.ethers.utils.hexlify(holderBignumber)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    TokenReader.prototype.fetchAllowance = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var holder, spender, allowanceBignumber, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        holder = struct.holder, spender = struct.spender;
                        return [4 /*yield*/, this.ethersContract.allowance(holder.getPhex(), spender.getPhex())];
                    case 1:
                        allowanceBignumber = _c.sent();
                        _b = (_a = pollenium_buttercup_1.Uint256).fromHexish;
                        return [4 /*yield*/, ethers_1.ethers.utils.hexlify(allowanceBignumber)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    return TokenReader;
}(ContractReader));
exports.TokenReader = TokenReader;
var EngineReader = /** @class */ (function (_super) {
    __extends(EngineReader, _super);
    function EngineReader(provider, address) {
        return _super.call(this, provider, contractOutputs_1.engineOutput.abi, address) || this;
    }
    EngineReader.prototype.fetchOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = pollenium_buttercup_1.Address).fromHexish;
                        return [4 /*yield*/, this.ethersContract.owner()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    EngineReader.prototype.fetchExecutorOracle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = pollenium_buttercup_1.Address).fromHexish;
                        return [4 /*yield*/, this.ethersContract.executorOracle()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    EngineReader.prototype.fetchBalance = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var holder, token, balanceBignumber, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        holder = struct.holder, token = struct.token;
                        return [4 /*yield*/, this.ethersContract.balances(holder.getPhex(), token.getPhex())];
                    case 1:
                        balanceBignumber = _c.sent();
                        _b = (_a = pollenium_buttercup_1.Uint256).fromHexish;
                        return [4 /*yield*/, ethers_1.ethers.utils.hexlify(balanceBignumber)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    return EngineReader;
}(ContractReader));
exports.EngineReader = EngineReader;
var MonarchicExecutorOracleReader = /** @class */ (function (_super) {
    __extends(MonarchicExecutorOracleReader, _super);
    function MonarchicExecutorOracleReader(provider, address) {
        return _super.call(this, provider, contractOutputs_1.monarchicExecutorOracleOutput.abi, address) || this;
    }
    MonarchicExecutorOracleReader.prototype.fetchOwner = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = pollenium_buttercup_1.Address).fromHexish;
                        return [4 /*yield*/, this.ethersContract.owner()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    MonarchicExecutorOracleReader.prototype.fetchHot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = pollenium_buttercup_1.Address).fromHexish;
                        return [4 /*yield*/, this.ethersContract.hot()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    MonarchicExecutorOracleReader.prototype.fetchCold = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = pollenium_buttercup_1.Address).fromHexish;
                        return [4 /*yield*/, this.ethersContract.cold()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    return MonarchicExecutorOracleReader;
}(ContractReader));
exports.MonarchicExecutorOracleReader = MonarchicExecutorOracleReader;
var TokenWriter = /** @class */ (function (_super) {
    __extends(TokenWriter, _super);
    function TokenWriter(signer, address) {
        return _super.call(this, signer, contractOutputs_1.tokenOutput.abi, address) || this;
    }
    TokenWriter.prototype.transfer = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = struct.to, amount = struct.amount;
                        return [4 /*yield*/, this.ethersContract.transfer(to.getPhex(), amount.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenWriter.prototype.setAllowance = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var spender, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spender = struct.spender, amount = struct.amount;
                        return [4 /*yield*/, this.ethersContract.approve(spender.getPhex(), amount.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TokenWriter;
}(ContractWriter));
exports.TokenWriter = TokenWriter;
var EngineWriter = /** @class */ (function (_super) {
    __extends(EngineWriter, _super);
    function EngineWriter(signer, address) {
        return _super.call(this, signer, contractOutputs_1.engineOutput.abi, address) || this;
    }
    EngineWriter.prototype.setOwner = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.transferOwnership(owner.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EngineWriter.prototype.setExecutorOracle = function (executorOracle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.setExecutorOracle(executorOracle.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EngineWriter.prototype.deposit = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var to, token, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = struct.to, token = struct.token, amount = struct.amount;
                        return [4 /*yield*/, this.ethersContract.deposit(to.getPhex(), token.getPhex(), amount.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EngineWriter.prototype.execute = function (executionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var args;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = [
                            executionRequest.prevBlockHash.getPhex(),
                            executionRequest.buyyOrders.map(function (signedOrder) {
                                return signedOrder.getEthersArg();
                            }),
                            executionRequest.sellOrders.map(function (signedOrder) {
                                return signedOrder.getEthersArg();
                            }),
                            executionRequest.exchanges.map(function (exchange) {
                                return {
                                    buyyOrderIndex: exchange.signedBuyyOrderIndex.getPhex(),
                                    sellOrderIndex: exchange.signedSellOrderIndex.getPhex(),
                                    quotTokenTrans: exchange.quotTokenTrans.getPhex(),
                                    variTokenTrans: exchange.variTokenTrans.getPhex(),
                                    quotTokenArbit: exchange.quotTokenArbit.getPhex()
                                };
                            })
                        ];
                        return [4 /*yield*/, (_a = this.ethersContract).execute.apply(_a, args)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return EngineWriter;
}(ContractWriter));
exports.EngineWriter = EngineWriter;
var MonarchicExecutorOracleWriter = /** @class */ (function (_super) {
    __extends(MonarchicExecutorOracleWriter, _super);
    function MonarchicExecutorOracleWriter(signer, address) {
        return _super.call(this, signer, contractOutputs_1.monarchicExecutorOracleOutput.abi, address) || this;
    }
    MonarchicExecutorOracleWriter.prototype.setHot = function (hot) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.setHot(hot.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MonarchicExecutorOracleWriter.prototype.setCold = function (cold) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.setCold(cold.getPhex())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MonarchicExecutorOracleWriter;
}(ContractWriter));
exports.MonarchicExecutorOracleWriter = MonarchicExecutorOracleWriter;
