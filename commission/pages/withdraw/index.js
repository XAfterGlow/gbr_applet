var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        code: 0
    },
    onShow: function() {
        this.getData(), t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    getData: function() {
        var i = this;
        a.get("commission/withdraw", {}, function(t) {
                t.show = !0, i.setData(t), wx.setNavigationBarTitle({
                    title: t.set.texts.commission1
                });
        });
    },
    toggleSend: function(t) {
        0 == t.currentTarget.dataset.id ? this.setData({
            code: 1
        }) : this.setData({
            code: 0
        });
    },
    withdraw: function(t) {
        this.data.cansettle && wx.navigateTo({
            url: "../apply/index"
        });
    }
});