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
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_ilex_1 = require("pollenium-ilex");
var Order_1 = require("./Order");
var SignedOrder = /** @class */ (function (_super) {
    __extends(SignedOrder, _super);
    function SignedOrder(orderStruct, signature) {
        var _this = _super.call(this, orderStruct) || this;
        _this.signature = signature;
        return _this;
    }
    SignedOrder.prototype.getTrader = function () {
        if (this.trader) {
            return this.trader;
        }
        this.trader = this.signature.getSigner(this.getSugmaHash());
        return this.trader;
    };
    SignedOrder.prototype.getEthersArg = function () {
        return [
            this.getTrader().getPhex(),
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
    SignedOrder.prototype.getLigma = function () {
        if (this.ligma) {
            return this.ligma;
        }
        this.ligma = pollenium_buttercup_1.Bytes.fromArray([])
            .getAppended(this.prevBlockHash)
            .getAppended(pollenium_buttercup_1.Uint8.fromNumber(this.type))
            .getAppended(this.quotToken)
            .getAppended(this.variToken)
            .getAppended(this.priceNumer)
            .getAppended(this.priceDenom)
            .getAppended(this.tokenLimit)
            .getAppended(this.signature.v)
            .getAppended(this.signature.r)
            .getAppended(this.signature.s);
        return this.ligma;
    };
    SignedOrder.fromLigma = function (ligma) {
        var prevBlockHash = ligma.getSlice(0, 32).getCasted(pollenium_buttercup_1.Bytes32);
        var type = ligma.getUint8Array()[32];
        var quotToken = ligma.getSlice(33, 53).getCasted(pollenium_buttercup_1.Address);
        var variToken = ligma.getSlice(53, 73).getCasted(pollenium_buttercup_1.Address);
        var priceNumer = ligma.getSlice(73, 105).getCasted(pollenium_buttercup_1.Uint256);
        var priceDenom = ligma.getSlice(105, 137).getCasted(pollenium_buttercup_1.Uint256);
        var tokenLimit = ligma.getSlice(137, 169).getCasted(pollenium_buttercup_1.Uint256);
        var signatureV = ligma.getSlice(169, 170).getCasted(pollenium_buttercup_1.Uint8);
        var signatureR = ligma.getSlice(170, 202).getCasted(pollenium_buttercup_1.Bytes32);
        var signatureS = ligma.getSlice(202, 234).getCasted(pollenium_buttercup_1.Bytes32);
        var orderStruct = {
            prevBlockHash: prevBlockHash,
            type: type,
            quotToken: quotToken,
            variToken: variToken,
            priceNumer: priceNumer,
            priceDenom: priceDenom,
            tokenLimit: tokenLimit
        };
        var signature = new pollenium_ilex_1.Signature({
            v: signatureV,
            r: signatureR,
            s: signatureS
        });
        return new SignedOrder(orderStruct, signature);
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
