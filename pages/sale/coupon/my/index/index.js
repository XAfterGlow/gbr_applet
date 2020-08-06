var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        cate: "",
        page: 1,
        loading: !1,
        loaded: !1,
        list: [],
        approot: t.globalData.approot
    },
    onLoad: function(t) {
        this.getList();
    },
    myTab: function(t) {
        var e = a.pdata(t).cate;
        this.setData({
            cate: e,
            page: 1,
            list: []
        }), this.getList();
    },
    getList: function() {
        var i = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("sale/coupon/my/getlist", {
            page: this.data.page,
            cate: this.data.cate
        }, function(t) {
            var e = {
                loading: !1,
                total: t.total,
                pagesize: t.pagesize,
                closecenter: t.closecenter
            };
            0 < t.list.length && (e.page = i.data.page + 1, e.list = i.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), i.setData(e), a.hideLoading();
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    jump: function(t) {
        var e = a.pdata(t).id;
        0 < e && wx.navigateTo({
            url: "/pages/sale/coupon/my/detail/index?id=" + e
        });
    }
});