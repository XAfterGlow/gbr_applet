var t = getApp().requirejs("core");

Page({
    data: {
        status: 0,
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
        var s = this;
        t.get("commission/log/get_list", {
            page: s.data.page,
            status: s.data.status
        }, function(t) {
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                commissioncount: t.commissioncount,
                textyuan: t.textyuan,
                textcomm: t.textcomm,
                textcomd: t.textcomd,
                show: !0
            };
            0 < t.list.length && (a.page = s.data.page + 1, a.list = s.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), s.setData(a), wx.setNavigationBarTitle({
                title: t.textcomd + "(" + t.total + ")"
            });
        }, this.data.show);
    },
    myTab: function(a) {
        var s = t.pdata(a).status;
        this.setData({
            status: s,
            page: 1,
            list: []
        }), this.getList();
    }
});