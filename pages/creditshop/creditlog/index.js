var t = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/defineProperty")), e = getApp(), a = e.requirejs("core");

e.requirejs("jquery"), Page((0, t.default)({
    data: {
        page: 1,
        list: {},
        total: 0,
        load: !0,
        more: !0,
        notgoods: !0
    },
    onLoad: function(t) {
        this.get_list();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    get_list: function(e) {
        var o = this;
        a.post("creditshop/creditlog/getlist", {
            page: o.data.page
        }, function(t) {
            o.setData({
                credit: t.sysset.texts.credit
            }), o.setData({
                total: t.credit
            }), e && (t.list = o.data.list.concat(t.list)), o.setData({
                list: t.list
            }), 0 == t.total ? o.setData({
                notgoods: !1
            }) : o.setData({
                notgoods: !0
            }), t.pagesize >= t.next_page ? o.setData({
                more: !1
            }) : o.setData({
                more: !0
            });
        });
    }
}, "onReachBottom", function(t) {
    this.setData({
        page: this.data.page + 1,
        load: !1
    }), this.get_list(!0), this.setData({
        load: !0
    });
}));