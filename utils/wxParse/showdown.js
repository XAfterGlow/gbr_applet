var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/typeof"));

function r(e) {
    var r = {
        omitExtraWLInCodeBlocks: {
            defaultValue: !1,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
        },
        noHeaderId: {
            defaultValue: !1,
            describe: "Turn on/off generated header id",
            type: "boolean"
        },
        prefixHeaderId: {
            defaultValue: !1,
            describe: "Specify a prefix to generated header ids",
            type: "string"
        },
        headerLevelStart: {
            defaultValue: !1,
            describe: "The header blocks level start",
            type: "integer"
        },
        parseImgDimensions: {
            defaultValue: !1,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
        },
        simplifiedAutoLink: {
            defaultValue: !1,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
        },
        literalMidWordUnderscores: {
            defaultValue: !1,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
        },
        strikethrough: {
            defaultValue: !1,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
        },
        tables: {
            defaultValue: !1,
            describe: "Turn on/off tables support",
            type: "boolean"
        },
        tablesHeaderId: {
            defaultValue: !1,
            describe: "Add an id to table headers",
            type: "boolean"
        },
        ghCodeBlocks: {
            defaultValue: !0,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
        },
        tasklists: {
            defaultValue: !1,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
        },
        smoothLivePreview: {
            defaultValue: !1,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
        },
        smartIndentationFix: {
            defaultValue: !1,
            description: "Tries to smartly fix identation in es6 strings",
            type: "boolean"
        }
    };
    if (!1 === e) return JSON.parse(JSON.stringify(r));
    var t = {};
    for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n].defaultValue);
    return t;
}

var t = {}, n = {}, a = {}, s = r(!0), o = {
    github: {
        omitExtraWLInCodeBlocks: !0,
        prefixHeaderId: "user-content-",
        simplifiedAutoLink: !0,
        literalMidWordUnderscores: !0,
        strikethrough: !0,
        tables: !0,
        tablesHeaderId: !0,
        ghCodeBlocks: !0,
        tasklists: !0
    },
    vanilla: r(!0)
};

function i(r, n) {
    var a = n ? "Error in " + n + " extension->" : "Error in unnamed extension", s = {
        valid: !0,
        error: ""
    };
    t.helper.isArray(r) || (r = [ r ]);
    for (var o = 0; o < r.length; ++o) {
        var i = a + " sub-extension " + o + ": ", l = r[o];
        if ("object" !== (0, e.default)(l)) return s.valid = !1, s.error = i + "must be an object, but " + (0, 
        e.default)(l) + " given", s;
        if (!t.helper.isString(l.type)) return s.valid = !1, s.error = i + 'property "type" must be a string, but ' + (0, 
        e.default)(l.type) + " given", s;
        var c = l.type = l.type.toLowerCase();
        if ("language" === c && (c = l.type = "lang"), "html" === c && (c = l.type = "output"), 
        "lang" !== c && "output" !== c && "listener" !== c) return s.valid = !1, s.error = i + "type " + c + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
        s;
        if ("listener" === c) {
            if (t.helper.isUndefined(l.listeners)) return s.valid = !1, s.error = i + '. Extensions of type "listener" must have a property called "listeners"', 
            s;
        } else if (t.helper.isUndefined(l.filter) && t.helper.isUndefined(l.regex)) return s.valid = !1, 
        s.error = i + c + ' extensions must define either a "regex" property or a "filter" method', 
        s;
        if (l.listeners) {
            if ("object" !== (0, e.default)(l.listeners)) return s.valid = !1, s.error = i + '"listeners" property must be an object but ' + (0, 
            e.default)(l.listeners) + " given", s;
            for (var u in l.listeners) if (l.listeners.hasOwnProperty(u) && "function" != typeof l.listeners[u]) return s.valid = !1, 
            s.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + u + " must be a function but " + (0, 
            e.default)(l.listeners[u]) + " given", s;
        }
        if (l.filter) {
            if ("function" != typeof l.filter) return s.valid = !1, s.error = i + '"filter" must be a function, but ' + (0, 
            e.default)(l.filter) + " given", s;
        } else if (l.regex) {
            if (t.helper.isString(l.regex) && (l.regex = new RegExp(l.regex, "g")), !l.regex instanceof RegExp) return s.valid = !1, 
            s.error = i + '"regex" property must either be a string or a RegExp object, but ' + (0, 
            e.default)(l.regex) + " given", s;
            if (t.helper.isUndefined(l.replace)) return s.valid = !1, s.error = i + '"regex" extensions must implement a replace string or function', 
            s;
        }
    }
    return s;
}

