var t = getApp().requirejs("core");

Page({
    data: {
        level: 1,
        page: 1,
        list: []
    },
    onLoad: function() {
        this.getSet(), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getSet: function() {
        var e = this;
        t.get("commission/down/get_set", {}, function(t) {
            wx.setNavigationBarTitle({
                title: t.textdown + "(" + t.total + ")"
            }), delete t.error, t.show = !0, e.setData(t);
        });
    },
    getList: function() {
        var a = this;
        t.get("commission/down/get_list", {
            page: a.data.page,
            level: a.data.level
        }, function(t) {
            var e = {
                total: t.total,
                pagesize: t.pagesize
            };
            0 < t.list.length && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), a.setData(e);
        }, this.data.show);
    },
    myTab: function(e) {
        var a = t.pdata(e).level;
        this.setData({
            level: a,
            page: 1,
            list: []
        }), this.getList();
    }
});