var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        cates: [],
        cateid: 0,
        page: 1,
        loading: !1,
        loaded: !1,
        list: [],
        approot: t.globalData.approot
    },
    onLoad: function(t) {
        t.cateid && this.setData({
            cateid: t.cateid
        }), this.getCate(), this.getList();
    },
    getCate: function() {
        var e = this;
        a.get("sale/coupon/getCouponCate", {}, function(t) {
            0 < t.list.length && e.setData({
                cates: t.list
            });
        });
    },
    getList: function() {
        var i = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("sale/coupon/getlist", {
            page: this.data.page,
            cateid: this.data.cateid
        }, function(t) {
            var e = {
                loading: !1,
                total: t.total,
                pagesize: t.pagesize
            };
            0 < t.list.length && (e.page = i.data.page + 1, e.list = i.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0), i.setSpeed(t.list)), i.setData(e), 
            a.hideLoading();
        });
    },
    setSpeed: function(t) {
        if (t && !(t.length < 1)) for (var a in t) {
            var e = t[a];
            if (!isNaN(e.lastratio)) {
                var i = e.lastratio / 100 * 2.5, s = wx.createContext();
                s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), 
                s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(), 
                s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"), 
                s.setLineWidth(4), s.setLineCap("round"), s.stroke();
                var o = "coupon-" + e.id;
                wx.drawCanvas({
                    canvasId: o,
                    actions: s.getActions()
                });
            }
        }
    },
    bindTab: function(t) {
        var e = a.pdata(t).cateid;
        this.setData({
            cateid: e,
            page: 1,
            list: []
        }), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    jump: function(t) {
        var e = a.pdata(t).id;
        0 < e && wx.navigateTo({
            url: "/pages/sale/coupon/detail/index?id=" + e
        });
    }
});