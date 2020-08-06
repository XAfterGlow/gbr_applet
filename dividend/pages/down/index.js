var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        loading: !1
    },
    onLoad: function() {
        this.getlist();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loading || this.data.list.length == this.data.total || this.getlist();
    },
    getlist: function() {
        var o = this;
        o.setData({
            loading: !0
        }), console.error(o.data.loading), a.get("dividend/down", {
            page: o.data.page
        }, function(t) {
            console.error(t);
            var a = {
                total: t.total,
                pagesize: t.pagesize
            };
            if (0 == t.error) {
                if (0 < t.list.length) {
                    a.page = o.data.page + 1;
                    var e = o.data.list.concat(t.list);
                }
                o.setData({
                    member: t.member,
                    list: e,
                    loading: !1,
                    total: t.total,
                    page: a.page,
                    stop: !1
                });
            }
        });
    }
});