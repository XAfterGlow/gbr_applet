var e = getApp(), a = e.requirejs("jquery"), t = e.requirejs("core");

e.requirejs("foxui"), module.exports = {
    get: function(d, e, i) {
        t.get("diypage", {
            type: e
        }, function(r) {
            for (var e in r.diypage = r.diypage || {}, r.diypage.items) "topmenu" == r.diypage.items[e].id && d.setData({
                topmenu: r.diypage.items[e]
            });
            var o = {};
            r.customer && (o.customer = r.customer), r.phone && (o.phone = r.phone), r.phonecolor && (o.phonecolor = r.phonecolor), 
            r.phonenumber && (o.phonenumber = r.phonenumber), r.customercolor && (o.customercolor = r.customercolor), 
            o && d.setData(o);
            var p = {
                loading: !1,
                pages: r.diypage.page,
                usediypage: !0,
                startadv: r.startadv
            };
            if (r.diypage.page && d.setData({
                diytitle: r.diypage.page.title
            }), 0 == r.error) {
                if (null != r.diypage.items) {
                    var s = [];
                    if (a.each(r.diypage.items, function(e, a) {
                        if (s.push(a.id), "topmenu" == a.id) {
                            if (2 == a.style.showtype) {
                                var o = 78 * Math.ceil(a.data.length / 4);
                                d.setData({
                                    topmenuheight: o
                                });
                            } else o = 78, d.setData({
                                topmenuheight: o
                            });
                            if (d.setData({
                                topmenu: a,
                                istopmenu: !0
                            }), null == a.data[0]) var i = ""; else i = a.data[0].linkurl, t.get("diypage/getInfo", {
                                dataurl: i
                            }, function(e) {
                                a.data[0].data = e.goods.list, p.diypages = r.diypage, p.topmenuDataType = e.type, 
                                d.setData(p);
                            });
                        } else "tabbar" == a.id && (null == a.data[0] ? i = "" : (i = a.data[0].linkurl, 
                        t.get("diypage/getInfo", {
                            dataurl: i
                        }, function(e) {
                            a.data[0].data = e.goods.list, a.type = e.type, void 0 !== a.data[0].data ? a.data[0].data.length == e.goods.count && (a.data[0].showmore = !0) : a.data[0].showmore = !1, 
                            p.diypages = r.diypage, p.tabbarDataType = e.type, p.tabbarData = e.goods, d.setData(p);
                        })));
                    }), wx.setNavigationBarTitle({
                        title: p.pages.title
                    }), wx.setNavigationBarColor({
                        frontColor: p.pages.titlebarcolor,
                        backgroundColor: p.pages.titlebarbg
                    }), i && i(r), -1 != s.indexOf("topmenu") || -1 != s.indexOf("tabbar")) return;
                    p.diypages = r.diypage, d.setData(p);
                }
                wx.setNavigationBarTitle({
                    title: p.pages.title
                }), wx.setNavigationBarColor({
                    frontColor: p.pages.titlebarcolor,
                    backgroundColor: p.pages.titlebarbg
                }), i && i(r);
            } else d.setData({
                diypages: !1,
                loading: !1
            });
        });
    }
};