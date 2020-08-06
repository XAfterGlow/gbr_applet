var t = getApp(), e = t.requirejs("core"), s = t.requirejs("jquery");

Page({
    data: {
        type: 0,
        merchs: [],
        goodslist: [],
        goodsid: 0,
        money: 0,
        list: [],
        loading: !0
    },
    onLoad: function(e) {
        if (Number(e.type)) this.setData({
            money: e.money
        }); else {
            var s = t.getCache("goodsInfo");
            this.setData({
                goodslist: s.goodslist,
                merchs: s.merchs
            });
        }
        this.setData({
            type: e.type
        }), this.getList();
    },
    getList: function() {
        for (var s = this, t = this.data, o = 0; o < t.goodslist.length; o++) delete t.goodslist[o].title, 
        delete t.goodslist[o].optiontitle, delete t.goodslist[o].thumb;
        t.type < 2 && e.get("sale/coupon/query", {
            type: t.type,
            money: t.money,
            goods: t.goodslist,
            merchs: t.merchs
        }, function(t) {
            s.setData({
                list: t.list,
                loading: !1
            });
        });
    },
    search: function(t) {
        var o = t.detail.value, e = this.data.old_list, i = this.data.list, a = [];
        s.isEmptyObject(e) && (e = i), s.isEmptyObject(e) || s.each(e, function(t, e) {
            -1 != e.couponname.indexOf(o) && a.push(e);
        }), this.setData({
            list: a,
            old_list: e
        });
    },
    bindBtn: function(e) {
        var s = this.data, o = e.currentTarget.dataset;
        s.type < 2 && (t.setCache("coupon", o, 20), wx.navigateBack());
    }
});