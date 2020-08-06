var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

module.exports.encode = function(e) {
    var o, t, a, n, h, C, d, c = "", f = 0;
    for (e = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var e = "", o = 0; o < r.length; o++) {
            var t = r.charCodeAt(o);
            t < 128 ? e += String.fromCharCode(t) : (127 < t && t < 2048 ? e += String.fromCharCode(t >> 6 | 192) : (e += String.fromCharCode(t >> 12 | 224), 
            e += String.fromCharCode(t >> 6 & 63 | 128)), e += String.fromCharCode(63 & t | 128));
        }
        return e;
    }(e); f < e.length; ) n = (o = e.charCodeAt(f++)) >> 2, h = (3 & o) << 4 | (t = e.charCodeAt(f++)) >> 4, 
    C = (15 & t) << 2 | (a = e.charCodeAt(f++)) >> 6, d = 63 & a, isNaN(t) ? C = d = 64 : isNaN(a) && (d = 64), 
    c = c + r.charAt(n) + r.charAt(h) + r.charAt(C) + r.charAt(d);
    return c;
}, module.exports.decode = function(e) {
    var o, t, a, n, h, C, d = "", c = 0;
    for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length; ) o = r.indexOf(e.charAt(c++)) << 2 | (n = r.indexOf(e.charAt(c++))) >> 4, 
    t = (15 & n) << 4 | (h = r.indexOf(e.charAt(c++))) >> 2, a = (3 & h) << 6 | (C = r.indexOf(e.charAt(c++))), 
    d += String.fromCharCode(o), 64 != h && (d += String.fromCharCode(t)), 64 != C && (d += String.fromCharCode(a));
    return function(r) {
        for (var e = "", o = 0, t = 0, a = 0, n = 0; o < r.length; ) (t = r.charCodeAt(o)) < 128 ? (e += String.fromCharCode(t), 
        o++) : 191 < t && t < 224 ? (a = r.charCodeAt(o + 1), e += String.fromCharCode((31 & t) << 6 | 63 & a), 
        o += 2) : (a = r.charCodeAt(o + 1), n = r.charCodeAt(o + 2), e += String.fromCharCode((15 & t) << 12 | (63 & a) << 6 | 63 & n), 
        o += 3);
        return e;
    }(d);
};