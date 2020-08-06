var e = getApp(), t = require("./../../../utils/core.js");

Page({
    data: {
        close: 0,
        text: "",
        imgUrl: ""
    },
    onLoad: function(t) {
        this.setData({
            close: t.close,
            text: t.text,
            imgUrl: e.globalData.approot
        });
    },
    onShow: function() {
        var t = e.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: t || "提示"
        });
    },
    bind: function() {
        var n = this, i = setInterval(function() {
            wx.getSetting({
                success: function(e) {
                    var t = e.authSetting["scope.userInfo"];
                    t && (wx.reLaunch({
                        url: "/pages/index/index"
                    }), clearInterval(i), n.setData({
                        userInfo: t
                    }));
                }
            });
        }, 1e3);
    },
    bindGetUserInfo: function(i) {
        var n = e.getCache("routeData"), a = n.url, o = n.params, s = "";
        Object.keys(o).forEach(function(e) {
            s += e + "=" + o[e] + "&";
        });
        var c = "/" + a + "?" + (o = s.substring(0, s.length - 1));
        wx.login({
            success: function(n) {
                t.post("wxapp/login", {
                    code: n.code
                }, function(n) {
                    n.error ? t.alert("获取用户登录态失败:" + n.message) : t.get("wxapp/auth", {
                        data: i.detail.encryptedData,
                        iv: i.detail.iv,
                        sessionKey: n.session_key
                    }, function(t) {
                        console.log(t), 1 == t.isblack && wx.showModal({
                            title: "无法访问",
                            content: "您在商城的黑名单中，无权访问！",
                            success: function(t) {
                                t.confirm && e.close(), t.cancel && e.close();
                            }
                        }), i.detail.userInfo.openid = t.openId, i.detail.userInfo.id = t.id, i.detail.userInfo.uniacid = t.uniacid, 
                        e.setCache("userinfo", i.detail.userInfo), e.setCache("userinfo_openid", i.detail.userInfo.openid), 
                        e.setCache("userinfo_id", t.id), e.getSet(), wx.reLaunch({
                            url: c
                        });
                    });
                });
            },
            fail: function() {
                t.alert("获取用户信息失败!");
            }
        });
    },
    cancelLogin: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});