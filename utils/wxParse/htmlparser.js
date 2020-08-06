var e = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, t = /^<\/([-A-Za-z0-9_]+)[^>]*>/, r = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, s = c("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), a = c("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), n = c("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), i = c("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), o = c("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), l = c("wxxxcode-style,script,style,view,scroll-view,block");

function c(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

module.exports = function(c, f) {
    var d, p, u, h = [], b = c;
    for (h.last = function() {
        return this[this.length - 1];
    }; c; ) {
        if (p = !0, h.last() && l[h.last()]) c = c.replace(new RegExp("([\\s\\S]*?)</" + h.last() + "[^>]*>"), function(e, t) {
            return t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), f.chars && f.chars(t), 
            "";
        }), v(0, h.last()); else if (0 == c.indexOf("\x3c!--") ? 0 <= (d = c.indexOf("--\x3e")) && (f.comment && f.comment(c.substring(4, d)), 
        c = c.substring(d + 3), p = !1) : 0 == c.indexOf("</") ? (u = c.match(t)) && (c = c.substring(u[0].length), 
        u[0].replace(t, v), p = !1) : 0 == c.indexOf("<") && (u = c.match(e)) && (c = c.substring(u[0].length), 
        u[0].replace(e, g), p = !1), p) {
            d = c.indexOf("<");
            for (var m = ""; 0 === d; ) m += "<", d = (c = c.substring(1)).indexOf("<");
            m += d < 0 ? c : c.substring(0, d), c = d < 0 ? "" : c.substring(d), f.chars && f.chars(m);
        }
        if (c == b) throw "Parse Error: " + c;
        b = c;
    }
    function g(e, t, c, l) {
        if (t = t.toLowerCase(), a[t]) for (;h.last() && n[h.last()]; ) v(0, h.last());
        if (i[t] && h.last() == t && v(0, t), (l = s[t] || !!l) || h.push(t), f.start) {
            var d = [];
            c.replace(r, function(e, t) {
                var r = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : o[t] ? t : "";
                d.push({
                    name: t,
                    value: r,
                    escaped: r.replace(/(^|[^\\])"/g, '$1\\"')
                });
            }), f.start && f.start(t, d, l);
        }
    }
    function v(e, t) {
        if (t) for (t = t.toLowerCase(), r = h.length - 1; 0 <= r && h[r] != t; r--) ; else var r = 0;
        if (0 <= r) {
            for (var s = h.length - 1; r <= s; s--) f.end && f.end(h[s]);
            h.length = r;
        }
    }
    v();
};