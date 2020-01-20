"use strict";
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
var fixtures_1 = require("./lib/fixtures");
var utils_1 = require("./lib/utils");
var ts_enum_util_1 = require("ts-enum-util");
var deployerAddress = utils_1.getAccountAddress(fixtures_1.AccountNames.DEPLOYER);
ts_enum_util_1.$enum(fixtures_1.TokenNames).forEach(function (tokenName) {
    var tokenContractReader;
    test("fetch " + tokenName + " reader/writer", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                case 1:
                    tokenContractReader = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('balance of DEPLOYER should be totalSupply', function () { return __awaiter(void 0, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenContractReader.fetchBalance(deployerAddress)];
                case 1:
                    balance = _a.sent();
                    expect(balance.getNumber()).toBe(fixtures_1.totalSupply.getNumber());
                    return [2 /*return*/];
            }
        });
    }); });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("transfer startBalance to " + traderName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenContractWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenWriter(fixtures_1.AccountNames.DEPLOYER, tokenName)];
                    case 1:
                        tokenContractWriter = _a.sent();
                        return [4 /*yield*/, tokenContractWriter.transfer({
                                to: utils_1.getAccountAddress(traderName),
                                amount: fixtures_1.startBalance
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    fixtures_1.traderNames.forEach(function (traderName) {
        test("balance of " + traderName + " should be startBalance", function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokenContractReader.fetchBalance(utils_1.getAccountAddress(traderName))];
                    case 1:
                        balance = _a.sent();
                        expect(balance.getNumber()).toBe(fixtures_1.startBalance.getNumber());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    test('balance of DEPLOYER should be 0', function () { return __awaiter(void 0, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenContractReader.fetchBalance(deployerAddress)];
                case 1:
                    balance = _a.sent();
                    expect(balance.getNumber()).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
