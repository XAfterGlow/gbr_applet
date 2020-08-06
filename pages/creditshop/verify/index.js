var e = getApp(), t = e.requirejs("core");

e.requirejs("icons"), e.requirejs("foxui"), e.requirejs("wxParse/wxParse"), e.requirejs("jquery"), 
Page({
    data: {
        eno: 0,
        qrcode: "",
        logid: 0,
        options: []
    },
    onLoad: function(e) {
        var t = this;
        e = e || {}, wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight
                });
            }
        }), t.setData({
            options: e,
            logid: e.id
        });
    },
    onReady: function() {},
    onShow: function() {
        var i = this;
        e.getCache("isIpx") ? i.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : i.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), i.getDetail(), wx.getSetting({
            success: function(e) {
                var t = e.authSetting["scope.userInfo"];
                i.setData({
                    limits: t
                });
            }
        });
    },
    getDetail: function(e) {
        var i = this;
        t.get("creditshop/exchange/qrcode", {
            id: i.data.logid
        }, function(e) {
            i.setData({
                eno: e.eno,
                qrcode: e.qrcode
            });
        });
    }
});