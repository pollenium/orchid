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
var OrderPair_1 = require("./OrderPair");
var SignedOrderPair = /** @class */ (function (_super) {
    __extends(SignedOrderPair, _super);
    function SignedOrderPair(struct) {
        var _this = _super.call(this, struct) || this;
        Object.assign(_this, struct);
        return _this;
    }
    SignedOrderPair.prototype.getAddressVars = function () {
        if (this.AddressVars) {
            return this.AddressVars;
        }
        this.AddressVars = [
            this.quotToken,
            this.variToken,
            this.buyyOrder.originator,
            this.sellOrder.originator
        ];
        return this.AddressVars;
    };
    SignedOrderPair.prototype.getUint256Vars = function (chainState) {
        if (this.uint256Vars) {
            return this.uint256Vars;
        }
        var solution = this.getSolution(chainState);
        this.uint256Vars = [
            solution.quotTokenTrans,
            solution.variTokenTrans,
            solution.quotTokenArbit,
            this.buyyOrder.tokenLimit,
            this.buyyOrder.priceNumer,
            this.buyyOrder.priceDenom,
            this.buyyOrder.expiration,
            this.buyyOrder.salt,
            this.sellOrder.tokenLimit,
            this.sellOrder.priceNumer,
            this.sellOrder.priceDenom,
            this.sellOrder.expiration,
            this.sellOrder.salt
        ];
        return this.uint256Vars;
    };
    SignedOrderPair.prototype.getUint008Vars = function () {
        if (this.uint008Vars) {
            return this.uint008Vars;
        }
        this.uint008Vars = [
            this.buyyOrder.signature.v,
            this.sellOrder.signature.v
        ];
        return this.uint008Vars;
    };
    SignedOrderPair.prototype.getBytes32Vars = function () {
        if (this.bytes32Vars) {
            return this.bytes32Vars;
        }
        this.bytes32Vars = [
            this.buyyOrder.signature.r,
            this.buyyOrder.signature.s,
            this.sellOrder.signature.r,
            this.sellOrder.signature.s,
        ];
        return this.bytes32Vars;
    };
    return SignedOrderPair;
}(OrderPair_1.OrderPair));
exports.SignedOrderPair = SignedOrderPair;
