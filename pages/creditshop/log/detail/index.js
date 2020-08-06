var e = require("../../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../../@babel/runtime/helpers/defineProperty")), t = getApp(), o = t.requirejs("core"), s = (t.requirejs("icons"), 
t.requirejs("foxui"));

t.requirejs("wxParse/wxParse"), t.requirejs("jquery"), Page({
    data: {
        options: [],
        log: [],
        logid: 0,
        store: [],
        stores: [],
        goods: [],
        verifynum: 0,
        replyset: [],
        ordercredit: 0,
        ordermoney: 0,
        address: [],
        carrier: [],
        shop: [],
        allmoney: [],
        togglestore: "",
        togglecode: "",
        verify: [],
        iswechat: !0,
        paymentmodal: !1
    },
    onLoad: function(e) {
        var t = this;
        e = e || {}, wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight
                });
            }
        }), t.setData({
            options: e,
            logid: e.id
        });
    },
    onReady: function() {},
    onShow: function() {
        var o = this;
        t.getCache("isIpx") ? o.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : o.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), o.getDetail(), wx.getSetting({
            success: function(e) {
                var t = e.authSetting["scope.userInfo"];
                o.setData({
                    limits: t
                });
            }
        });
    },
    getDetail: function() {
        var n = this, d = n.data.options;
        o.get("creditshop/log/detail", d, function(t) {
            if (0 == t.error) {
                var s, a = parseFloat(t.ordermoney) + parseFloat(t.log.dispatch);
                a = a.toFixed(2);
                var i = parseFloat(t.ordermoney);
                i = i.toFixed(2), n.setData((s = {
                    log: t.log,
                    store: t.store,
                    stores: t.stores,
                    goods: t.goods,
                    verifynum: t.verifynum
                }, (0, e.default)(s, "log", t.log), (0, e.default)(s, "replyset", t.set), (0, e.default)(s, "ordercredit", t.ordercredit), 
                (0, e.default)(s, "ordermoney", i), (0, e.default)(s, "address", t.address), (0, 
                e.default)(s, "carrier", t.carrier), (0, e.default)(s, "shop", t.shop), (0, e.default)(s, "allmoney", a), 
                (0, e.default)(s, "verify", t.verify), (0, e.default)(s, "credittext", t.sysset.texts.credit), 
                s));
                var r = 0;
                0 == t.goods.isverify && 0 < t.address.lenght && o.get("creditshop/dispatch", {
                    goodsid: t.goods.id,
                    optionid: d.id
                }, function(e) {
                    r = e.dispatch, n.setData({
                        dispatchprice: r
                    });
                }), r = parseFloat(r) + parseFloat(t.goods.money), n.setData({
                    allprice: r
                });
            }
        });
    },
    toggle: function(e) {
        "" == this.data.togglestore ? this.setData({
            togglestore: "toggleSend-group"
        }) : this.setData({
            togglestore: ""
        });
    },
    togglecode: function(e) {
        "" == this.data.togglecode ? this.setData({
            togglecode: "toggleSend-group"
        }) : this.setData({
            togglecode: ""
        });
    },
    finish: function() {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "确认已收到货了吗？",
            success: function(e) {
                if (e.confirm) {
                    var t = a.data.log.id;
                    o.get("creditshop/log/finish", {
                        id: t
                    }, function(e) {
                        0 == e.error ? (s.toast(a, "确认收货"), a.onShow()) : s.toast(a, e.message);
                    });
                }
            }
        });
    },
    paydispatch: function(e) {
        var t, a = this;
        t = "dispatch" == e.currentTarget.dataset.paytype ? "确认兑换并支付运费吗" : "确认兑换吗", wx.showModal({
            title: "提示",
            content: t,
            success: function(e) {
                if (e.confirm) {
                    var t = a.data.log.id, s = a.data.goods.dispatch;
                    o.get("creditshop/log/paydispatch", {
                        id: t,
                        addressid: a.data.address.id,
                        dispatchprice: s
                    }, function(e) {
                        0 < e.error ? fui.toast(a, e.message) : e.wechat && e.wechat.success && o.pay(e.wechat.payinfo, function(e) {
                            "requestPayment:ok" == e.errMsg && a.payResult();
                        });
                    });
                }
            }
        });
    },
    payResult: function() {
        var t = this;
        o.get("creditshop/log/paydispatchresult", {
            id: t.data.log.id
        }, function(e) {
            0 < e.error ? fui.toast(t, e.message) : t.onShow();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});