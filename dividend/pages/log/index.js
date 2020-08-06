var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1
    },
    onLoad: function() {
        this.getlist({
            page: 1,
            status: ""
        });
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.status, s = {
            page: 1,
            status: "all" == a ? "" : a
        };
        console.error(a), this.setData({
            status: a,
            list: []
        }), this.getlist(s);
    },
    onReachBottom: function() {
        var t = {
            page: this.data.page,
            status: this.data.status
        };
        this.getlist(t);
    },
    getlist: function(s) {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("dividend/log/get_list", s, function(t) {
            if (console.error(t), 0 == t.error) {
                if (0 < t.list.length) {
                    var a = e.data.list.concat(t.list);
                    s.page = s.page + 1;
                }
                e.setData({
                    dividendcount: t.dividendcount,
                    list: a,
                    loading: !1,
                    total: t.total,
                    page: s.page,
                    stop: !1
                });
            }
        });
    }
});