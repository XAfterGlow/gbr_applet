var t = getApp(), o = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), e = t.requirejs("wxParse/wxParse");

t.requirejs("jquery"), Page({
    data: {
        limits: !0,
        tabinfo: "active",
        tabreplay: "",
        tablog: "",
        hasoption: !1,
        options: [],
        goodsoptions: [],
        optionid: 0,
        specs: [],
        goods: [],
        log: [],
        logmore: !1,
        logpage: 1,
        replays: [],
        replaysmore: !1,
        replaypage: 1,
        stores: [],
        goodsrec: [],
        goodspicker: !1,
        selectspecs: [],
        optionselect: "请选择规格",
        optionbtn: "确认",
        timer: [],
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        windowWidth: 0,
        windowHeight: 0,
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3
    },
    onLoad: function(t) {
        var o = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                o.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), o.setData({
            options: t
        });
    },
    onTab: function(t) {
        var o = t.currentTarget.dataset.tab;
        "tabreplay" == o ? this.setData({
            tabinfo: "",
            tabreplay: "active",
            tablog: ""
        }) : "tablog" == o ? this.setData({
            tabinfo: "",
            tabreplay: "",
            tablog: "active"
        }) : this.setData({
            tabinfo: "active",
            tabreplay: "",
            tablog: ""
        });
    },
    getlog: function() {
        var a = this;
        a.setData({
            logpage: a.data.logpage + 1
        }), o.get("creditshop/detail/getlistlog", {
            id: a.options.id,
            page: a.data.logpage
        }, function(t) {
            t.list = a.data.log.concat(t.list), a.setData({
                log: t.list,
                logmore: t.more
            });
        });
    },
    getreply: function() {
        var a = this;
        a.setData({
            replaypage: a.data.replaypage + 1
        }), o.get("creditshop/detail/getlistreply", {
            id: a.options.id,
            page: a.data.replaypage
        }, function(t) {
            t.list = a.data.replays.concat(t.list), a.setData({
                replays: t.list,
                replaysmore: t.more
            });
        });
    },
    getDetail: function() {
        var s = this, t = s.data.options;
        o.get("creditshop/detail", {
            id: t.id
        }, function(t) {
            if (0 < t.error) return a.toast(s, t.message), void setTimeout(function() {
                wx.navigateBack();
            }, 1e3);
            if (e.wxParse("wxParseData", "html", t.goods.goodsdetail, s, "0"), e.wxParse("wxParseData_subdetail", "html", t.goods.subdetail, s, "0"), 
            e.wxParse("wxParseData_noticedetail", "html", t.goods.noticedetail, s, "0"), e.wxParse("wxParseData_usedetail", "html", t.goods.usedetail, s, "0"), 
            s.setData({
                goods: t.goods,
                log: t.log,
                logmore: t.logmore,
                replays: t.replys,
                replaysmore: t.replymore,
                stores: t.stores,
                goodsrec: t.goodsrec,
                hasoption: t.goods.hasoption,
                sysset: t.sysset
            }), 0 < t.goods.istime && 0 < t.goods.timestart && 0 < t.goods.timeend) {
                clearInterval(s.data.timer);
                var o = setInterval(function() {
                    s.countDown(t.goods.timestart, t.goods.timeend);
                }, 1e3);
                s.setData({
                    timer: o
                });
            }
        });
    },
    countDown: function(t, o) {
        var a = parseInt(Date.now() / 1e3), e = parseInt((a < t ? t : o) - a), s = Math.floor(e / 86400), i = Math.floor((e - 24 * s * 60 * 60) / 3600), n = Math.floor((e - 24 * s * 60 * 60 - 3600 * i) / 60), r = {
            day: s,
            hour: i,
            minute: n,
            second: Math.floor(e - 24 * s * 60 * 60 - 3600 * i - 60 * n)
        };
        this.setData({
            timer: r
        });
    },
    optionclick: function() {
        var e = this, t = e.data.goods.id, s = e.data.goods.hasoption, i = e.data.specs;
        e.data.goods.canbuy ? s ? 0 == i.length ? o.get("creditshop/detail/option", {
            id: t
        }, function(t) {
            e.setData({
                goodspicker: !0,
                goodsoptions: t.options,
                optiongoods: t.goods,
                specs: t.specs
            });
        }) : e.setData({
            goodspicker: !0
        }) : e.setData({
            hasoption: !1
        }) : a.toast(e, e.data.goods.buymsg);
    },
    sortNumber: function(t, o) {
        return t - o;
    },
    specselect: function(t) {
        var o = this, e = o.data.selectspecs, s = t.target.dataset.idx, i = t.target.dataset.specid;
        e[s] = {
            id: i,
            title: t.target.dataset.title
        }, o.setData({
            selectspecs: e
        });
        var n = o.data.specs, r = n[s].items;
        r.forEach(function(t) {
            i == t.id ? t.class = "btn-danger" : t.class = "";
        }), n[s].items = r, o.setData({
            specs: n
        });
        var d, g = [];
        e.forEach(function(t) {
            t.title, g.push(t.id);
        });
        var c = g.sort(this.sortNumber);
        d = c.join("_");
        var p = o.data.goodsoptions;
        "" != t.target.dataset.thumb && o.setData({
            "optiongoods.thumb": t.target.dataset.thumb
        }), p.forEach(function(t) {
            t.specs.split("_").sort().join("_") == d && (o.setData({
                optionid: t.id,
                "optiongoods.total": t.total,
                "goods.credit": t.credit,
                "goods.money": t.money,
                "optiongoods.credit": t.credit,
                "optiongoods.money": t.money,
                optionselect: "已选 " + t.title
            }), t.total < o.data.total ? (o.setData({
                "goods.canbuy": !1,
                "goods.buymsg": "库存不足",
                optionbtn: "库存不足"
            }), a.toast(o, "库存不足")) : o.setData({
                "goods.canbuy": !0,
                "goods.buymsg": "库存不足",
                optionbtn: "确认"
            }));
        });
    },
    closepicker: function() {
        this.setData({
            goodspicker: !1
        });
    },
    openActionSheet: function() {
        var t = this.data.goods.canbuy, o = this.data.goods.hasoption, a = this.data.optionid;
        t && (0 < o ? 0 < a ? wx.redirectTo({
            url: "/pages/creditshop/create/index?id=" + this.data.goods.id + "&optionid=" + a
        }) : this.optionclick() : wx.redirectTo({
            url: "/pages/creditshop/create/index?id=" + this.data.goods.id
        }));
    },
    onShow: function() {
        var a = this;
        t.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), a.getDetail(), wx.getSetting({
            success: function(t) {
                var o = t.authSetting["scope.userInfo"];
                a.setData({
                    limits: o
                });
            }
        });
    }
});