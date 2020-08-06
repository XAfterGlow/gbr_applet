var objectWithoutPropertiesLoose = require("./objectWithoutPropertiesLoose");

function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        for (r = 0; r < s.length; r++) o = s[r], 0 <= t.indexOf(o) || Object.prototype.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}

module.exports = _objectWithoutProperties;