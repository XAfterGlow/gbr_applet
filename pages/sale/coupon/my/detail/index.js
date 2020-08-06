var e = getApp(), t = e.requirejs("core"), a = e.requirejs("wxParse/wxParse");

Page({
    data: {},
    onLoad: function(e) {
        this.setData({
            id: e.id
        }), this.getDetail();
    },
    getDetail: function() {
        var i = this;
        t.get("sale/coupon/my/getdetail", {
            id: this.data.id
        }, function(e) {
            0 < e.error ? wx.navigateBack() : (a.wxParse("wxParseData", "html", e.detail.desc, i, "5"), 
            i.setData({
                detail: e.detail,
                show: !0
            }));
        });
    },
    receive: function(e) {
        var t, a = this.data.detail;
        0 != a.coupontype ? (1 == a.coupontype ? t = "/pages/member/recharge/index" : 2 == a.coupontype && (t = "/pages/sale/coupon/my/index"), 
        wx.redirectTo({
            url: t
        })) : wx.redirectTo({
            url: "/pages/sale/coupon/my/list/index?couponid=" + this.data.id
        });
    }
});