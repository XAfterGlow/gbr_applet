var a = getApp(), t = a.requirejs("core");

a.requirejs("jquery"), Page({
    data: {
        swiperCurrent: 0,
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 800,
        circular: !0,
        imgUrls: [],
        links: [],
        params: {},
        lotterydraws: [],
        exchanges: [],
        coupons: [],
        balances: [],
        category: [],
        hidden: !1,
        keywords: ""
    },
    onLoad: function(a) {},
    doinput: function(a) {
        this.setData({
            keywords: a.detail.value
        });
    },
    search: function() {
        var a = "/pages/creditshop/lists/index?keywords=" + this.data.keywords;
        wx.navigateTo({
            url: a
        });
    },
    focus: function() {
        this.setData({
            showbtn: "in"
        });
    },
    onReady: function() {
        this.get_index();
    },
    changeTo: function(a) {
        var t = a.currentTarget.dataset.url + "?id=" + a.currentTarget.dataset.gid;
        wx.navigateTo({
            url: t
        });
    },
    get_index: function() {
        var e = this;
        t.post("creditshop/index", e.data.params, function(a) {
            if (0 == a.error) {
                e.setData({
                    category: a.data.category,
                    lotterydraws: a.data.lotterydraws,
                    exchanges: a.data.exchanges,
                    coupons: a.data.coupons,
                    balances: a.data.balances,
                    redbags: a.data.redbags,
                    sysset: a.sysset
                }), 0 !== a.data.advs.length ? e.setData({
                    imgUrls: a.data.advs,
                    shouadvs: !0
                }) : e.setData({
                    shouadvs: !1
                });
                var t = a.sysset.texts.credit + "商城首页";
                wx.setNavigationBarTitle({
                    title: t
                });
            }
            e.setData({
                hidden: !0
            });
        });
    }
});