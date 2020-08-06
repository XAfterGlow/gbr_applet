var t = getApp(), a = t.requirejs("core"), s = (t.requirejs("icons"), t.requirejs("foxui"));

t.requirejs("wxParse/wxParse"), t.requirejs("jquery"), Page({
    data: {
        status: 0,
        showcode: !1,
        list: {},
        page: 1,
        total: 0,
        more: !0,
        load: !0,
        notgoods: !0
    },
    onLoad: function(t) {
        this.get_list();
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            status: a
        }), this.setData({
            page: 1
        }), this.get_list();
    },
    finish: function(t) {
        var e = this, o = t.currentTarget.dataset.logid;
        wx.showModal({
            title: "提示",
            content: "确认已收到货了吗？",
            success: function(t) {
                t.confirm && a.get("creditshop/log/finish", {
                    id: o
                }, function(t) {
                    0 == t.error ? (s.toast(e, "确认收货"), e.onShow()) : s.toast(e, t.message);
                });
            }
        });
    },
    get_list: function(s) {
        var e = this;
        a.post("creditshop/log/getlist", {
            page: e.data.page,
            status: e.data.status
        }, function(t) {
            e.setData({
                creditname: t.sysset.texts.credit
            }), 0 == t.error && (s && (t.list = e.data.list.concat(t.list)), e.setData({
                list: t.list
            }), e.setData({
                total: t.total
            })), t.pagesize >= t.next_page && e.setData({
                more: !1
            }), 0 == t.total && e.setData({
                more: !0
            }), s && (t.list = e.data.datas.concat(t.list)), e.setData({
                datas: t.list
            }), e.data.total <= 0 ? e.setData({
                notgoods: !1
            }) : e.setData({
                notgoods: !0
            });
        });
    },
    onReachBottom: function(t) {
        this.setData({
            page: this.data.page + 1,
            load: !1
        }), this.get_list(!0), this.setData({
            load: !0
        });
    }
});