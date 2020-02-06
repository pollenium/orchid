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
var ts_enum_util_1 = require("ts-enum-util");
var utils_1 = require("./lib/utils");
require('./engine.test');
require('./tokens.test');
var engineReader;
test('should fetch engineReader', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchEngineReader()];
            case 1:
                engineReader = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
fixtures_1.traderNames.forEach(function (traderName) {
    ts_enum_util_1.$enum(fixtures_1.TokenNames).forEach(function (tokenName) {
        test(traderName + " should approve " + tokenName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenWriter, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenWriter(traderName, tokenName)];
                    case 1:
                        tokenWriter = _d.sent();
                        _b = (_a = tokenWriter).setAllowance;
                        _c = {};
                        return [4 /*yield*/, utils_1.fetchOrDeployEngineAddress()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.spender = _d.sent(),
                                _c.amount = fixtures_1.startBalance,
                                _c)])];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test(traderName + " allowance of " + tokenName + " should be startBalance", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenReader, allowance, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchTokenReader(tokenName)];
                    case 1:
                        tokenReader = _d.sent();
                        _b = (_a = tokenReader).fetchAllowance;
                        _c = {
                            holder: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployEngineAddress()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.spender = _d.sent(),
                                _c)])];
                    case 3:
                        allowance = _d.sent();
                        expect(allowance.uu.getIsEqual(fixtures_1.startBalance.uu)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        test(traderName + " should deposit " + tokenName, function () { return __awaiter(void 0, void 0, void 0, function () {
            var engineWriter, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchEngineWriter(traderName)];
                    case 1:
                        engineWriter = _d.sent();
                        _b = (_a = engineWriter).deposit;
                        _c = {
                            to: utils_1.getAccountAddress(traderName)
                        };
                        return [4 /*yield*/, utils_1.fetchOrDeployTokenAddress(tokenName)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.token = _d.sent(),
                                _c.amount = fixtures_1.startBalance,
                                _c)])];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
