var e = "https", t = "", r = "", a = {}, s = require("./wxDiscode.js"), n = require("./htmlparser.js"), o = (d("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
d("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), i = d("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = d("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

function d(e) {
    for (var t = {}, r = e.split(","), a = 0; a < r.length; a++) t[r[a]] = !0;
    return t;
}

function c(e) {
    var s = [];
    if (0 == t.length || !a) return (d = {
        node: "text"
    }).text = e, [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var n = new RegExp("[:]"), o = e.split(n), i = 0; i < o.length; i++) {
        var l = o[i], d = {};
        a[l] ? (d.node = "element", d.tag = "emoji", d.text = a[l], d.baseSrc = r) : (d.node = "text", 
        d.text = l), s.push(d);
    }
    return s;
}

d("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
d("wxxxcode-style,script,style,view,scroll-view,block"), module.exports = {
    html2json: function(t, h) {
        var r;
        t = (r = t, t = r.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "")).replace(/\r?\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<"), 
        t = s.strDiscode(t);
        var f = [], v = {
            node: h,
            nodes: [],
            images: [],
            imageUrls: []
        }, x = 0;
        return n(t, {
            start: function(t, r, a) {
                var n, d = {
                    node: "element",
                    tag: t
                };
                if (0 === f.length ? (d.index = x.toString(), x += 1) : (void 0 === (n = f[0]).nodes && (n.nodes = []), 
                d.index = n.index + "." + n.nodes.length), o[t] ? d.tagType = "block" : i[t] ? d.tagType = "inline" : l[t] && (d.tagType = "closeSelf"), 
                0 !== r.length && (d.attr = r.reduce(function(e, t) {
                    var r = t.name, a = t.value;
                    return "class" == r && (d.classStr = a), "style" == r && (d.styleStr = a), a.match(/ /) && (a = a.split(" ")), 
                    e[r] ? Array.isArray(e[r]) ? e[r].push(a) : e[r] = [ e[r], a ] : e[r] = a, e;
                }, {})), "img" === d.tag) {
                    d.imgIndex = v.images.length, d.attr = d.attr || {};
                    var c = d.attr.src || [];
                    "" == c[0] && c.splice(0, 1), c = s.urlToHttpUrl(c, e), d.attr.src = c, d.from = h, 
                    v.images.push(d), v.imageUrls.push(c);
                }
                if ("font" === d.tag) {
                    var p = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], u = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var g in d.attr.style || (d.attr.style = []), d.styleStr || (d.styleStr = ""), 
                    u) if (d.attr[g]) {
                        var m = "size" === g ? p[d.attr[g] - 1] : d.attr[g];
                        d.attr.style.push(u[g]), d.attr.style.push(m), d.styleStr += u[g] + ": " + m + ";";
                    }
                }
                "source" === d.tag && (v.source = d.attr.src), a ? (void 0 === (n = f[0] || v).nodes && (n.nodes = []), 
                n.nodes.push(d)) : f.unshift(d);
            },
            end: function(e) {
                var t = f.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && v.source && (t.attr.src = v.source, 
                delete v.source), 0 === f.length) v.nodes.push(t); else {
                    var r = f[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: c(e)
                };
                if (0 === f.length) t.index = x.toString(), x += 1, v.nodes.push(t); else {
                    var r = f[0];
                    void 0 === r.nodes && (r.nodes = []), t.index = r.index + "." + r.nodes.length, 
                    r.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), v;
    },
    emojisInit: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", s = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", n = 2 < arguments.length ? arguments[2] : void 0;
        t = e, r = s, a = n;
    }
};