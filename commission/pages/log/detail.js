var t = getApp().requirejs("core");

Page({
    data: {
        page: 1,
        list: []
    },
    onLoad: function(t) {
        0 < t.id && this.setData({
            id: t.id
        }), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var e = this;
        t.get("commission/log/detail_list", {
            page: e.data.page,
            id: e.data.id
        }, function(t) {
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                show: !0,
                textyuan: t.textyuan,
                textcomm: t.textcomm
            };
            0 < t.list.length && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    }
});