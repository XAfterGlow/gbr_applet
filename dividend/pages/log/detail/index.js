var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1,
        args: {
            id: ""
        }
    },
    onLoad: function(t) {
        var a = {
            id: t.id
        };
        this.setData({
            "args.id": t.id
        }), this.getlist(a);
    },
    onReachBottom: function() {
        this.data.page, this.data.status;
        var t = this.data.args;
        this.getlist(t);
    },
    getlist: function(s) {
        var i = this;
        i.setData({
            loading: !0
        }), a.get("dividend/log/orders", s, function(t) {
            if (console.error(t), 0 == t.error) {
                if (0 < t.list.length && i.data.list.length < t.total) {
                    var a = i.data.list.concat(t.list);
                    s.page = s.page + 1;
                }
                i.setData({
                    sysset: t.sysset,
                    set: t.set,
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