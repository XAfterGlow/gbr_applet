var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/helpers/defineProperty")), a = e(require("./showdown.js")), i = e(require("./html2json.js")), r = 0, n = 0;

function d(e) {
    var t = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && 0 < i.length && wx.previewImage({
        current: t,
        urls: this.data[i].imageUrls
    });
}

function o(e) {
    var i = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== i && 0 < i.length && function(e, i, a, d) {
        var o, s = a.data[d];
        if (s && 0 != s.images.length) {
            var l, h, g, m, v, u, w, f, c = s.images, x = (l = e.detail.width, h = e.detail.height, 
            g = d, u = v = 0, w = {}, f = a.data[g].view.imagePadding, l > (m = r - 2 * f) ? (u = (v = m) * h / l, 
            w.imageWidth = v, w.imageheight = u) : (w.imageWidth = l, w.imageheight = h), (r <= 0 || n <= 0) && wx.getSystemInfo({
                success: function(e) {
                    r = e.windowWidth, n = e.windowHeight, w.imageWidth = r < l ? r - 2 * f : l;
                }
            }), w), P = c[i].index, p = "".concat(d), y = !0, j = !1, I = void 0;
            try {
                for (var W, b = P.split(".")[Symbol.iterator](); !(y = (W = b.next()).done); y = !0) {
                    var q = W.value;
                    p += ".nodes[".concat(q, "]");
                }
            } catch (e) {
                j = !0, I = e;
            } finally {
                try {
                    y || null == b.return || b.return();
                } finally {
                    if (j) throw I;
                }
            }
            var D = p + ".width", S = p + ".height";
            a.setData((o = {}, (0, t.default)(o, D, x.imageWidth), (0, t.default)(o, S, x.imageheight), 
            o));
        }
    }(e, a, this, i);
}

wx.getSystemInfo({
    success: function(e) {
        r = e.windowWidth, n = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', n = 3 < arguments.length ? arguments[3] : void 0, s = 4 < arguments.length ? arguments[4] : void 0;
        if (r && "" != r) {
            var l = n, h = {};
            if ("html" == t) h = i.default.html2json(r, e); else if ("md" == t || "markdown" == t) {
                var g = new a.default.Converter().makeHtml(r);
                h = i.default.html2json(g, e);
            }
            h.view = {}, void (h.view.imagePadding = 0) !== s && (h.view.imagePadding = s);
            var m = {};
            m[e] = h, l.setData(m), l.wxParseImgLoad = o, l.wxParseImgTap = d;
        }
    },
    wxParseTemArray: function(e, t, i, a) {
        for (var r = [], n = a.data, d = null, o = 0; o < i; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, a.setData(d);
    },
    emojisInit: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = 2 < arguments.length ? arguments[2] : void 0;
        i.default.emojisInit(e, t, a);
    }
};