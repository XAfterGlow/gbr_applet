var t = getApp().requirejs("core");

Page({
    data: {
        status: "",
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
    toggleSend: function(t) {
        if (this.data.openorderdetail || this.data.openorderbuyer) {
            var a = t.currentTarget.dataset.index, e = this.data.list[a].code, s = this.data.list;
            s[a].code = 1 == e ? 0 : 1, this.setData({
                list: s
            });
        }
    },
    getList: function() {
        var e = this;
        t.get("commission/order/get_list", {
            page: e.data.page,
            status: e.data.status
        }, function(t) {
            delete t.error;
            var a = t;
            a.show = !0, 0 < t.list.length && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a), wx.setNavigationBarTitle({
                title: t.textorder
            });
        }, this.data.show);
    },
    myTab: function(a) {
        var e = t.pdata(a).status;
        this.setData({
            status: e,
            page: 1,
            list: []
        }), this.getList();
    }
});