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
    function SignedOrder(struct, signature) {
        var _this = _super.call(this, struct) || this;
        _this.signature = signature;
        return _this;
    }
    SignedOrder.fromOrder = function (order, signature) {
        return new SignedOrder(order.struct, signature);
    };
    return SignedOrder;
}(Order_1.Order));
exports.SignedOrder = SignedOrder;
