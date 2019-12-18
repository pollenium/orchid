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
var pollenium_buttercup_1 = require("pollenium-buttercup");
var crypto_1 = __importDefault(require("crypto"));
var Order = /** @class */ (function () {
    function Order(struct) {
        Object.assign(this, struct);
        if (this.quotToken.getIsEqual(this.variToken)) {
            throw new QuotVariTokenMatchError(this.quotToken);
        }
        if (this.quotToken.getIsNull()) {
            throw new NullQuotTokenError;
        }
        if (this.variToken.getIsNull()) {
            throw new NullVariTokenError;
        }
        if (this.originator.getIsNull()) {
            throw new NullOriginatorError;
        }
        if (this.tokenLimit.getIsZero()) {
            throw new ZeroTokenLimitError;
        }
        if (this.priceNumer.getIsZero()) {
            throw new ZeroPriceNumerError;
        }
        if (this.priceDenom.getIsZero()) {
            throw new ZeroPriceDenomError;
        }
        if (this.expiration.getIsZero()) {
            throw new ZeroExpirationError;
        }
        if (this.salt.getIsZero()) {
            throw new ZeroSaltError;
        }
    }
    Order.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = pollenium_buttercup_1.Bytes.fromArray([this.type])
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
    Order.prototype.getEncodingHash = function () {
        if (this.encodingHash) {
            return this.encodingHash;
        }
        this.encodingHash = pollenium_buttercup_1.Bytes32.fromBuffer(crypto_1["default"].createHash('sha256').update(this.getEncoding().getBuffer()).digest());
        return this.encodingHash;
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
var QuotVariTokenMatchError = /** @class */ (function (_super) {
    __extends(QuotVariTokenMatchError, _super);
    function QuotVariTokenMatchError(token) {
        var _this = _super.call(this, "quotToken and variToken should be different, received " + token.getHex() + " for both") || this;
        Object.setPrototypeOf(_this, QuotVariTokenMatchError.prototype);
        return _this;
    }
    return QuotVariTokenMatchError;
}(Error));
exports.QuotVariTokenMatchError = QuotVariTokenMatchError;
var NullError = /** @class */ (function (_super) {
    __extends(NullError, _super);
    function NullError(variableName) {
        return _super.call(this, variableName + " should not be null") || this;
    }
    return NullError;
}(Error));
var ZeroError = /** @class */ (function (_super) {
    __extends(ZeroError, _super);
    function ZeroError(variableName) {
        return _super.call(this, variableName + " should not be zero") || this;
    }
    return ZeroError;
}(Error));
var NullQuotTokenError = /** @class */ (function (_super) {
    __extends(NullQuotTokenError, _super);
    function NullQuotTokenError() {
        var _this = _super.call(this, 'quotToken') || this;
        Object.setPrototypeOf(_this, NullQuotTokenError.prototype);
        return _this;
    }
    return NullQuotTokenError;
}(NullError));
exports.NullQuotTokenError = NullQuotTokenError;
var NullVariTokenError = /** @class */ (function (_super) {
    __extends(NullVariTokenError, _super);
    function NullVariTokenError() {
        var _this = _super.call(this, 'variToken') || this;
        Object.setPrototypeOf(_this, NullVariTokenError.prototype);
        return _this;
    }
    return NullVariTokenError;
}(NullError));
exports.NullVariTokenError = NullVariTokenError;
var NullOriginatorError = /** @class */ (function (_super) {
    __extends(NullOriginatorError, _super);
    function NullOriginatorError() {
        var _this = _super.call(this, 'originator') || this;
        Object.setPrototypeOf(_this, NullOriginatorError.prototype);
        return _this;
    }
    return NullOriginatorError;
}(NullError));
exports.NullOriginatorError = NullOriginatorError;
var ZeroTokenLimitError = /** @class */ (function (_super) {
    __extends(ZeroTokenLimitError, _super);
    function ZeroTokenLimitError() {
        var _this = _super.call(this, 'tokenLimit') || this;
        Object.setPrototypeOf(_this, ZeroTokenLimitError.prototype);
        return _this;
    }
    return ZeroTokenLimitError;
}(ZeroError));
exports.ZeroTokenLimitError = ZeroTokenLimitError;
var ZeroPriceNumerError = /** @class */ (function (_super) {
    __extends(ZeroPriceNumerError, _super);
    function ZeroPriceNumerError() {
        var _this = _super.call(this, 'priceNumer') || this;
        Object.setPrototypeOf(_this, ZeroPriceNumerError.prototype);
        return _this;
    }
    return ZeroPriceNumerError;
}(ZeroError));
exports.ZeroPriceNumerError = ZeroPriceNumerError;
var ZeroPriceDenomError = /** @class */ (function (_super) {
    __extends(ZeroPriceDenomError, _super);
    function ZeroPriceDenomError() {
        var _this = _super.call(this, 'priceDenom') || this;
        Object.setPrototypeOf(_this, ZeroPriceDenomError.prototype);
        return _this;
    }
    return ZeroPriceDenomError;
}(ZeroError));
exports.ZeroPriceDenomError = ZeroPriceDenomError;
var ZeroExpirationError = /** @class */ (function (_super) {
    __extends(ZeroExpirationError, _super);
    function ZeroExpirationError() {
        var _this = _super.call(this, 'expiration') || this;
        Object.setPrototypeOf(_this, ZeroExpirationError.prototype);
        return _this;
    }
    return ZeroExpirationError;
}(ZeroError));
exports.ZeroExpirationError = ZeroExpirationError;
var ZeroSaltError = /** @class */ (function (_super) {
    __extends(ZeroSaltError, _super);
    function ZeroSaltError() {
        var _this = _super.call(this, 'salt') || this;
        Object.setPrototypeOf(_this, ZeroSaltError.prototype);
        return _this;
    }
    return ZeroSaltError;
}(ZeroError));
exports.ZeroSaltError = ZeroSaltError;
