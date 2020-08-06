var arrayWithoutHoles = require("./arrayWithoutHoles"), iterableToArray = require("./iterableToArray"), nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(r) {
    return arrayWithoutHoles(r) || iterableToArray(r) || nonIterableSpread();
}

module.exports = _toConsumableArray;