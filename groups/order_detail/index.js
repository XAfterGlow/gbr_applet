var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), r = getApp(), t = r.requirejs("core"), o = r.requirejs("biz/group_order");

Page({
    data: (0, e.default)({
        code: !1,
        consume: !1,
        store: !1,
        cancel: o.cancelArray,
        cancelindex: 0,
        diyshow: {},
        city_express_state: 0,
        order_id: 0,
        order: [],
        address: []
    }, "cancel", o.cancelArray),
    onLoad: function(e) {
        this.setData({
            order_id: e.order_id
        });
    },
    onShow: function() {
        this.get_list(), r.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    get_list: function() {
        var r = this;
        t.get("groups/order/details", {
            orderid: r.data.order_id
        }, function(e) {
            0 < e.error && (5e4 != e.error && t.toast(e.message, "loading"), wx.redirectTo({
                url: "../order/index"
            })), r.setData({
                show: !0,
                express: e.express,
                order: e.order,
                address: e.address,
                store: e.store,
                verify: e.verify,
                verifynum: e.verifynum,
                verifytotal: e.verifytotal,
                carrier: e.carrier,
                shop_name: e.sysset.shopname,
                goods: e.goods,
                goodRefund: e.goodRefund
            });
        });
    },
    more: function() {
        this.setData({
            all: !0
        });
    },
    code: function(e) {
        var r = this;
        t.post("groups/verify/qrcode", {
            id: r.data.order.id,
            verifycode: r.data.order.verifycode
        }, function(e) {
            0 == e.error ? r.setData({
                code: !0,
                qrcode: e.url
            }) : t.alert(e.message);
        }, !0);
    },
    diyshow: function(e) {
        var r = this.data.diyshow, o = t.data(e).id;
        r[o] = !r[o], this.setData({
            diyshow: r
        });
    },
    close: function() {
        this.setData({
            code: !1
        });
    },
    toggle: function(e) {
        var r = t.pdata(e), o = r.id, i = {};
        i[r.type] = 0 == o || void 0 === o ? 1 : 0, this.setData(i);
    },
    phone: function(e) {
        t.phone(e);
    },
    finish: function(e) {
        var r = this, o = e.target.dataset.orderid;
        t.confirm("是否确认收货", function() {
            t.get("groups/order/finish", {
                id: o
            }, function(e) {
                0 == e.error ? r.get_list(!0) : t.alert(e.message);
            });
        });
    },
    delete_: function(e) {
        var r = e.target.dataset.orderid;
        t.confirm("是否确认删除", function() {
            t.get("groups/order/delete", {
                id: r
            }, function(e) {
                0 == e.error ? wx.reLaunch({
                    url: "../order/index"
                }) : t.alert(e.message);
            });
        });
    },
    cancel: function(e) {
        var r = this.data.order_id;
        o.cancel(r, e.detail.value, "../order_detail/index?order_id=" + r);
    },
    refundcancel: function(e) {
        t.post("groups.refund.cancel", {
            orderid: this.data.order_id
        }, function(e) {
            0 == e.error ? wx.navigateBack() : wx.showToast({
                title: e.error,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onShareAppMessage: function() {
        return t.onShareAppMessage();
    }
});