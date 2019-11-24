"use strict";
exports.__esModule = true;
var enums_1 = require("./enums");
function getOrderTypeString(type) {
    switch (type) {
        case enums_1.ORDER_TYPE.BUYY:
            return 'buyy';
        case enums_1.ORDER_TYPE.SELL:
            return 'sell';
    }
}
exports.getOrderTypeString = getOrderTypeString;
function getTokenTypeString(type) {
    switch (type) {
        case enums_1.TOKEN_TYPE.QUOT:
            return 'quot';
        case enums_1.TOKEN_TYPE.VARI:
            return 'vari';
    }
}
exports.getTokenTypeString = getTokenTypeString;
