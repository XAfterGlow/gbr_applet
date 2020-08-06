var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        icons: t.requirejs("icons"),
        type: 0,
        isopen: !1,
        page: 1,
        loaded: !1,
        loading: !0,
        list: []
    },
    onLoad: function(a) {
        0 < a.type && this.setData({
            type: 1
        }), t.url(a), this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    getList: function() {
        var i = this;
        i.setData({
            loading: !0
        }), a.get("member/log/get_list", {
            type: i.data.type,
            page: i.data.page
        }, function(t) {
            var a = {
                loading: !1,
                total: t.total,
                show: !0
            };
            if (1 == i.data.page) {
                a.isopen = t.isopen;
                var e = "充值记录";
                1 == t.isopen && (e = t.moneytext + "明细"), wx.setNavigationBarTitle({
                    title: e
                });
            }
            t.list || (t.list = []), 0 < t.list.length && (a.page = i.data.page + 1, a.list = i.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), i.setData(a);
        });
    },
    myTab: function(t) {
        var e = a.pdata(t).type;
        this.setData({
            type: e,
            page: 1,
            list: [],
            loading: !0
        }), this.getList();
    }
});