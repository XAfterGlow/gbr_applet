var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        page: 1,
        loaded: !1,
        loading: !1,
        list: []
    },
    getList: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("shop/notice/get_list", {
            page: this.data.page
        }, function(t) {
            e.setData({
                loading: !1,
                show: !0
            }), 0 < t.list.length ? e.setData({
                page: e.data.page + 1,
                list: e.data.list.concat(t.list)
            }) : t.list.length < t.pagesize && e.setData({
                loaded: !0
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    onLoad: function(a) {
        t.url(a), this.getList();
    }
});