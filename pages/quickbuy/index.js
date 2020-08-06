var t, a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), e = getApp(), r = e.requirejs("core"), i = e.requirejs("biz/goodspicker"), s = e.requirejs("foxui"), n = e.requirejs("biz/diyform");

Page({
    data: (t = {
        arrLabel: [],
        num: [],
        clickCar: !1
    }, (0, a.default)(t, "num", 0), (0, a.default)(t, "change", !1), (0, a.default)(t, "div", !1), 
    (0, a.default)(t, "numtotal", {}), (0, a.default)(t, "clearcart", !0), (0, a.default)(t, "canBuy", ""), 
    (0, a.default)(t, "specs", []), (0, a.default)(t, "options", []), (0, a.default)(t, "diyform", {}), 
    (0, a.default)(t, "specsTitle", ""), (0, a.default)(t, "total", 1), (0, a.default)(t, "active", ""), 
    (0, a.default)(t, "slider", ""), (0, a.default)(t, "tempname", ""), (0, a.default)(t, "buyType", ""), 
    (0, a.default)(t, "areas", []), (0, a.default)(t, "closeBtn", !1), (0, a.default)(t, "soundpic", !0), 
    (0, a.default)(t, "closespecs", !1), (0, a.default)(t, "buyType", "cart"), (0, a.default)(t, "quickbuy", !0), 
    (0, a.default)(t, "formdataval", {}), (0, a.default)(t, "showPicker", !1), t),
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中..."
        });
        var a = t.id;
        if (null == a) {
            var i = getCurrentPages(), s = i[i.length - 1].route.split("/");
            a = s[s.length - 1];
        }
        var o = this, n = wx.getStorageSync("systemInfo");
        this.busPos = {}, this.busPos.x = 45, this.busPos.y = e.globalData.hh - 80, this.setData({
            goodsH: n.windowHeight - 245 - 48,
            pageid: a
        });
        for (var d = [ 1 ], c = 1; c < o.data.arrLabel.length; c++) d.push(0);
        o.setData({
            arrLab: d
        }), r.get("quick/index/main", {
            id: this.data.pageid
        }, function(t) {
            var a = [], e = "";
            e = 1 == t.style.shopstyle ? "changeCss2" : 2 == t.style.shopstyle ? "changeCss3" : "", 
            e += " " + t.style.logostyle, o.setData({
                main: t,
                group: t.group,
                goodsArr: t.goodsArr,
                arrCart: a,
                style: e
            });
            var i = 1 == o.data.main.cartdata && o.data.pageid;
            if (o.data.main.advs) {
                if (0 < o.data.main.advs.length) {
                    a = [ 198 ];
                    var s = 198;
                }
            } else a = [ 18 ], s = 18;
            for (var n = 0; n < o.data.main.group.length; n++) o.data.main.goodsArr[o.data.main.group[n].type] && (s = s + 106 * (o.data.main.goodsArr[o.data.main.group[n].type].length ? o.data.main.goodsArr[o.data.main.group[n].type].length : .6) + 66, 
            a.push(s), o.setData({
                arrscroll: a
            }));
            i = 1 == o.data.main.cartdata ? o.data.pageid : "", r.get("quick/index/getCart", {
                quickid: i
            }, function(t) {
                var a = {};
                for (var e in t.simple_list) a[e] = t.simple_list[e];
                o.setData({
                    numtotal: a
                });
            }), wx.hideLoading(), wx.setNavigationBarTitle({
                title: t.pagetitle
            });
        });
    },
    menunavigage: function(t) {
        var a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: a,
            fail: function() {
                wx.switchTab({
                    url: a
                });
            }
        });
    },
    gobigimg: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.link
        });
    },
    clickLab: function(t) {
        for (var a = t.currentTarget.dataset.id, e = this.data.arrLab, r = 0; r < e.length; r++) e[r] = 0;
        e[a] = 1, this.setData({
            arrLab: e,
            id: t.currentTarget.dataset.id
        });
    },
    shopCarList: function() {
        var i = this;
        this.setData({
            clickCar: !0,
            cartcartArr: [],
            showPicker: !0
        });
        var t = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/getCart", {
            quickid: t
        }, function(t) {
            var a = i.data.main;
            a.cartList = t, i.setData({
                main: a
            });
            for (var e = [], r = 0; r < t.list.length; r++) e[r] = t.list[r].goodsid;
            i.setData({
                tempcartid: e
            });
        });
    },
    shopCarHid: function() {
        this.setData({
            clickCar: !1,
            showPicker: !1
        });
    },
    selectPicker: function(a) {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? (i.selectpicker(a, e, "goodslist"), e.setData({
                    cover: "",
                    showvideo: !1
                })) : e.setData({
                    modelShow: !0
                });
            }
        });
    },
    specsTap: function(t) {
        i.specsTap(t, this);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: "",
            showPicker: !1
        });
    },
    buyNow: function(t) {
        i.buyNow(t, this);
    },
    getCart: function(t) {
        i.getCart(t, this);
    },
    select: function() {
        i.select(this);
    },
    inputNumber: function(t) {
        i.inputNumber(t, this);
    },
    number: function(t) {
        i.number(t, this);
    },
    onChange: function(t) {
        return n.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return n.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return n.selectArea(this, t);
    },
    bindChange: function(t) {
        return n.bindChange(this, t);
    },
    onCancel: function(t) {
        return n.onCancel(this, t);
    },
    onConfirm: function(t) {
        return n.onConfirm(this, t);
    },
    getIndex: function(t, a) {
        return n.getIndex(t, a);
    },
    closespecs: function() {
        this.setData({
            closespecs: !1
        });
    },
    onPageScroll: function(t) {},
    onShow: function() {},
    onReachBottom: function() {},
    addCartquick: function(t, a) {
        var e = this, i = e.data.numtotal, n = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/update", {
            quickid: n,
            goodsid: e.data.goodsid,
            optionid: t || "",
            update: "",
            total: "",
            type: e.data.addtype,
            typevalue: a || "",
            diyformdata: e.data.formdataval ? e.data.formdataval : ""
        }, function(t) {
            if (0 != t.error) e.setData({
                cantclick: !0
            }), s.toast(e, t.message), e.setData({
                active: "",
                slider: "out",
                isSelected: !0,
                tempname: "",
                showPicker: !1
            }); else {
                var a = e.data.main;
                a.cartList.total = t.total, a.cartList.totalprice = t.totalprice, a.cartList.list = [ 1 ], 
                i[e.data.goodsid] = t.goodstotal, e.setData({
                    numtotal: i,
                    main: a,
                    clearcart: !0,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    showPicker: !1,
                    formdataval: {}
                }), e.data.addtype;
            }
        });
    },
    addGoodToCartFn: function(t) {
        if (0 != t.target.dataset.total) {
            e.checkAuth();
            var a = 1 == this.data.main.cartdata ? "takeoutmodel" : "shopmodel";
            t.currentTarget.dataset.canadd || (a = "cantaddcart"), this.setData({
                morechose: t.currentTarget.dataset.more
            }), this.setData({
                addtype: t.currentTarget.dataset.add,
                goodsid: t.currentTarget.dataset.id,
                mouse: t
            }), "reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num && this.setData({
                addtype: "delete"
            }), "1" == t.currentTarget.dataset.more && "reduce" == this.data.addtype ? s.toast(this, "请在购物车中修改多规格商品") : "reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num ? s.toast(this, "不能少于" + t.currentTarget.dataset.min + "件商品") : "1" != t.currentTarget.dataset.more && "0" == t.currentTarget.dataset.diyformtype && t.currentTarget.dataset.canadd || ("reduce" != this.data.addtype && "delete" != this.data.addtype ? (this.setData({
                showPicker: !0,
                cycledate: !1
            }), i.selectpicker(t, this, "quickbuy", a)) : (this.setData({
                storenum: t.currentTarget.dataset.store,
                maxnum: t.currentTarget.dataset.maxnum
            }), this.addCartquick("", 1))), "1" != t.currentTarget.dataset.more && "0" == t.currentTarget.dataset.diyformtype && t.currentTarget.dataset.canadd && (this.setData({
                storenum: t.currentTarget.dataset.store,
                maxnum: t.currentTarget.dataset.maxnum
            }), "reduce" == this.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num ? s.toast(this, "不能少于" + t.currentTarget.dataset.min + "件商品") : this.addCartquick("", 1));
        } else wx.showToast({
            title: "商品已售罄",
            icon: "none",
            duration: 2e3
        });
    },
    animate: function(t) {
        this.finger = {};
        var a = {};
        this.finger.x = t.touches[0].clientX, this.finger.y = t.touches[0].clientY, this.finger.y < this.busPos.y ? a.y = this.finger.y - 150 : a.y = this.busPos.y - 150, 
        a.x = Math.abs(this.finger.x - this.busPos.x) / 2, this.finger.x > this.busPos.x ? a.x = (this.finger.x - this.busPos.x) / 2 + this.busPos.x : a.x = (this.busPos.x - this.finger.x) / 2 + this.finger.x, 
        this.linePos = this.bezier([ this.busPos, a, this.finger ], 30), this.startAnimation(t);
    },
    bezier: function(t, a) {
        for (var e, r, i, s = [], n = 0; n <= a; n++) {
            for (i = t.slice(0), r = []; e = i.shift(); ) if (i.length) r.push((o = [ e, i[0] ], 
            d = n / a, p = m = f = g = h = l = u = c = void 0, c = o[0], h = (u = o[1]).x - c.x, 
            g = u.y - c.y, l = Math.pow(Math.pow(h, 2) + Math.pow(g, 2), .5), f = g / h, m = Math.atan(f), 
            p = l * d, {
                x: c.x + p * Math.cos(m),
                y: c.y + p * Math.sin(m)
            })); else {
                if (!(1 < r.length)) break;
                i = r, r = [];
            }
            s.push(r[0]);
        }
        var o, d, c, u, l, h, g, f, m, p;
        return {
            bezier_points: s
        };
    },
    startAnimation: function(t) {
        var a = 0, e = this, r = e.linePos.bezier_points;
        this.setData({
            hide_good_box: !1,
            bus_x: e.finger.x,
            bus_y: e.finger.y
        });
        var i = r.length;
        a = i, this.timer = setInterval(function() {
            a--, e.setData({
                bus_x: r[a].x,
                bus_y: r[a].y
            }), a < 1 && (clearInterval(e.timer), e.setData({
                hide_good_box: !0
            }));
        }, 13);
    },
    clearShopCartFn: function(t) {
        var s = this, a = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/clearCart", {
            quickid: a
        }, function(t) {
            var a = s.data.main;
            a.cartList = {
                list: [],
                total: 0,
                totalprice: 0
            };
            for (var e = s.data.tempcartid, r = [], i = 0; i < e.length; i++) r[Number(e[i])] = -1;
            s.setData({
                main: a,
                clickCar: !1,
                numtotal: r,
                clearcart: !1,
                showPicker: !1
            });
        });
    },
    closemulti: function() {
        this.setData({
            showPicker: !1,
            clickCar: !1,
            cycledate: !0
        });
    },
    gopay: function() {
        var t = 1 == this.data.main.cartdata ? this.data.pageid : "";
        this.data.main.cartList.list.length ? wx.navigateTo({
            url: "/pages/order/create/index?fromquick=" + t
        }) : s.toast(this, "请先添加商品到购物车");
    },
    gotocart: function() {
        var t = "/pages/member/cart/index";
        wx.navigateTo({
            url: t,
            fail: function() {
                wx.switchTab({
                    url: t
                });
            }
        });
    },
    cartaddcart: function(i) {
        var n = this, t = 1 == this.data.main.cartdata ? this.data.pageid : "", o = "0" == i.currentTarget.dataset.id ? i.currentTarget.dataset.goodsid : i.currentTarget.dataset.id, a = i.currentTarget.dataset.add;
        i.currentTarget.dataset.min == i.currentTarget.dataset.num && "reduce" == a && (a = "delete"), 
        r.get("quick/index/update", {
            quickid: t,
            goodsid: i.currentTarget.dataset.goodsid,
            optionid: "0" == i.currentTarget.dataset.id ? "" : i.currentTarget.dataset.id,
            update: "",
            total: "",
            type: a,
            typevalue: 1
        }, function(t) {
            if (0 == t.error) {
                var a = n.data.cartcartArr;
                a[o] = t.goodsOptionTotal || 0 == t.goodsOptionTotal ? t.goodsOptionTotal : t.goodstotal;
                var e = n.data.main;
                e.cartList.total = t.total, e.cartList.totalprice = t.totalprice;
                var r = n.data.numtotal;
                r[i.currentTarget.dataset.goodsid] = t.goodstotal, n.setData({
                    cartcartArr: a,
                    main: e,
                    numtotal: r
                });
            } else s.toast(n, t.message);
        });
    },
    scrollfn: function(t) {
        for (var a = this.data.arrLab, e = 0; e < this.data.arrscroll.length; e++) if (a[e] = 0, 
        Math.abs(t.detail.scrollTop - this.data.arrscroll[e]) < 26) {
            a[e] = 1, this.setData({
                arrLab: a
            });
            break;
        }
    },
    onShareAppMessage: function(t) {}
});