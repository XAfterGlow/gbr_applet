var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        cate: "",
        loaded: !1,
        loading: !0
    },
    onLoad: function(t) {
        this.get_list();
    },
    get_list: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("verifygoods/get_list", {
            page: e.data.page,
            cate: e.data.cate
        }, function(t) {
            var a = {
                loading: !1,
                total: t.total,
                show: !0
            };
            t.list || (t.list = []), 0 < t.list.length && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        });
    },
    selected: function(t) {
        var a = t.currentTarget.dataset.cate;
        this.setData({
            cate: a,
            page: 1,
            list: [],
            loading: !0
        }), this.get_list();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    }
});