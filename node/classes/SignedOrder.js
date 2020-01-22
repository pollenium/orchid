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
exports.__esModule = true;
var Order_1 = require("./Order");
var SignedOrder = /** @class */ (function (_super) {
    __extends(SignedOrder, _super);
    function SignedOrder(orderStruct, signature) {
        var _this = _super.call(this, orderStruct) || this;
        _this.signature = signature;
        if (!_this.getIsValidSignature()) {
            throw new InvalidSignatureError;
        }
        return _this;
    }
    SignedOrder.prototype.getIsValidSignature = function () {
        if (this.isValidSignature) {
            return this.isValidSignature;
        }
        var signer = this.signature.getSigner(this.getSugmaHash());
        this.isValidSignature = signer.getIsEqual(this.originator);
        return this.isValidSignature;
    };
    SignedOrder.prototype.getEthersArg = function () {
        return [
            this.originator.getPhex(),
            this.quotToken.getPhex(),
            this.variToken.getPhex(),
            this.priceNumer.getPhex(),
            this.priceDenom.getPhex(),
            this.tokenLimit.getPhex(),
            this.signature.v.getNumber(),
            this.signature.r.getPhex(),
            this.signature.s.getPhex()
        ];
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
var InvalidSignatureError = /** @class */ (function (_super) {
    __extends(InvalidSignatureError, _super);
    function InvalidSignatureError() {
        var _this = _super.call(this, 'Invalid signature') || this;
        Object.setPrototypeOf(_this, InvalidSignatureError.prototype);
        return _this;
    }
    return InvalidSignatureError;
}(Error));
exports.InvalidSignatureError = InvalidSignatureError;
