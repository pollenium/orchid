"use strict";
exports.__esModule = true;
var OrderPair = /** @class */ (function () {
    function OrderPair(buyyOrder, sellOrder) {
        this.buyyOrder = buyyOrder;
        this.sellOrder = sellOrder;
        this.quotToken = this.buyyOrder.quotToken,
            this.variToken = this.buyyOrder.variToken;
    }
    OrderPair.prototype.getSolution = function (chainState) {
        var buyyOrderTokenAvail = this.buyyOrder.getTokenAvail(chainState.buyyOrderTokenFilled, chainState.buyyOrderTokenBalance);
        var sellOrderTokenAvail = this.buyyOrder.getTokenAvail(chainState.buyyOrderTokenFilled, chainState.buyyOrderTokenBalance);
        var buyyOrderQuotTokenTransMax = buyyOrderTokenAvail
            .mul(this.buyyOrder.priceDenom.mul(this.sellOrder.priceNumer))
            .divDn(this.buyyOrder.priceNumer.mul(this.sellOrder.priceDenom));
        var sellOrderQuotTokenTransMax = sellOrderTokenAvail
            .mul(this.sellOrder.priceNumer)
            .divDn(this.sellOrder.priceDenom);
        var quotTokenTrans = buyyOrderQuotTokenTransMax.lt(sellOrderQuotTokenTransMax)
            ? buyyOrderQuotTokenTransMax
            : sellOrderQuotTokenTransMax;
        var quotTokenArbit = buyyOrderTokenAvail.sub(quotTokenTrans);
        var variTokenTrans = quotTokenTrans
            .mul(this.sellOrder.priceDenom)
            .divDn(this.sellOrder.priceNumer);
        return {
            quotTokenTrans: quotTokenTrans,
            quotTokenArbit: quotTokenArbit,
            variTokenTrans: variTokenTrans
        };
    };
    return OrderPair;
}());
exports.OrderPair = OrderPair;
