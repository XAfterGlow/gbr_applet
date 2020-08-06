function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) {
        for (var t = 0, e = new Array(r.length); t < r.length; t++) e[t] = r[t];
        return e;
    }
}

module.exports = _arrayWithoutHoles;