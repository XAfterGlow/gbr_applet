var e = getApp(), t = e.requirejs("core"), a = e.requirejs("jquery");

Page({
    data: {
        disabled: !0,
        coupon: {
            count: 0
        }
    },
    onLoad: function(t) {
        e.url(t), this.get_list();
    },
    onShow: function() {
        var t = e.getCache("coupon");
        this.setData({
            "coupon.id": t.id,
            "coupon.name": t.name || ""
        });
    },
    get_list: function() {
        var a = this;
        t.get("member/recharge", {}, function(e) {
            e.show = !0, a.setData(e);
        });
    },
    toggle: function(e) {
        var a = t.pdata(e), i = a.id, o = {};
        o[a.type] = 0 == i || void 0 === i ? 1 : 0, this.setData(o);
    },
    money: function(e) {
        var i = !0, o = a.trim(e.detail.value), r = this;
        o >= this.data.minimumcharge && (i = !1), t.get("sale/coupon/query", {
            type: 1,
            money: o
        }, function(e) {
            r.setData({
                money: o,
                disabled: i,
                coupon: {
                    id: 0,
                    name: "",
                    count: e.count
                }
            });
        });
    },
    submit: function() {
        var e = a.toFixed(this.data.money, 2), i = {};
        this.data.disabled || (void 0 === e || isNaN(e) ? t.alert("请填写正确的充值金额!") : e <= 0 || this.data.disabled ? t.alert("最低充值金额为" + this.data.minimumcharge + "元!") : (i.money = e, 
        i.type = "wechat", i.couponid = this.data.coupon.id, t.post("member/recharge/submit", i, function(a) {
            0 == a.error ? a.wechat.success ? t.pay(a.wechat.payinfo, function(e) {
                "requestPayment:ok" == e.errMsg && t.post("member/recharge/wechat_complete", {
                    logid: a.logid
                }, function(e) {
                    if (0 == e.error) {
                        var a = wx.getStorageSync("orderid");
                        if (0 != a) return wx.removeStorage("orderid"), void wx.redirectTo({
                            url: "/pages/order/pay/index?id=" + a
                        });
                        wx.navigateBack();
                    } else t.alert(e.message);
                }, !0);
            }) : t.alert(list.wechat.payinfo.message + "\n不能使用微信支付!") : t.alert(a.message);
        }, !0)));
    }
});