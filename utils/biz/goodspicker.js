var t = getApp(), a = (t.requirejs("jquery"), t.requirejs("core")), e = t.requirejs("foxui"), o = t.requirejs("biz/diyform");

module.exports = {
    number: function(t, o) {
        var d = a.pdata(t), i = e.number(o, t), s = (d.id, d.optionid, d.min);
        d.max, 1 == i && 1 == d.value && "minus" == t.target.dataset.action || i < s && "minus" == t.target.dataset.action ? e.toast(o, "单次最少购买" + d.value + "件") : d.value == d.max && "plus" == t.target.dataset.action || (parseInt(o.data.stock) < parseInt(i) ? e.toast(o, "库存不足") : o.setData({
            total: i
        }));
    },
    inputNumber: function(t, a) {
        var o = a.data.goods.maxbuy, d = a.data.goods.minbuy, i = t.detail.value;
        if (0 < i) {
            if (0 < o && o <= parseInt(t.detail.value) && (i = o, e.toast(a, "单次最多购买" + o + "件")), 
            0 < d && d > parseInt(t.detail.value) && (i = d, e.toast(a, "单次最少购买" + d + "件")), 
            parseInt(a.data.stock) < parseInt(i)) return void e.toast(a, "库存不足");
        } else i = 0 < d ? d : "";
        a.setData({
            total: i
        });
    },
    chooseGift: function(t, a) {
        a.setData({
            giftid: t.currentTarget.dataset.id
        });
    },
    buyNow: function(t, d, i) {
        t.currentTarget.dataset.type && (i = t.currentTarget.dataset.type);
        var s = d.data.optionid, r = d.data.goods.hasoption, n = d.data.diyform, g = d.data.giftid;
        if (9 == d.data.goods.type) var l = d.data.checkedDate / 1e3;
        if (0 < r && !s) e.toast(d, "请选择规格"); else if (n && 0 < n.fields.length) {
            if (!o.verify(d, n)) return;
            a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: n.f_data
            }, function(t) {
                0 == d.data.goods.isgift || "goods_detail" != i ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&selectDate=" + l
                }) : g ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
                }) : "" != g ? (d.data.goods.giftinfo && 1 == d.data.goods.giftinfo.length && (g = d.data.goods.giftinfo[0].id), 
                d.data.goods.gifts && 1 == d.data.goods.gifts.length && (g = d.data.goods.gifts[0].id), 
                wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
                })) : e.toast(d, "请选择赠品");
            });
        } else g ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&giftid=" + g
        }) : 0 == d.data.goods.isgift || "goods_detail" != i ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&selectDate=" + l
        }) : "" != g ? (d.data.goods.giftinfo && 1 == d.data.goods.giftinfo.length && (g = d.data.goods.giftinfo[0].id), 
        d.data.goods.gifts && 1 == d.data.goods.gifts.length && (g = d.data.goods.gifts[0].id), 
        wx.navigateTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&giftid=" + g
        })) : e.toast(d, "请选择赠品");
    },
    getCart: function(d, i) {
        var s = i.data.optionid, r = i.data.goods.hasoption, n = i.data.diyform;
        if (0 < r && !s) e.toast(i, "请选择规格"); else if (i.data.quickbuy) {
            if (n && 0 < n.fields.length) {
                if (!o.verify(i, n)) return;
                i.setData({
                    formdataval: {
                        diyformdata: n.f_data
                    }
                });
            }
            i.addCartquick(s, i.data.total);
        } else if (n && 0 < n.fields.length) {
            if (!o.verify(i, n)) return;
            a.post("order/create/diyform", {
                id: i.data.id,
                diyformdata: n.f_data
            }, function(o) {
                a.post("member/cart/add", {
                    id: i.data.id,
                    total: i.data.total,
                    optionid: s,
                    diyformdata: n.f_data
                }, function(a) {
                    0 == a.error ? (i.setData({
                        "goods.cartcount": a.cartcount,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), t.scanCarts(), e.toast(i, "添加成功")) : e.toast(i, a.message);
                });
            });
        } else a.post("member/cart/add", {
            id: i.data.id,
            total: i.data.total,
            optionid: s
        }, function(a) {
            if (0 == a.error) {
                t.scanCarts(), e.toast(i, "添加成功");
                var o = i.data.goods;
                i.setData({
                    "goods.cartcount": a.cartcount,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    goods: o
                });
            } else e.toast(i, a.message);
        });
    },
    selectpicker: function(d, i, s, r) {
        1 == d.currentTarget.dataset.home && i.setData({
            giftid: ""
        }), t.checkAuth();
        var o = i.data.active, n = d.currentTarget.dataset.id;
        "" == o && i.setData({
            slider: "in",
            show: !0
        }), a.get("goods/get_picker", {
            id: n
        }, function(t) {
            console.log("价格",t);
            
            if (t.goods.presellstartstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) if (0 < t.goods.member_discount && i.setData({
                "goods.member_discount": t.goods.member_discount
            }), t.goods.presellendstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) {
                t.goods && t.goods.giftinfo && 1 == t.goods.giftinfo.length && i.setData({
                    giftid: t.goods.giftinfo[0].id
                });
                var a = t.options;
                if ("goodsdetail" == s) if (i.setData({
                    pickerOption: t,
                    canbuy: i.data.goods.canbuy,
                    buyType: d.currentTarget.dataset.buytype,
                    options: a,
                    minpicker: s,
                    "goods.thistime": t.goods.thistime
                }), 0 != t.goods.minbuy && i.data.total < t.goods.minbuy) var o = t.goods.minbuy; else o = i.data.total; else i.setData({
                    pickerOption: t,
                    goods: t.goods,
                    options: a,
                    minpicker: s
                }), i.setData({
                    optionid: !1,
                    specsData: [],
                    specs: []
                }), o = 0 != t.goods.minbuy && i.data.total < t.goods.minbuy ? t.goods.minbuy : 1;
                t.diyform && i.setData({
                    diyform: {
                        fields: t.diyform.fields,
                        f_data: t.diyform.lastdata
                    }
                }), i.setData({
                    id: n,
                    pagepicker: s,
                    total: o,
                    tempname: "select-picker",
                    active: "active",
                    show: !0,
                    modeltakeout: r
                });
            } else e.toast(i, t.goods.presellstatustitle); else e.toast(i, t.goods.presellstatustitle);
        });
    },
    sortNumber: function(t, a) {
        return t - a;
    },
    specsTap: function(t, a) {
        var o = a.data.specs;
        o[t.target.dataset.idx] = {
            id: t.target.dataset.id,
            title: t.target.dataset.title
        };
        var d, i = "", s = [];
        o.forEach(function(t) {
            i += t.title + ";", s.push(t.id);
        });
        var r = s.sort(this.sortNumber);
        d = r.join("_");
        var n = a.data.options;
        "" != t.target.dataset.thumb && a.setData({
            "goods.thumb": t.target.dataset.thumb
        }), n.forEach(function(t) {
            t.specs == d && (a.setData({
                optionid: t.id,
                "goods.total": t.stock,
                "goods.maxprice": t.marketprice,
                "goods.minprice": t.marketprice,
                "goods.marketprice": t.marketprice,
                "goods.member_discount": t.member_discount,
                "goods.seecommission": t.seecommission,
                "goods.presellprice": 0 < a.data.goods.ispresell ? t.presellprice : a.data.goods.presellprice,
                optionCommission: !0
            }), parseInt(t.stock) < parseInt(a.data.total) ? (a.setData({
                canBuy: "库存不足",
                stock: t.stock
            }), e.toast(a, "库存不足")) : a.setData({
                canBuy: "",
                stock: t.stock
            }));
        }), a.setData({
            specsData: o,
            specsTitle: i
        });
    }
};