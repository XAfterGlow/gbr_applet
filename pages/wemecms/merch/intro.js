var e = getApp(), a = e.requirejs("wxParse/wxParse"), r = e.requirejs("core");

Page({
    data: {
        merchid: 0,
        loading: !1,
        loaded: !1,
        merch: [],
        approot: e.globalData.approot
    },
    onLoad: function(e) {
        this.setData({
            merchid: e.id
        }), this.getIntro();
    },
    getIntro: function() {
        var t = this;
        r.get("wemecms/merch/intro", {
            id: t.data.merchid
        }, function(e) {
            var r = [];
            e.merch.lat && (r = [ {
                latitude: e.merch.lat,
                longitude: e.merch.lng,
                name: e.merch.merchname,
                desc: e.merch.address
            } ]), t.setData({
                merch: e.merch,
                markers: r
            }), a.wxParse("wxParseData", "html", e.merch.desc, t, "0");
        });
    },
    callme: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.id
        });
    },
    jump: function(e) {
        var a = r.pdata(e).id;
        0 < a && wx.navigateTo({
            url: "/pages/sale/coupon/detail/index?id=" + a
        });
    }
});