function l(e, r) {
    return "~E" + r.charCodeAt(0) + "E";
}

t.helper = {}, t.extensions = {}, t.setOption = function(e, r) {
    return s[e] = r, this;
}, t.getOption = function(e) {
    return s[e];
}, t.getOptions = function() {
    return s;
}, t.resetOptions = function() {
    s = r(!0);
}, t.setFlavor = function(e) {
    if (o.hasOwnProperty(e)) {
        var r = o[e];
        for (var t in r) r.hasOwnProperty(t) && (s[t] = r[t]);
    }
}, t.getDefaultOptions = function(e) {
    return r(e);
}, t.subParser = function(e, r) {
    if (t.helper.isString(e)) {
        if (void 0 === r) {
            if (n.hasOwnProperty(e)) return n[e];
            throw Error("SubParser named " + e + " not registered!");
        }
        n[e] = r;
    }
}, t.extension = function(e, r) {
    if (!t.helper.isString(e)) throw Error("Extension 'name' must be a string");
    if (e = t.helper.stdExtName(e), t.helper.isUndefined(r)) {
        if (!a.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
        return a[e];
    }
    "function" == typeof r && (r = r()), t.helper.isArray(r) || (r = [ r ]);
    var n = i(r, e);
    if (!n.valid) throw Error(n.error);
    a[e] = r;
}, t.getAllExtensions = function() {
    return a;
}, t.removeExtension = function(e) {
    delete a[e];
}, t.resetExtensions = function() {
    a = {};
}, t.validateExtension = function(e) {
    var r = i(e, null);
    return !!r.valid || (console.warn(r.error), !1);
}, t.hasOwnProperty("helper") || (t.helper = {}), t.helper.isString = function(e) {
    return "string" == typeof e || e instanceof String;
}, t.helper.isFunction = function(e) {
    return e && "[object Function]" === {}.toString.call(e);
}, t.helper.forEach = function(e, r) {
    if ("function" == typeof e.forEach) e.forEach(r); else for (var t = 0; t < e.length; t++) r(e[t], t, e);
}, t.helper.isArray = function(e) {
    return e.constructor === Array;
}, t.helper.isUndefined = function(e) {
    return void 0 === e;
}, t.helper.stdExtName = function(e) {
    return e.replace(/[_-]||\s/g, "").toLowerCase();
}, t.helper.escapeCharactersCallback = l, t.helper.escapeCharacters = function(e, r, t) {
    var n = "([" + r.replace(/([\[\]\\])/g, "\\$1") + "])";
    t && (n = "\\\\" + n);
    var a = new RegExp(n, "g");
    return e.replace(a, l);
};

var c = function(e, r, t, n) {
    var a, s, o, i, l, c = n || "", u = -1 < c.indexOf("g"), p = new RegExp(r + "|" + t, "g" + c.replace(/g/g, "")), h = new RegExp(r, c.replace(/g/g, "")), d = [];
    do {
        for (a = 0; o = p.exec(e); ) if (h.test(o[0])) a++ || (i = (s = p.lastIndex) - o[0].length); else if (a && !--a) {
            l = o.index + o[0].length;
            var f = {
                left: {
                    start: i,
                    end: s
                },
                match: {
                    start: s,
                    end: o.index
                },
                right: {
                    start: o.index,
                    end: l
                },
                wholeMatch: {
                    start: i,
                    end: l
                }
            };
            if (d.push(f), !u) return d;
        }
    } while (a && (p.lastIndex = s));
    return d;
};

t.helper.matchRecursiveRegExp = function(e, r, t, n) {
    for (var a = c(e, r, t, n), s = [], o = 0; o < a.length; ++o) s.push([ e.slice(a[o].wholeMatch.start, a[o].wholeMatch.end), e.slice(a[o].match.start, a[o].match.end), e.slice(a[o].left.start, a[o].left.end), e.slice(a[o].right.start, a[o].right.end) ]);
    return s;
}, t.helper.replaceRecursiveRegExp = function(e, r, n, a, s) {
    if (!t.helper.isFunction(r)) {
        var o = r;
        r = function() {
            return o;
        };
    }
    var i = c(e, n, a, s), l = e, u = i.length;
    if (0 < u) {
        var p = [];
        0 !== i[0].wholeMatch.start && p.push(e.slice(0, i[0].wholeMatch.start));
        for (var h = 0; h < u; ++h) p.push(r(e.slice(i[h].wholeMatch.start, i[h].wholeMatch.end), e.slice(i[h].match.start, i[h].match.end), e.slice(i[h].left.start, i[h].left.end), e.slice(i[h].right.start, i[h].right.end))), 
        h < u - 1 && p.push(e.slice(i[h].wholeMatch.end, i[h + 1].wholeMatch.start));
        i[u - 1].wholeMatch.end < e.length && p.push(e.slice(i[u - 1].wholeMatch.end)), 
        l = p.join("");
    }
    return l;
}, t.helper.isUndefined(console) && (console = {
    warn: function(e) {
        alert(e);
    },
    log: function(e) {
        alert(e);
    },
    error: function(e) {
        throw e;
    }
}), t.Converter = function(l) {
    var c = {}, u = [], p = [], h = {};
    function d(e, r) {
        if (r = r || null, t.helper.isString(e)) {
            if (r = e = t.helper.stdExtName(e), t.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
            void function(e, r) {
                "function" == typeof e && (e = e(new t.Converter())), t.helper.isArray(e) || (e = [ e ]);
                var n = i(e, r);
                if (!n.valid) throw Error(n.error);
                for (var a = 0; a < e.length; ++a) switch (e[a].type) {
                  case "lang":
                    u.push(e[a]);
                    break;

                  case "output":
                    p.push(e[a]);
                    break;

                  default:
                    throw Error("Extension loader error: Type unrecognized!!!");
                }
            }(t.extensions[e], e);
            if (t.helper.isUndefined(a[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
            e = a[e];
        }
        "function" == typeof e && (e = e()), t.helper.isArray(e) || (e = [ e ]);
        var n = i(e, r);
        if (!n.valid) throw Error(n.error);
        for (var s = 0; s < e.length; ++s) {
            switch (e[s].type) {
              case "lang":
                u.push(e[s]);
                break;

              case "output":
                p.push(e[s]);
            }
            if (e[s].hasOwnProperty(h)) for (var o in e[s].listeners) e[s].listeners.hasOwnProperty(o) && f(o, e[s].listeners[o]);
        }
    }
    function f(r, n) {
        if (!t.helper.isString(r)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (0, 
        e.default)(r) + " given");
        if ("function" != typeof n) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (0, 
        e.default)(n) + " given");
        h.hasOwnProperty(r) || (h[r] = []), h[r].push(n);
    }
    !function() {
        for (var r in l = l || {}, s) s.hasOwnProperty(r) && (c[r] = s[r]);
        if ("object" !== (0, e.default)(l)) throw Error("Converter expects the passed parameter to be an object, but " + (0, 
        e.default)(l) + " was passed instead.");
        for (var n in l) l.hasOwnProperty(n) && (c[n] = l[n]);
        c.extensions && t.helper.forEach(c.extensions, d);
    }(), this._dispatch = function(e, r, t, n) {
        if (h.hasOwnProperty(e)) for (var a = 0; a < h[e].length; ++a) {
            var s = h[e][a](e, r, this, t, n);
            s && void 0 !== s && (r = s);
        }
        return r;
    }, this.listen = function(e, r) {
        return f(e, r), this;
    }, this.makeHtml = function(r) {
        if (!r) return r;
        var e, n, a, s = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions: u,
            outputModifiers: p,
            converter: this,
            ghCodeBlocks: []
        };
        return r = (r = (r = (r = r.replace(/~/g, "~T")).replace(/\$/g, "~D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n"), 
        c.smartIndentationFix && (n = (e = r).match(/^\s*/)[0].length, a = new RegExp("^\\s{0," + n + "}", "gm"), 
        r = e.replace(a, "")), r = r, r = t.subParser("detab")(r, c, s), r = t.subParser("stripBlankLines")(r, c, s), 
        t.helper.forEach(u, function(e) {
            r = t.subParser("runExtension")(e, r, c, s);
        }), r = t.subParser("hashPreCodeTags")(r, c, s), r = t.subParser("githubCodeBlocks")(r, c, s), 
        r = t.subParser("hashHTMLBlocks")(r, c, s), r = t.subParser("hashHTMLSpans")(r, c, s), 
        r = t.subParser("stripLinkDefinitions")(r, c, s), r = t.subParser("blockGamut")(r, c, s), 
        r = t.subParser("unhashHTMLSpans")(r, c, s), r = (r = (r = t.subParser("unescapeSpecialChars")(r, c, s)).replace(/~D/g, "$$")).replace(/~T/g, "~"), 
        t.helper.forEach(p, function(e) {
            r = t.subParser("runExtension")(e, r, c, s);
        }), r;
    }, this.setOption = function(e, r) {
        c[e] = r;
    }, this.getOption = function(e) {
        return c[e];
    }, this.getOptions = function() {
        return c;
    }, this.addExtension = function(e, r) {
        d(e, r = r || null);
    }, this.useExtension = function(e) {
        d(e);
    }, this.setFlavor = function(e) {
        if (o.hasOwnProperty(e)) {
            var r = o[e];
            for (var t in r) r.hasOwnProperty(t) && (c[t] = r[t]);
        }
    }, this.removeExtension = function(e) {
        t.helper.isArray(e) || (e = [ e ]);
        for (var r = 0; r < e.length; ++r) {
            for (var n = e[r], a = 0; a < u.length; ++a) u[a] === n && u[a].splice(a, 1);
            for (;0 < p.length; ++a) p[0] === n && p[0].splice(a, 1);
        }
    }, this.getAllExtensions = function() {
        return {
            language: u,
            output: p
        };
    };
}, t.subParser("anchors", function(e, r, f) {
    var n = function(e, r, n, a, s, o, i, l) {
        t.helper.isUndefined(l) && (l = ""), e = r;
        var c = n, u = a.toLowerCase(), p = s, h = l;
        if (!p) if (u || (u = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + u, t.helper.isUndefined(f.gUrls[u])) {
            if (!(-1 < e.search(/\(\s*\)$/m))) return e;
            p = "";
        } else p = f.gUrls[u], t.helper.isUndefined(f.gTitles[u]) || (h = f.gTitles[u]);
        var d = '<a href="' + (p = t.helper.escapeCharacters(p, "*_", !1)) + '"';
        return "" !== h && null !== h && (h = h.replace(/"/g, "&quot;"), d += ' title="' + (h = t.helper.escapeCharacters(h, "*_", !1)) + '"'), 
        d + ">" + c + "</a>";
    };
    return e = (e = (e = (e = f.converter._dispatch("anchors.before", e, r, f)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, n)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, n)).replace(/(\[([^\[\]]+)])()()()()()/g, n), 
    f.converter._dispatch("anchors.after", e, r, f);
}), t.subParser("autoLinks", function(e, r, n) {
    function a(e, r) {
        var t = r;
        return /^www\./i.test(r) && (r = r.replace(/^www\./i, "http://www.")), '<a href="' + r + '">' + t + "</a>";
    }
    function s(e, r) {
        var n = t.subParser("unescapeSpecialChars")(r);
        return t.subParser("encodeEmailAddress")(n);
    }
    return e = (e = (e = n.converter._dispatch("autoLinks.before", e, r, n)).replace(/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, a)).replace(/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, s), 
    r.simplifiedAutoLink && (e = (e = e.replace(/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, a)).replace(/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-\/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, s)), 
    n.converter._dispatch("autoLinks.after", e, r, n);
}), t.subParser("blockGamut", function(e, r, n) {
    e = n.converter._dispatch("blockGamut.before", e, r, n), e = t.subParser("blockQuotes")(e, r, n), 
    e = t.subParser("headers")(e, r, n);
    var a = t.subParser("hashBlock")("<hr />", r, n);
    return e = (e = (e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, a), 
    e = t.subParser("lists")(e, r, n), e = t.subParser("codeBlocks")(e, r, n), e = t.subParser("tables")(e, r, n), 
    e = t.subParser("hashHTMLBlocks")(e, r, n), e = t.subParser("paragraphs")(e, r, n), 
    n.converter._dispatch("blockGamut.after", e, r, n);
}), t.subParser("blockQuotes", function(e, a, s) {
    return e = (e = s.converter._dispatch("blockQuotes.before", e, a, s)).replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, r) {
        var n = r;
        return n = (n = (n = n.replace(/^[ \t]*>[ \t]?/gm, "~0")).replace(/~0/g, "")).replace(/^[ \t]+$/gm, ""), 
        n = t.subParser("githubCodeBlocks")(n, a, s), n = (n = (n = t.subParser("blockGamut")(n, a, s)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, r) {
            var t = r;
            return (t = t.replace(/^  /gm, "~0")).replace(/~0/g, "");
        }), t.subParser("hashBlock")("<blockquote>\n" + n + "\n</blockquote>", a, s);
    }), s.converter._dispatch("blockQuotes.after", e, a, s);
}), t.subParser("codeBlocks", function(e, i, l) {
    return e = l.converter._dispatch("codeBlocks.before", e, i, l), e = (e = (e += "~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, r, n) {
        var a = r, s = n, o = "\n";
        return a = t.subParser("outdent")(a), a = t.subParser("encodeCode")(a), a = (a = (a = t.subParser("detab")(a)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
        i.omitExtraWLInCodeBlocks && (o = ""), a = "<pre><code>" + a + o + "</code></pre>", 
        t.subParser("hashBlock")(a, i, l) + s;
    })).replace(/~0/, ""), l.converter._dispatch("codeBlocks.after", e, i, l);
}), t.subParser("codeSpans", function(e, r, n) {
    return void 0 === (e = n.converter._dispatch("codeSpans.before", e, r, n)) && (e = ""), 
    e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, r, n, a) {
        var s = a;
        return s = (s = s.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), r + "<code>" + (s = t.subParser("encodeCode")(s)) + "</code>";
    }), n.converter._dispatch("codeSpans.after", e, r, n);
}), t.subParser("detab", function(e) {
    return (e = (e = (e = (e = e.replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "~A~B")).replace(/~B(.+?)~A/g, function(e, r) {
        for (var t = r, n = 4 - t.length % 4, a = 0; a < n; a++) t += " ";
        return t;
    })).replace(/~A/g, "    ")).replace(/~B/g, "");
}), t.subParser("encodeAmpsAndAngles", function(e) {
    return (e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}), t.subParser("encodeBackslashEscapes", function(e) {
    return (e = e.replace(/\\(\\)/g, t.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+-.!])/g, t.helper.escapeCharactersCallback);
}), t.subParser("encodeCode", function(e) {
    return e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), 
    t.helper.escapeCharacters(e, "*_{}[]\\", !1);
}), t.subParser("encodeEmailAddress", function(e) {
    var t = [ function(e) {
        return "&#" + e.charCodeAt(0) + ";";
    }, function(e) {
        return "&#x" + e.charCodeAt(0).toString(16) + ";";
    }, function(e) {
        return e;
    } ];
    return (e = '<a href="' + (e = (e = "mailto:" + e).replace(/./g, function(e) {
        if ("@" === e) e = t[Math.floor(2 * Math.random())](e); else if (":" !== e) {
            var r = Math.random();
            e = .9 < r ? t[2](e) : .45 < r ? t[1](e) : t[0](e);
        }
        return e;
    })) + '">' + e + "</a>").replace(/">.+:/g, '">');
}), t.subParser("escapeSpecialCharsWithinTagAttributes", function(e) {
    return e.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi, function(e) {
        var r = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
        return t.helper.escapeCharacters(r, "\\`*_", !1);
    });
}), t.subParser("githubCodeBlocks", function(e, s, o) {
    return s.ghCodeBlocks ? (e = o.converter._dispatch("githubCodeBlocks.before", e, s, o), 
    e = (e = (e += "~0").replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, r, n) {
        var a = s.omitExtraWLInCodeBlocks ? "" : "\n";
        return n = t.subParser("encodeCode")(n), n = "<pre><code" + (r ? ' class="' + r + " language-" + r + '"' : "") + ">" + (n = (n = (n = t.subParser("detab")(n)).replace(/^\n+/g, "")).replace(/\n+$/g, "")) + a + "</code></pre>", 
        n = t.subParser("hashBlock")(n, s, o), "\n\n~G" + (o.ghCodeBlocks.push({
            text: e,
            codeblock: n
        }) - 1) + "G\n\n";
    })).replace(/~0/, ""), o.converter._dispatch("githubCodeBlocks.after", e, s, o)) : e;
}), t.subParser("hashBlock", function(e, r, t) {
    return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (t.gHtmlBlocks.push(e) - 1) + "K\n\n";
}), t.subParser("hashElement", function(e, r, n) {
    return function(e, r) {
        var t = r;
        return t = (t = (t = t.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), 
        "\n\n~K" + (n.gHtmlBlocks.push(t) - 1) + "K\n\n";
    };
}), t.subParser("hashHTMLBlocks", function(e, r, s) {
    for (var n = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], a = function(e, r, t, n) {
        var a = e;
        return -1 !== t.search(/\bmarkdown\b/) && (a = t + s.converter.makeHtml(r) + n), 
        "\n\n~K" + (s.gHtmlBlocks.push(a) - 1) + "K\n\n";
    }, o = 0; o < n.length; ++o) e = t.helper.replaceRecursiveRegExp(e, a, "^(?: |\\t){0,3}<" + n[o] + "\\b[^>]*>", "</" + n[o] + ">", "gim");
    return (e = (e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, t.subParser("hashElement")(e, r, s))).replace(/(<!--[\s\S]*?-->)/g, t.subParser("hashElement")(e, r, s))).replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, t.subParser("hashElement")(e, r, s));
}), t.subParser("hashHTMLSpans", function(e, r, n) {
    for (var a = t.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), s = 0; s < a.length; ++s) e = e.replace(a[s][0], "~L" + (n.gHtmlSpans.push(a[s][0]) - 1) + "L");
    return e;
}), t.subParser("unhashHTMLSpans", function(e, r, t) {
    for (var n = 0; n < t.gHtmlSpans.length; ++n) e = e.replace("~L" + n + "L", t.gHtmlSpans[n]);
    return e;
}), t.subParser("hashPreCodeTags", function(e, r, o) {
    return t.helper.replaceRecursiveRegExp(e, function(e, r, n, a) {
        var s = n + t.subParser("encodeCode")(r) + a;
        return "\n\n~G" + (o.ghCodeBlocks.push({
            text: e,
            codeblock: s
        }) - 1) + "G\n\n";
    }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
}), t.subParser("headers", function(e, l, c) {
    e = c.converter._dispatch("headers.before", e, l, c);
    var a = l.prefixHeaderId, u = isNaN(parseInt(l.headerLevelStart)) ? 1 : parseInt(l.headerLevelStart), r = l.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, n = l.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    function p(e) {
        var r, n = e.replace(/[^\w]/g, "").toLowerCase();
        return c.hashLinkCounts[n] ? r = n + "-" + c.hashLinkCounts[n]++ : (r = n, c.hashLinkCounts[n] = 1), 
        !0 === a && (a = "section"), t.helper.isString(a) ? a + r : r;
    }
    return e = (e = (e = e.replace(r, function(e, r) {
        var n = t.subParser("spanGamut")(r, l, c), a = l.noHeaderId ? "" : ' id="' + p(r) + '"', s = "<h" + u + a + ">" + n + "</h" + u + ">";
        return t.subParser("hashBlock")(s, l, c);
    })).replace(n, function(e, r) {
        var n = t.subParser("spanGamut")(r, l, c), a = l.noHeaderId ? "" : ' id="' + p(r) + '"', s = u + 1, o = "<h" + s + a + ">" + n + "</h" + s + ">";
        return t.subParser("hashBlock")(o, l, c);
    })).replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(e, r, n) {
        var a = t.subParser("spanGamut")(n, l, c), s = l.noHeaderId ? "" : ' id="' + p(n) + '"', o = u - 1 + r.length, i = "<h" + o + s + ">" + a + "</h" + o + ">";
        return t.subParser("hashBlock")(i, l, c);
    }), c.converter._dispatch("headers.after", e, l, c);
}), t.subParser("images", function(e, r, d) {
    function n(e, r, n, a, s, o, i, l) {
        var c = d.gUrls, u = d.gTitles, p = d.gDimensions;
        if (n = n.toLowerCase(), l || (l = ""), "" === a || null === a) {
            if ("" !== n && null !== n || (n = r.toLowerCase().replace(/ ?\n/g, " ")), a = "#" + n, 
            t.helper.isUndefined(c[n])) return e;
            a = c[n], t.helper.isUndefined(u[n]) || (l = u[n]), t.helper.isUndefined(p[n]) || (s = p[n].width, 
            o = p[n].height);
        }
        r = r.replace(/"/g, "&quot;"), r = t.helper.escapeCharacters(r, "*_", !1);
        var h = '<img src="' + (a = t.helper.escapeCharacters(a, "*_", !1)) + '" alt="' + r + '"';
        return l && (l = l.replace(/"/g, "&quot;"), h += ' title="' + (l = t.helper.escapeCharacters(l, "*_", !1)) + '"'), 
        s && o && (h += ' width="' + (s = "*" === s ? "auto" : s) + '"', h += ' height="' + (o = "*" === o ? "auto" : o) + '"'), 
        h + " />";
    }
    return e = (e = (e = d.converter._dispatch("images.before", e, r, d)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g, n)).replace(/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, n), 
    d.converter._dispatch("images.after", e, r, d);
}), t.subParser("italicsAndBold", function(e, r, t) {
    return e = t.converter._dispatch("italicsAndBold.before", e, r, t), e = r.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"), 
    t.converter._dispatch("italicsAndBold.after", e, r, t);
}), t.subParser("lists", function(e, p, h) {
    function i(e, r) {
        h.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
        var u = /\n[ \t]*\n(?!~0)/.test(e += "~0");
        return e = (e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(e, r, n, a, s, o, i) {
            i = i && "" !== i.trim();
            var l = t.subParser("outdent")(s, p, h), c = "";
            return o && p.tasklists && (c = ' class="task-list-item" style="list-style-type: none;"', 
            l = l.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return i && (e += " checked"), e + ">";
            })), "\n<li" + c + ">" + (l = r || -1 < l.search(/\n{2,}/) ? (l = t.subParser("githubCodeBlocks")(l, p, h), 
            t.subParser("blockGamut")(l, p, h)) : (l = (l = t.subParser("lists")(l, p, h)).replace(/\n$/, ""), 
            u ? t.subParser("paragraphs")(l, p, h) : t.subParser("spanGamut")(l, p, h))) + "</li>\n";
        })).replace(/~0/g, ""), h.gListLevel--, r && (e = e.replace(/\s+$/, "")), e;
    }
    function a(e, n, a) {
        var s = "ul" === n ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, r = [], o = "";
        if (-1 !== e.search(s)) {
            !function e(r) {
                var t = r.search(s);
                -1 !== t ? (o += "\n\n<" + n + ">" + i(r.slice(0, t), !!a) + "</" + n + ">\n\n", 
                s = "ul" == (n = "ul" === n ? "ol" : "ul") ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                e(r.slice(t))) : o += "\n\n<" + n + ">" + i(r, !!a) + "</" + n + ">\n\n";
            }(e);
            for (var t = 0; t < r.length; ++t) ;
        } else o = "\n\n<" + n + ">" + i(e, !!a) + "</" + n + ">\n\n";
        return o;
    }
    e = h.converter._dispatch("lists.before", e, p, h), e += "~0";
    var r = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    return e = (e = h.gListLevel ? e.replace(r, function(e, r, t) {
        return a(r, -1 < t.search(/[*+-]/g) ? "ul" : "ol", !0);
    }) : (r = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
    e.replace(r, function(e, r, t, n) {
        return a(t, -1 < n.search(/[*+-]/g) ? "ul" : "ol");
    }))).replace(/~0/, ""), h.converter._dispatch("lists.after", e, p, h);
}), t.subParser("outdent", function(e) {
    return (e = e.replace(/^(\t|[ ]{1,4})/gm, "~0")).replace(/~0/g, "");
}), t.subParser("paragraphs", function(e, r, n) {
    for (var a = (e = (e = (e = n.converter._dispatch("paragraphs.before", e, r, n)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), s = [], o = a.length, i = 0; i < o; i++) {
        var l = a[i];
        0 <= l.search(/~(K|G)(\d+)\1/g) || (l = (l = t.subParser("spanGamut")(l, r, n)).replace(/^([ \t]*)/g, "<p>"), 
        l += "</p>"), s.push(l);
    }
    for (o = s.length, i = 0; i < o; i++) {
        for (var c = "", u = s[i], p = !1; 0 <= u.search(/~(K|G)(\d+)\1/); ) {
            var h = RegExp.$1, d = RegExp.$2;
            c = (c = "K" === h ? n.gHtmlBlocks[d] : p ? t.subParser("encodeCode")(n.ghCodeBlocks[d].text) : n.ghCodeBlocks[d].codeblock).replace(/\$/g, "$$$$"), 
            u = u.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, c), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) && (p = !0);
        }
        s[i] = u;
    }
    return e = (e = (e = s.join("\n\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
    n.converter._dispatch("paragraphs.after", e, r, n);
}), t.subParser("runExtension", function(e, r, t, n) {
    if (e.filter) r = e.filter(r, n.converter, t); else if (e.regex) {
        var a = e.regex;
        !a instanceof RegExp && (a = new RegExp(a, "g")), r = r.replace(a, e.replace);
    }
    return r;
}), t.subParser("spanGamut", function(e, r, n) {
    return e = n.converter._dispatch("spanGamut.before", e, r, n), e = t.subParser("codeSpans")(e, r, n), 
    e = t.subParser("escapeSpecialCharsWithinTagAttributes")(e, r, n), e = t.subParser("encodeBackslashEscapes")(e, r, n), 
    e = t.subParser("images")(e, r, n), e = t.subParser("anchors")(e, r, n), e = t.subParser("autoLinks")(e, r, n), 
    e = t.subParser("encodeAmpsAndAngles")(e, r, n), e = t.subParser("italicsAndBold")(e, r, n), 
    e = (e = t.subParser("strikethrough")(e, r, n)).replace(/  +\n/g, " <br />\n"), 
    n.converter._dispatch("spanGamut.after", e, r, n);
}), t.subParser("strikethrough", function(e, r, t) {
    return r.strikethrough && (e = (e = t.converter._dispatch("strikethrough.before", e, r, t)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), 
    e = t.converter._dispatch("strikethrough.after", e, r, t)), e;
}), t.subParser("stripBlankLines", function(e) {
    return e.replace(/^[ \t]+$/gm, "");
}), t.subParser("stripLinkDefinitions", function(e, l, c) {
    return (e = (e += "~0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm, function(e, r, n, a, s, o, i) {
        return r = r.toLowerCase(), c.gUrls[r] = t.subParser("encodeAmpsAndAngles")(n), 
        o ? o + i : (i && (c.gTitles[r] = i.replace(/"|'/g, "&quot;")), l.parseImgDimensions && a && s && (c.gDimensions[r] = {
            width: a,
            height: s
        }), "");
    })).replace(/~0/, "");
}), t.subParser("tables", function(e, v, m) {
    if (!v.tables) return e;
    return e = (e = m.converter._dispatch("tables.before", e, v, m)).replace(/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm, function(e) {
        var r, n = e.split("\n");
        for (r = 0; r < n.length; ++r) /^[ \t]{0,3}\|/.test(n[r]) && (n[r] = n[r].replace(/^[ \t]{0,3}\|/, "")), 
        /\|[ \t]*$/.test(n[r]) && (n[r] = n[r].replace(/\|[ \t]*$/, ""));
        var a, s, o, i, l, c = n[0].split("|").map(function(e) {
            return e.trim();
        }), u = n[1].split("|").map(function(e) {
            return e.trim();
        }), p = [], h = [], d = [], f = [];
        for (n.shift(), n.shift(), r = 0; r < n.length; ++r) "" !== n[r].trim() && p.push(n[r].split("|").map(function(e) {
            return e.trim();
        }));
        if (c.length < u.length) return e;
        for (r = 0; r < u.length; ++r) d.push((a = u[r], /^:[ \t]*--*$/.test(a) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(a) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(a) ? ' style="text-align:center;"' : ""));
        for (r = 0; r < c.length; ++r) t.helper.isUndefined(d[r]) && (d[r] = ""), h.push((s = c[r], 
        o = d[r], i = void 0, i = "", s = s.trim(), v.tableHeaderId && (i = ' id="' + s.replace(/ /g, "_").toLowerCase() + '"'), 
        "<th" + i + o + ">" + (s = t.subParser("spanGamut")(s, v, m)) + "</th>\n"));
        for (r = 0; r < p.length; ++r) {
            for (var g = [], b = 0; b < h.length; ++b) t.helper.isUndefined(p[r][b]), g.push((l = p[r][b], 
            "<td" + d[b] + ">" + t.subParser("spanGamut")(l, v, m) + "</td>\n"));
            f.push(g);
        }
        return function(e, r) {
            for (var t = "<table>\n<thead>\n<tr>\n", n = e.length, a = 0; a < n; ++a) t += e[a];
            for (t += "</tr>\n</thead>\n<tbody>\n", a = 0; a < r.length; ++a) {
                t += "<tr>\n";
                for (var s = 0; s < n; ++s) t += r[a][s];
                t += "</tr>\n";
            }
            return t + "</tbody>\n</table>\n";
        }(h, f);
    }), m.converter._dispatch("tables.after", e, v, m);
}), t.subParser("unescapeSpecialChars", function(e) {
    return e.replace(/~E(\d+)E/g, function(e, r) {
        var t = parseInt(r);
        return String.fromCharCode(t);
    });
}), module.exports = t;