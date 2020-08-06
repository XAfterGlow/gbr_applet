function _objectWithoutPropertiesLoose(e, t) {
    if (null == e) return {};
    var o, r, i = {}, s = Object.keys(e);
    for (r = 0; r < s.length; r++) o = s[r], 0 <= t.indexOf(o) || (i[o] = e[o]);
    return i;
}

module.exports = _objectWithoutPropertiesLoose;