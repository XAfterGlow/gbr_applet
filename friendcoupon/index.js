var t = getApp(), i = t.requirejs("/core"), a = t.requirejs("foxui");

t.requirejs("jquery"), Page({
    data: {
        activity_setting: {},
        shareid: "",
        id: "",
        share_id: "",
        time: [ "00", "00", "00", "00" ],
        listlength: !1,
        pindex: 6
    },
    onLoad: function(i) {
        t.url(i), i.share_id && this.setData({
            share_id: i.share_id
        }), i.id && this.setData({
            id: i.id
        }), this.getList();
    },
    getCoupon: function(e) {
        var s = this;
        if (!s.data.isGet) {
            var r = {
                id: s.data.id,
                share_id: s.data.share_id,
                form_id: e.detail.formId
            };
            s.data.isLogin ? (s.setData({
                isGet: !0
            }), i.get("friendcoupon/receive", r, function(t) {
                0 == t.error ? (a.toast(s, "领取成功"), s.getList(), s.setData({
                    isGet: !1
                })) : s.setData({
                    invalidMessage: t.message.replace("<br>", "\n"),
                    isGet: !1
                });
            })) : t.checkAuth();
        }
    },
    carve: function(e) {
        var s = this, r = {
            id: s.data.id,
            share_id: s.data.share_id,
            form_id: e.detail.formId
        };
        s.data.isLogin ? i.get("friendcoupon/divide", r, function(t) {
            t.error, a.toast(s, t.message), s.getList();
        }) : t.checkAuth();
    },
    mycoupon: function() {
        this.setData({
            id: this.data.data.currentActivityInfo.activity_id,
            share_id: this.data.data.currentActivityInfo.headerid
        }), this.getList();
    },
    onShareAppMessage: function(t) {
        var a = this.data.data.activitySetting.title, e = "/friendcoupon/index?share_id=" + this.data.shareid + "&id=" + this.data.id;
        return i.onShareAppMessage(e, a);
    },
    more: function() {
        var e = this, s = e.data.activityList;
        i.get("friendcoupon/more", {
            id: e.data.id,
            share_id: e.data.shareid,
            pindex: e.data.pindex
        }, function(t) {
            0 === t.result.list.length ? a.toast(e, "没有更多了") : e.setData({
                activityList: s.concat(t.result.list),
                pindex: e.data.pindex + 10
            });
        });
    },
    getList: function() {
        var s = this;
        i.get("friendcoupon", {
            id: s.data.id,
            share_id: s.data.share_id
        }, function(t) {
            if (0 == t.error) {
                if (t.currentActivityInfo && (t.currentActivityInfo.enough = Number(t.currentActivityInfo.enough)), 
                "string" == typeof t.activitySetting.desc && s.setData({
                    isArray: !0
                }), s.setData({
                    activityData: t.activityData,
                    activityList: 5 < t.activityData.length ? t.activityData.slice(0, 5) : t.activityData,
                    data: t,
                    isLogin: t.isLogin,
                    mylink: t.mylink,
                    invalidMessage: t.invalidMessage,
                    shareid: t.currentActivityInfo ? t.currentActivityInfo.headerid : ""
                }), +t.overTime + 3 > Math.round(+new Date() / 1e3)) var e = setInterval(function() {
                    s.setData({
                        time: i.countDown(+t.overTime + 3)
                    }), s.data.time || (clearInterval(e), s.getList());
                }, 1e3);
            } else a.toast(s, t.message);
        });
    }
});