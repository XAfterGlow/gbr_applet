var e = getApp(), t = e.requirejs("/core"), i = e.requirejs("/foxui");

e.requirejs("jquery"), Page({
    data: {
        loading: !1
    },
    onLoad: function(t) {
        this.setData({
            imgUrl: e.globalData.approot
        }), this.getlist();
    },
    getlist: function() {
        var a = this;
        t.get("dividend", "", function(e) {
            1 == e.error && (console.error(e.message), i.toast(a, e.message), setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/index/index"
                });
            }, 1e3)), a.setData({
                message: e
            }), e.member ? wx.setNavigationBarTitle({
                title: e.set.texts.center || "分红中心"
            }) : wx.redirectTo({
                url: "/dividend/pages/register/index"
            });
        });
    },
    found: function() {
        var a = this;
        a.setData({
            loading: !0
        }), t.post("dividend/createTeam", "", function(e) {
            0 == e.error && (a.setData({
                loading: !1
            }), i.toast(a, "创建完成"), a.getlist());
        });
    }
});