var e = getApp(), t = e.requirejs("core"), a = e.requirejs("foxui"), i = e.requirejs("wxParse/wxParse");

Page({
    data: {
        id: 0,
        detail: {}
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        }), this.getDetail();
    },
    getDetail: function() {
        var a = this;
        t.get("sale/coupon/getdetail", {
            id: this.data.id
        }, function(e) {
            0 < e.error ? wx.navigateBack() : (i.wxParse("wxParseData", "html", e.detail.desc, a, "5"), 
            a.setData({
                detail: e.detail,
                show: !0
            }));
        });
    },
    receive: function(e) {
        var i = this.data.detail, s = this;
        if (this.data.buying) a.toast(s, "正在执行请稍后"); else if (1 == i.canget) {
            var o = "确认使用";
            0 < i.money && (o += i.money + "元", 0 < i.credit && (o += "+")), 0 < i.credit && (o += i.credit + "积分"), 
            o += i.gettypestr + "吗？", t.confirm(o, function() {
                s.setData({
                    buying: !0
                }), t.post("sale/coupon/pay", {
                    id: s.data.id
                }, function(e) {
                    if (0 < e.error) return a.toast(s, e.message), void s.setData({
                        buying: !1
                    });
                    s.setData({
                        logid: e.logid
                    }), e.wechat && e.wechat.success ? t.pay(e.wechat.payinfo, function(e) {
                        "requestPayment:ok" == e.errMsg && s.payResult();
                    }) : s.payResult(), s.setData({
                        buying: !1
                    });
                });
            });
        } else a.toast(s, i.getstr);
    },
    payResult: function() {
        var s = this;
        t.get("sale/coupon/payresult", {
            logid: this.data.logid
        }, function(e) {
            if (0 < e.error) a.toast(s, e.message); else if (0 != e.coupontype) {
                var i = "/pages/sale/coupon/my/index/index";
                1 == e.coupontype && (i = "/pages/member/recharge/index"), t.confirm(e.confirm_text, function() {
                    wx.redirectTo({
                        url: i
                    });
                }, function() {
                    wx.redirectTo({
                        url: "/pages/sale/coupon/my/index/index"
                    });
                });
            } else wx.redirectTo({
                url: "/pages/sale/coupon/my/showcoupons2/index?id=" + e.dataid
            });
        });
    }
});