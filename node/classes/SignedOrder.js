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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var constants_1 = require("../constants");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var Order_1 = require("./Order");
var crypto_1 = __importDefault(require("crypto"));
var SignedOrder = /** @class */ (function (_super) {
    __extends(SignedOrder, _super);
    function SignedOrder(orderStruct, signature) {
        var _this = _super.call(this, orderStruct) || this;
        _this.signature = signature;
        return _this;
    }
    SignedOrder.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = constants_1.ORDER_ENCODING_PREFIX.getCasted(pollenium_buttercup_1.Bytes)
            .getAppended(pollenium_buttercup_1.Uint8.fromArray([this.type]))
            .getAppended(this.quotToken)
            .getAppended(this.variToken)
            .getAppended(this.originator)
            .getAppended(this.tokenLimit)
            .getAppended(this.priceNumer)
            .getAppended(this.priceDenom)
            .getAppended(this.expiration)
            .getAppended(this.salt);
        return this.encoding;
    };
    SignedOrder.prototype.getEncodingHash = function () {
        if (this.encodingHash) {
            return this.encodingHash;
        }
        this.encodingHash = pollenium_buttercup_1.Bytes32.fromBuffer(crypto_1["default"].createHash('sha256').update(this.getEncoding().getBuffer()).digest());
        return this.encodingHash;
    };
    SignedOrder.prototype.getIsValidSignature = function () {
        if (this.isValidSignature) {
            return this.isValidSignature;
        }
        var signer = this.signature.getSigner(this.getEncodingHash());
        this.isValidSignature = signer.getIsEqual(this.originator);
        return this.isValidSignature;
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
