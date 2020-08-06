
var e = require("utils/core.js");
let livePlayer = requirePlugin('live-player-plugin')
App({
    onShow: function(options) {
            // console.log('options.scene:',options.scene)
            if (options.scene == 1007 || options.scene == 1008 || options.scene == 1044) {
                livePlayer.getShareParams()
                    .then(res => {
                        this.setCache("roomid", res.room_id);
                        this.setCache("openid", res.openid);
                        this.setCache("shareopenid", res.share_openid);
                        this.setCache("mids", res.custom_params);
                        let a=this.getCache("roomid")
                        let b=this.getCache("openid")
                        let c=this.getCache("shareopenid")
                        let d=this.getCache("mids")
                        console.log('get room', a) // 房间号
                        console.log('get openid', b) // 用户openid
                        console.log('get share openid', c) // 分享者openid，分享卡片进入场景才有
                        console.log('get mids', d)// 分享者mid
                    }).catch(err => {
                        console.log('get share params', err)
                    })
            }
        
          var t = this;
        this.onLaunch();
        try {
            "" != this.getCache("userinfo_id") && e.get("member", {}, function(e) {
                t.setCache("userinfo_id", e.id);
            });
        } catch (e) {}
        
    },
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                "0" == e.model.indexOf("iPhone X") ? t.setCache("isIpx", e.model) : t.setCache("isIpx", "");
            }
        });
        var i = this;
        wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("systemInfo", e);
                var t = e.windowWidth, a = e.windowHeight;
                i.globalData.ww = t, i.globalData.hh = a, setTimeout(function() {
                    i.scanCarts();
                }, 200), setInterval(function() {}, 300);
            }
        });
    },
    scanCarts: function() {
        e.get("member/cart/get_cart", {}, function(e) {
            var t = [];
            if (e.list) {
                if (0 != (t = e.list).length) {
                    for (var a = 0, i = 0; i < t.length; i++) a += parseInt(t[i].total);
                    wx.setStorageSync("goodnum", a);
                }
            } else if (null != e.merch_list) {
                a = 0;
                for (var n = e.merch_list, o = 0; o < n.length; o++) {
                    for (var s = n[o].list, r = 0; r < s.length; r++) a += parseInt(s[r].total);
                    wx.setStorageSync("goodnum", a);
                }
            } else wx.setStorageSync("goodnum", 0);
        });
    },
    checkAuth: function(a) {
        var i = "/pages/auth/index", t = getCurrentPages(), n = t[t.length - 1], o = {
            params: n.options || null,
            url: n.route
        };
        if (o.params.hasOwnProperty("scene")) {
            var s = {}, r = decodeURIComponent(o.params.scene).split("&").shift().split("=");
            s.id = r[1], o.params = s;
        }
        this.setCache("routeData", o), this.getCache("userinfo"), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? (e.get("member", {}, function(e) {
                    e.error && wx.navigateTo({
                        url: i
                    });
                }), a && a()) : wx.navigateTo({
                    url: i
                });
            }
        });
    },
    requirejs: function(e) {
        return require("utils/" + e + ".js");
    },
    getConfig: function() {
        if (null !== this.globalData.api) return {
            api: this.globalData.api,
            approot: this.globalData.approot,
            appid: this.globalData.appid
        };
        var e = wx.getExtConfigSync();
        return this.globalData.api = e.config.api, this.globalData.approot = e.config.approot, 
        this.globalData.appid = e.config.appid, e.config;
    },
    getCache: function(e, t) {
        var a = +new Date() / 1e3, i = "";
        a = parseInt(a);
        try {
            (i = wx.getStorageSync(e + this.globalData.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "", 
            this.removeCache(e));
        } catch (e) {
            i = void 0 === t ? "" : t;
        }
        return i || "";
    },
    setCache: function(e, t, a) {
        var i = +new Date() / 1e3, n = !0, o = {
            expire: a ? i + parseInt(a) : 0,
            value: t
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, o);
        } catch (e) {
            n = !1;
        }
        return n;
    },
    removeCache: function(e) {
        var t = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            t = !1;
        }
        return t;
    },
    close: function() {
        this.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    getSet: function() {
        var a = this;
        "" == a.getCache("cacheset") && setTimeout(function() {
            var t = a.getCache("cacheset");
            e.get("cacheset", {
                version: t.version
            }, function(e) {
                e.update && a.setCache("cacheset", e.data);
            });
        }, 10);
    },
    url: function(e) {
        e = e || {};
        var t, a, i = {}, n = this.getCache("usermid");
        for (var o in t = e.mid || "", a = e.merchid || "", n) void 0 !== n[o] && (i[o] = n[o]);
        "" != n ? ("" != n.mid && void 0 !== n.mid || (i.mid = t), "" != n.merchid && void 0 !== n.merchid || (i.merchid = a)) : (i.mid = t, 
        i.merchid = a), this.setCache("usermid", i);
    },
    impower: function(t, a, i) {
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope." + t] || wx.showModal({
                    title: "用户未授权",
                    content: "您点击了拒绝授权，暂时无法" + a + "，点击去设置可重新获取授权喔~",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : "route" == i ? wx.switchTab({
                            url: "/pages/index/index"
                        }) : "details" == i || wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    globalDataClose: {
        flag: !1
    },
    globalData: {
        appid: "wxe69252e1ad48e13c",
        api: "https://gbr.xingrunshidai.com/app/ewei_shopv2_api.php?i=6",
        approot: "https://gbr.xingrunshidai.com/addons/ewei_shopv2/",
        userInfo: null
    }
});