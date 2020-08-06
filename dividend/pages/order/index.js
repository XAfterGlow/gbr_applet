var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    goIndex: function() {
        wx.navigateTo({
            url: "/pages/quickbuy/index"
        });
    },
    onLoad: function() {
        this.getlist({
            page: 1
        });
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.status, e = {
            page: 1,
            status: "all" == a ? "" : a
        };
        this.setData({
            status: a,
            list: []
        }), this.getlist(e);
    },
    onReachBottom: function() {
        var t = {
            page: this.data.page,
            status: this.data.status
        };
        this.getlist(t);
    },
    getlist: function(e) {
        var i = this;
        i.setData({
            loading: !0
        }), a.get("dividend/order", e, function(t) {
            if (0 == t.error) {
                if (0 < t.list.length) {
                    var a = i.data.list.concat(t.list);
                    e.page = e.page + 1;
                }
                wx.setNavigationBarTitle({
                    title: t.textdividend + "订单" || "分红订单"
                }), i.setData({
                    member: t.member,
                    list: a,
                    loading: !1,
                    total: t.total,
                    page: e.page,
                    stop: !1,
                    ordercount: t.ordercount,
                    textyuan: t.textyuan,
                    textdividend: t.textdividend
                });
            }
        });
    }
});