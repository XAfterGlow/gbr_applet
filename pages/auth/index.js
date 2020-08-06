var n = getApp(), e = require("../../utils/core.js");

Page({
    data: {
        shop_logo: "",
        shop_name: ""
    },
    onLoad: function(n) {
        var o = this;
        e.get("wxAppSetting", {}, function(n) {
            var e = n.sysset;
            o.setData({
                shop_logo: e.shoplogo,
                shop_name: e.shopname
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindGetUserInfo: function(t) {
        wx.showLoading({
            title: "加载中"
        }), wx.login({
            success: function(o) {
                console.log(o.code);
                let c=n.getCache("mids")
                console.log(c);
                e.post("wxapp/login", {
                    code: o.code,
                    mids:c
                }, function(o) {
                    o.error ? e.alert("获取用户登录态失败:" + o.message) : e.get("wxapp/auth", {
                        data: t.detail.encryptedData,
                        iv: t.detail.iv,
                        sessionKey: o.session_key,
                        mids:c
                    }, function(e) {
                        1 == e.isblack && wx.showModal({
                            title: "无法访问",
                            content: "您在商城的黑名单中，无权访问！",
                            success: function(e) {
                                e.confirm && n.close(), e.cancel && n.close();
                            }
                        }), t.detail.userInfo.openid = e.openId, t.detail.userInfo.id = e.id, t.detail.userInfo.uniacid = e.uniacid, 
                        n.setCache("userinfo", t.detail.userInfo), 
                        n.setCache("userinfo_openid", t.detail.userInfo.openid), 
                        n.setCache("userinfo_id", e.id), n.getSet(), n.scanCarts(), wx.navigateBack({
                            changed: !0
                        });
                    });
                });
            },
            fail: function() {
                e.alert("获取用户信息失败!");
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    navigateBack: function() {
        wx.navigateBack({
            changed: !0
        });
    },
    close: function() {
        wx.navigateBack({
            delta: 0
        });
    }
});