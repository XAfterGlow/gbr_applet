var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui");

Page({
    data: {
        icons: t.requirejs("icons"),
        success: !1,
        successData: {},
        coupon: !1
    },
    onLoad: function(e) {
        t.checkAuth(), this.setData({
            options: e
        }), t.url(e);
    },
    onShow: function() {
        this.get_list();
    },
    get_list: function() {
        var a = this;
        this.setData({
            order_id: a.data.options.id
        }), e.get("groups/pay", {
            orderid: a.data.options.id,
            teamid: a.data.options.teamid
        }, function(t) {
            1 == t.error && e.alert(t.message), 50018 != t.error ? (t.data.wechat.success && !t.data.wechat.success && "0.00" != t.data.money && t.data.wechat.payinfo && e.alert(t.wechat.payinfo.message + "\n不能使用微信支付!"), 
            a.setData({
                list: t.data,
                show: !0
            })) : wx.navigateTo({
                url: "/pages/order/details/index?id=" + a.data.options.id
            });
        });
    },
    pay: function(t) {
        var a = e.pdata(t).type, o = this, i = this.data.list.wechat;
        "wechat" == a ? e.pay(i.payinfo, function(t) {
            "requestPayment:ok" == t.errMsg && o.complete(a);
        }) : "credit" == a ? e.confirm("确认要支付吗?", function() {
            o.complete(a);
        }, function() {}) : "cash" == a ? e.confirm("确认要使用货到付款吗?", function() {
            o.complete(a);
        }, function() {}) : o.complete(a);
    },
    complete: function(t) {
        var o = this;
        e.post("groups/pay/complete", {
            id: o.data.options.id,
            type: t
        }, function(t) {
            if (0 == t.error) return wx.setNavigationBarTitle({
                title: "支付成功"
            }), o.setData({
                success: !0,
                pay_type: t.type,
                pay_fee: t.fee,
                orderno: t.orderno,
                pay_msg: t.msg
            }), void (0 == o.data.list.teamid ? wx.reLaunch({
                url: "../order/index"
            }) : wx.reLaunch({
                url: "../groups_detail/index?teamid=" + o.data.list.teamid
            }));
            a.toast(o, t.message);
        }, !0, !0);
    },
    shop: function(t) {
        0 == e.pdata(t).id ? this.setData({
            shop: 1
        }) : this.setData({
            shop: 0
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    closecoupon: function() {
        this.setData({
            coupon: !1
        });
    }
});