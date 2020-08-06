var n = getApp(), t = n.requirejs("core");

n.requirejs("jquery"), n.requirejs("foxui"), Page({
    onPullDownRefresh: function() {
        var e = this;
        t.get("groups", {}, function(n) {
            0 == n.error && (e.setData({
                res: n
            }), wx.stopPullDownRefresh());
        });
    },
    data: {},
    onLoad: function(e) {
        var a = this;
        n.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), t.get("groups", {}, function(n) {
            a.setData({
                res: n
            });
        });
    },
    advheight: function(n) {
        var t = n.detail.width / n.detail.height;
        this.setData({
            advheight: 750 / t
        });
    },
    navigate: function(n) {
        var e = t.pdata(n).link;
        wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.onPullDownRefresh();
    },
    onShareAppMessage: function() {}
});