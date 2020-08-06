var e = getApp(), t = e.requirejs("/core"), a = e.requirejs("/foxui"), r = (e.requirejs("jquery"), 
e.requirejs("biz/diyform"));

Page({
    data: {
        checked: !1,
        diyform: {},
        msg: {},
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            imgUrl: e.globalData.approot
        }), setTimeout(function() {
            a.setData({
                areas: e.getCache("cacheset").areas
            });
        }, 1e3);
    },
    onShow: function() {
        this.getlist();
    },
    changeinput: function(e) {
        var t = e.detail.value, a = e.target.dataset.input, r = this.data.msg;
        r[a] = t, this.setData({
            msg: r
        });
    },
    selected: function(e) {
        var t = 1 != e.currentTarget.dataset.checked;
        this.setData({
            checked: t
        });
    },
    getlist: function() {
        var r = this;
        t.get("dividend/register", "", function(e) {
            1 == e.error && (console.error(e.message), a.toast(r, e.message), setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/index/index"
                });
            }, 1e3)), 82025 == e.error && wx.redirectTo({
                url: "../../../commission/pages/register/index"
            }), wx.setNavigationBarTitle({
                title: "申请" + e.set.texts.become || "申请成为队长"
            }), 0 == e.error && r.setData({
                message: e,
                diyform: {
                    f_data: e.f_data,
                    fields: e.fields
                }
            });
        });
    },
    opendeal: function() {
        this.setData({
            isdeal: !0
        });
    },
    close: function() {
        this.setData({
            isdeal: !1
        });
    },
    submit: function(e) {
        var i = this, s = i.data.msg, n = i.data.checked, o = e.currentTarget.dataset.open_protocol;
        if (n || 1 != o) {
            if (i.data.message.template_flag) {
                var d = this.data.diyform;
                if (!r.verify(this, d)) return;
                s = {
                    memberdata: this.data.diyform.f_data
                };
            } else {
                if (!s.realname) return void a.toast(i, "请输入姓名");
                if (!s.mobile) return void a.toast(i, "请输入手机号");
            }
            t.post("dividend/register", s, function(e) {
                0 == e.error ? i.getlist() : a.toast(i, e.message);
            });
        }
    },
    DiyFormHandler: function(e) {
        return r.DiyFormHandler(this, e);
    },
    selectArea: function(e) {
        return r.selectArea(this, e);
    },
    getIndex: function(e, t) {
        return r.getIndex(e, t);
    },
    onCancel: function(e) {
        return r.onCancel(this, e);
    },
    bindChange: function(e) {
        return r.bindChange(this, e);
    },
    onConfirm: function(e) {
        return r.onConfirm(this, e);
    }
});