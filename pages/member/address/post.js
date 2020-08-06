require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../utils/address-parse"));

var e = getApp(), t = e.requirejs("core"), a = e.requirejs("foxui"), i = e.requirejs("jquery");

Page({
    data: {
        id: null,
        posting: !1,
        subtext: "保存地址",
        detail: {
            realname: "",
            mobile: "",
            areas: "",
            street: "",
            address: ""
        },
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1
    },
    onLoad: function(t) {
        t.params && this.setData({
            detail: JSON.parse(t.params)
        }), this.setData({
            id: Number(t.id)
        }), this.setData({
            areas: e.getCache("cacheset").areas,
            type: t.type
        }), e.url(t), this.getDetail(), t.id || wx.setNavigationBarTitle({
            title: "添加收货地址"
        });
    },
    getDetail: function() {
        var s = this, e = s.data.id;
        t.get("member/address/get_detail", {
            id: e
        }, function(e) {
            var t = {
                openstreet: e.openstreet,
                show: !0
            };
            if (i.isEmptyObject(e.detail)) s.data.detail && (console.log(s.data.detail), a = s.data.detail.province + " " + s.data.detail.city + " " + s.data.detail.area, 
            r = s.getIndex(a, s.data.areas), t.pval = r, t.pvalOld = r); else {
                wx.setNavigationBarTitle({
                    title: "编辑收货地址"
                });
                var a = e.detail.province + " " + e.detail.city + " " + e.detail.area, r = s.getIndex(a, s.data.areas);
                t.pval = r, t.pvalOld = r, t.detail = e.detail;
            }
            console.log(r), s.setData(t), e.openstreet && r && s.getStreet(s.data.areas, r);
        });
    },
    submit: function() {
        var r = this, s = r.data.detail;
        r.data.posting || ("" != s.realname && s.realname ? "" != s.mobile && s.mobile ? "" != s.city && s.city ? !(0 < r.data.street.length) || "" != s.street && s.street ? "" != s.address && s.address ? (console.log(s), 
        s.is_from_wx && r.onConfirm("is_from_wx"), console.log(s), s.datavalue ? /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(s.mobile) ? (s.id = r.data.id || "", 
        r.setData({
            posting: !0
        }), t.post("member/address/submit", s, function(i) {
            if (0 != i.error) return r.setData({
                posting: !1
            }), void a.toast(r, i.message);
            r.setData({
                subtext: "保存成功"
            }), t.toast("保存成功"), setTimeout(function() {
                s.id = i.addressid, console.log(r.data.type), console.log("member" == r.data.type), 
                "member" != r.data.type ? "quickaddress" == r.data.type ? (e.setCache("orderAddress", s, 30), 
                wx.navigateBack()) : wx.navigateTo({
                    url: "/pages/member/address/select"
                }) : wx.navigateBack();
            }, 1e3);
        })) : a.toast(r, "请填写正确联系电话") : a.toast(r, "地址数据出错，请重新选择")) : a.toast(r, "请填写详细地址") : a.toast(r, "请选择所在街道") : a.toast(r, "请选择所在地区") : a.toast(r, "请填写联系电话") : a.toast(r, "请填写收件人"));
    },
    onChange: function(e) {
        var t = this.data.detail, a = e.currentTarget.dataset.type, r = i.trim(e.detail.value);
        "street" == a && (t.streetdatavalue = this.data.street[r].code, r = this.data.street[r].name), 
        t[a] = r, this.setData({
            detail: t
        });
    },
    getStreet: function(e, a) {
        if (console.log(e, a), e && a) {
            var r = this;
            if (r.data.detail.province && r.data.detail.city && this.data.openstreet) {
                var i = e[a[0]].city[a[1]].code, s = e[a[0]].city[a[1]].area[a[2]].code;
                t.get("getstreet", {
                    city: i,
                    area: s
                }, function(e) {
                    var t = e.street, a = {
                        street: t
                    };
                    if (t && r.data.detail.streetdatavalue) for (var i in t) if (t[i].code == r.data.detail.streetdatavalue) {
                        a.streetIndex = i, r.setData({
                            "detail.street": t[i].name
                        });
                        break;
                    }
                    r.setData(a);
                });
            }
        }
    },
    selectArea: function(e) {
        var t = e.currentTarget.dataset.area, a = this.getIndex(t, this.data.areas);
        this.setData({
            pval: a,
            pvalOld: a,
            showPicker: !0
        });
    },
    bindChange: function(e) {
        var t = this.data.pvalOld, a = e.detail.value;
        t[0] != a[0] && (a[1] = 0), t[1] != a[1] && (a[2] = 0), this.setData({
            pval: a,
            pvalOld: a
        });
    },
    onCancel: function(e) {
        this.setData({
            showPicker: !1
        });
    },
    onConfirm: function(e) {
        var t = this.data.pval, a = this.data.areas, i = this.data.detail;
        i.province = a[t[0]].name, i.city = a[t[0]].city[t[1]].name, i.datavalue = a[t[0]].code + " " + a[t[0]].city[t[1]].code, 
        a[t[0]].city[t[1]].area && 0 < a[t[0]].city[t[1]].area.length ? (i.area = a[t[0]].city[t[1]].area[t[2]].name, 
        i.datavalue += " " + a[t[0]].city[t[1]].area[t[2]].code, this.getStreet(a, t)) : i.area = "", 
        "is_from_wx" != e && (i.street = ""), this.setData({
            detail: i,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(e, t) {
        if ("" == i.trim(e) || !i.isArray(t)) return [ 0, 0, 0 ];
        var a = e.split(" "), r = [ 0, 0, 0 ];
        for (var s in t) if (t[s].name == a[0]) {
            for (var d in r[0] = Number(s), t[s].city) if (t[s].city[d].name == a[1]) {
                for (var o in r[1] = Number(d), t[s].city[d].area) if (t[s].city[d].area[o].name == a[2]) {
                    r[2] = Number(o);
                    break;
                }
                break;
            }
            break;
        }
        return r;
    },
    chooseAddress: function() {
        this.data.can = !1, wx.chooseAddress({
            success: function(e) {
                var t = {
                    realname: e.userName,
                    mobile: e.telNumber,
                    address: e.detailInfo,
                    province: e.provinceName,
                    city: e.cityName,
                    area: e.countyName,
                    is_from_wx: 1
                };
                setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/member/address/post?type=quickaddress&params=" + JSON.stringify(t)
                    });
                }, 0);
            }
        });
    }
});