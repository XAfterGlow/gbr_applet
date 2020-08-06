var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("biz/diyform"), n = t.requirejs("jquery");

Page({
    data: {
        icons: t.requirejs("icons"),
        member: {},
        diyform: {},
        postData: {},
        openbind: !1,
        index: 0,
        submit: !1,
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0
    },
    onLoad: function(e) {
        t.url(e);
        var a = this;
        setTimeout(function() {
            a.setData({
                areas: t.getCache("cacheset").areas
            });
        }, 1e3);
    },
    onShow: function() {
        this.getInfo();
    },
    getInfo: function() {
        var i = this;
        e.get("member/info", {}, function(t) {
            var e = t.member, a = {
                member: e,
                diyform: t.diyform,
                openbind: t.openbind,
                show: !0
            };
            0 == t.diyform.template_flag && (a.postData = {
                realname: e.realname,
                mobile: e.mobile,
                weixin: e.weixin,
                birthday: e.birthday,
                city: e.city
            }), i.setData(a);
        });
    },
    onChange: function(t) {
        var a = t.detail.value, i = e.pdata(t).type, r = this.data.postData;
        r[i] = n.trim(a), this.setData({
            postData: r
        });
    },
    DiyFormHandler: function(t) {
        return i.DiyFormHandler(this, t);
    },
    submit: function() {
        if (!this.data.submit) {
            var r = this, t = r.data, o = t.diyform;
            if (0 == o.template_flag) {
                if (!t.postData.realname) return void a.toast(r, "请填写姓名");
                if (!n.isMobile(t.postData.mobile) && !t.openbind) return void a.toast(r, "请填写正确手机号码");
            } else if (!i.verify(this, o)) return;
            r.setData({
                submit: !0
            });
            var s = {
                memberdata: t.postData
            };
            o.template_flag && (s.memberdata = o.f_data), e.post("member/info/submit", s, function(t) {
                0 == t.error ? (r.setData({
                    submit: !1
                }), a.toast(r, "提交成功"), setTimeout(function() {
                        if(t.url){
                            wx.setStorageSync('tourl', t.url)
                            wx.navigateTo({
                              url: "/pages/kuaiji/dianqian",
                            })
                        }
                    // wx.navigateBack();
                }, 500)) : a.toast(r, t.message);
            });
        }
    },
    selectArea: function(t) {
        return i.selectArea(this, t);
    },
    bindChange: function(t) {
        return i.bindChange(this, t);
    },
    onCancel: function(t) {
        return i.onCancel(this, t);
    },
    onConfirm: function(t) {
        if (this.data.diyform.template_flag) return i.onConfirm(this, t);
        var e = this.data.pval, a = this.data.areas, n = this.data.postData;
        n.city = a[e[0]].name + " " + a[e[0]].city[e[1]].name, this.setData({
            postData: n,
            showPicker: !1
        });
    },
    getIndex: function(t, e) {
        return i.getIndex(t, e);
    }
});