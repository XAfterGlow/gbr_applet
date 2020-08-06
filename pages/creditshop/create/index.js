var t = getApp(), s = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("foxui"));

t.requirejs("wxParse/wxParse"), t.requirejs("jquery"), Page({
    data: {
        paymentmodal: !1,
        showmodal: !1,
        successmodal: !1,
        member: [],
        goods: [],
        options: [],
        carrierInfo: [],
        stores: [],
        is_openmerch: !1,
        isverify: !1,
        iswechat: !0,
        iscredit: !0,
        paytype: "",
        togglestore: "",
        addressid: 0,
        dispatchprice: 0,
        allprice: 0,
        logid: 0,
        successmessage: "",
        successstatus: !1,
        storeids: ""
    },
    onLoad: function(t) {
        var s = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), s.setData({
            options: t
        });
    },
    onShow: function() {
        var e = this, s = t.getCache("isIpx"), a = t.getCache("orderAddress"), o = t.getCache("orderShop");
        o && e.setData({
            carrierInfo: o
        }), e.data.addressid, 0 < a.id && (e.addressid = a.id, e.setData({
            addressid: a.id
        }), e.getDetail()), s ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), "" == e.data.member && e.getDetail(), wx.getSetting({
            success: function(t) {
                var s = t.authSetting["scope.userInfo"];
                e.setData({
                    limits: s
                });
            }
        });
    },
    listChange: function(t) {
        var s = this.data.member;
        switch (t.target.id) {
          case "realname":
            s.realname = t.detail.value;
            break;

          case "mobile":
            s.mobile = t.detail.value;
        }
        this.setData({
            member: s
        });
    },
    getDetail: function() {
        var e = this, t = e.data.options;
        s.get("creditshop/create", t, function(t) {
            0 == t.error && (t.goods.num = 1, e.setData({
                storeids: t.goods.storeids,
                goods: t.goods,
                address: t.address,
                shop: t.shop,
                stores: t.stores,
                isverify: t.goods.isverify,
                member: t.member,
                addressid: t.address.id,
                credittext: t.sysset.texts.credit
            }), 0 == t.goods.isverify && 0 == t.goods.type && 0 < t.address.id ? (s.get("creditshop/create/getaddress", {
                addressid: e.addressid
            }, function(t) {
                0 == t.error && e.setData({
                    address: t.address
                });
            }), e.dispatch()) : e.setData({
                allprice: t.goods.money
            }));
        });
    },
    dispatch: function() {
        var e = this;
        s.get("creditshop/create/dispatch", {
            goodsid: e.data.goods.id,
            optionid: e.data.options.optionid
        }, function(t) {
            var s = t.dispatch;
            s = parseFloat(s) + parseFloat(e.data.goods.money), e.setData({
                dispatchprice: t.dispatch,
                allprice: s
            });
        });
    },
    number: function(t) {
        var a = this, o = a.data.goods, i = a.data.options, d = t.target.dataset.action;
        "minus" == d ? o.num = parseInt(o.num) - 1 : "plus" == d && (o.num = parseInt(o.num) + 1), 
        o.num < 1 && (o.num = 1);
        var r = o.num;
        s.get("creditshop/create/number", {
            goodsid: o.id,
            optionid: i.id,
            num: r
        }, function(t) {
            if (0 == t.goods.canbuy) return 1 < o.num && (o.num = parseInt(o.num) - 1), a.setData({
                goods: o
            }), void e.toast(a, t.goods.buymsg);
            (o = t.goods).num = r;
            var s = parseFloat(o.money * r) + parseFloat(o.dispatch);
            a.setData({
                goods: o,
                allprice: s
            });
        });
    },
    pay: function() {
        var t = this.data.goods, s = t.money * t.num + parseFloat(t.dispatch);
        if (s = s.toFixed(2), t.canbuy) {
            if (0 < t.isverify) {
                var a = this.data.member;
                if ("" == a.realname) return void e.toast(this, "请填写真实姓名");
                if ("" == a.mobile) return void e.toast(this, "请填写联系电话");
                if (0 == this.data.carrierInfo.length) return void e.toast(this, "请选择兑换门店");
            }
            if (0 == t.isverify && 0 == t.goodstype && 0 == t.type) {
                var o = this.data.addressid;
                if (0 == o || null == o) return void e.toast(this, "请选择收货地址");
            }
            1 == t.type && this.setData({
                addressid: 0
            }), 0 == s ? this.setData({
                showmodal: !0
            }) : this.setData({
                paymentmodal: !0
            });
        } else e.toast(this, this.data.goods.buymsg);
    },
    cancel: function() {
        this.setData({
            paymentmodal: !1,
            showmodal: !1
        });
    },
    payClick: function(t) {
        var s = t.target.dataset.type;
        this.setData({
            paymentmodal: !1,
            showmodal: !0,
            paytype: s
        });
    },
    confirm: function() {
        var a = this, o = a.data.paytype;
        1 != a.data.clickYes && (a.data.clickYes = 1, s.get("creditshop/detail/pay", {
            id: a.data.goods.id,
            optionid: a.data.options.optionid,
            num: a.data.goods.num,
            paytype: a.data.paytype,
            addressid: a.data.addressid,
            storeid: a.data.carrierInfo.id
        }, function(t) {
            if (0 < t.error) return e.toast(a, t.message), void (a.data.clickYes = 0);
            a.setData({
                logid: t.logid
            }), t.wechat && t.wechat.success && s.pay(t.wechat.payinfo, function(t) {
                "requestPayment:ok" == t.errMsg && (a.lottery(), a.data.clickYes = 0);
            }), "credit" == o && 0 < t.logid && (a.lottery(), a.data.clickYes = 0), "" == o && 0 < t.logid && (a.lottery(), 
            a.data.clickYes = 0);
        }));
    },
    success: function() {
        var t = this.data.logid;
        wx.redirectTo({
            url: "/pages/creditshop/log/detail/index?id=" + t
        });
    },
    lottery: function() {
        var a = this, t = a.data.goods.type, o = "";
        0 == t ? s.get("creditshop/detail/lottery", {
            id: a.data.goods.id,
            logid: a.data.logid
        }, function(t) {
            0 < t.error ? e.toast(a, t.message) : (2 == t.status && (o = "恭喜您，商品兑换成功"), 3 == t.status && (1 == t.goodstype ? o = "恭喜您，优惠券兑换成功" : 2 == t.goodstype ? o = "恭喜您，余额兑换成功" : 3 == t.goodstype && (o = "恭喜您，红包兑换成功")), 
            a.setData({
                successmessage: o,
                successstatus: !0
            }));
        }) : (o = "努力抽奖中，请稍后....", a.setData({
            successmessage: o,
            successstatus: !0
        }), setTimeout(function() {
            s.get("creditshop/detail/lottery", {
                id: a.data.goods.id,
                logid: a.data.logid
            }, function(t) {
                0 < t.error ? e.toast(a, t.message) : (2 == t.status ? o = "恭喜您，您中奖啦" : 3 == t.status ? 1 == t.goodstype ? o = "恭喜您，优惠券已经发到您账户啦" : 2 == t.goodstype ? o = "恭喜您，余额已经发到您账户啦" : 3 == t.goodstype && (o = "恭喜您，红包兑换成功") : o = "很遗憾，您没有中奖", 
                a.setData({
                    successmessage: o,
                    successstatus: !0
                }));
            });
        }, 1e3)), a.setData({
            successmodal: !0
        });
    },
    toggle: function(t) {
        "" == this.data.togglestore ? this.setData({
            togglestore: "toggleSend-group"
        }) : this.setData({
            togglestore: ""
        });
    }
});