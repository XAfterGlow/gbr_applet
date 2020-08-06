var t = getApp(), e = t.requirejs("core");

t.requirejs("jquery"), t.requirejs("biz/diyform"), t.requirejs("biz/goodspicker"), 
t.requirejs("foxui"), Page({
    data: {
        page: 1,
        list: [],
        defaults: {
            keywords: "",
            isrecommand: "",
            ishot: "",
            isnew: "",
            isdiscount: "",
            issendfree: "",
            istime: "",
            cate: "",
            order: "",
            by: "desc",
            merchid: 0
        }
    },
    onLoad: function(e) {
        t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            options: e
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: "",
            options: e
        }), this.data.options.id, this.getList();
    },
    getList: function() {
        var i = this;
        e.post("groups.list", {
            category: i.data.options.id,
            page: i.data.page
        }, function(t) {
            0 == t.error && (t.list.length <= 0 ? i.setData({
                res: t,
                empty: !0
            }) : i.setData({
                page: i.data.page + 1,
                res: t,
                list: i.data.list.concat(t.list),
                empty: !1
            }), t.list.length < t.pagesize && i.setData({
                loaded: !0
            }));
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.res.list.length == this.data.total || this.getList();
    },
    bindSearch: function(t) {
        var i = this, a = t.detail.value;
        e.get("groups.list", {
            keyword: a
        }, function(t) {
            t.list.length <= 0 ? i.setData({
                empty: !0
            }) : i.setData({
                empty: !1
            }), i.setData({
                list: t.list
            });
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {}
});