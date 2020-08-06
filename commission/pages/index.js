var t = getApp(), e = t.requirejs("core");

Page({
    data: {},
    onLoad: function(e) {
        t.checkAuth(), this.setData({
            options: e
        });
    },
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var i = this;
        e.get("commission/index", {}, function(t) {
            7e4 != t.error ? (t.show = !0, i.setData(t), wx.setNavigationBarTitle({
                title: t.set.texts.center
            })) : wx.redirectTo({
                url: "../../commission/pages/register/index"
            });
        });
    }
});