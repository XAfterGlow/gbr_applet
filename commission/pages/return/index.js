var t = getApp().requirejs("core");

Page({
    data: {
        type: 0,
        page: 1,
        list: []
    },
    onLoad: function() {
        this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var e = this;
        t.get("member.fullback.get_list", {
            page: e.data.page,
            type: e.data.type
        }, function(t) {
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                list: t.list,
                show: !0
            };
            0 < t.list.length && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }), t.get("member.fullback.get_all", {}, function(t) {
            !1 !== t.info.day ? e.setData({
                info: t.info
            }) : e.setData({
                info: !1
            });
        });
    },
    myTab: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            type: a,
            page: 1,
            list: []
        }), this.getList();
    }
});