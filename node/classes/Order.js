"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var constants_1 = require("../constants");
var Order = /** @class */ (function () {
    function Order(struct) {
        this.struct = struct;
        Object.assign(this, struct);
    }
    Order.prototype.getPersonalMessage = function () {
        return constants_1.PERSONAL_MESSAGE_PREFIX
            .getAppended(pollenium_buttercup_1.Bytes1.fromArray([this.type]))
            .getAppended(this.quotToken)
            .getAppended(this.variToken)
            .getAppended(this.originator)
            .getAppended(this.tokenLimit)
            .getAppended(this.priceNumer)
            .getAppended(this.priceDenom)
            .getAppended(this.expiration)
            .getAppended(this.salt);
    };
    Order.prototype.getTokenUnfilled = function (tokenFilled) {
        return this.tokenLimit.sub(tokenFilled);
    };
    Order.prototype.getTokenAvail = function (tokenFilled, tokenBalance) {
        var tokenUnfilled = this.getTokenUnfilled(tokenFilled);
        if (tokenUnfilled.lt(tokenBalance)) {
            return tokenUnfilled;
        }
        else {
            return tokenBalance;
        }
    };
    return Order;
}());
exports.Order = Order;
