var e = getApp(), o = e.requirejs("core");

e.requirejs("jquery"), Page({
    data: {
        verifygoods: []
    },
    onLoad: function(o) {
        this.setData({
            options: o
        }), e.url(o);
    },
    onShow: function() {
        this.get_detail();
    },
    get_detail: function() {
        var t = this;
        o.get("verifygoods/get_detail", t.data.options, function(e) {
            0 == e.error ? t.setData({
                verifygoods: e.item,
                store: e.store,
                canverify: e.canverify,
                canverify_message: e.canverify_message,
                qrcode: e.qrcode,
                verifygoodlogs: e.verifygoodlogs,
                verifynum: e.verifynum,
                limitdatestr: e.limitdatestr,
                verifycode: e.verifycode
            }) : (5e4 != e.error && o.toast(e.message, "loading"), wx.redirectTo({
                url: "/pages/verifygoods/index"
            }));
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});