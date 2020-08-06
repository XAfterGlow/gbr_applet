var t = getApp(), a = t.requirejs("core"), e = t.requirejs("foxui");

Page({
    data: {
        page: 1,
        cate: "all",
        list: []
    },
    onLoad: function(t) {
        this.setData({
            options: t,
            cate: t.cate || ""
        }), "true" == t.hasmembercard && this.setData({
            cate: "my"
        }), this.get_list();
    },
    tab: function(t) {
        this.setData({
            cate: t.currentTarget.dataset.cate,
            list: [],
            page: 1
        }), this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    get_list: function() {
        var e = this;
        e.setData({
            loading: !0
        }), a.get("membercard.getlist", {
            page: e.data.page,
            cate: e.data.cate
        }, function(t) {
            0 == t.error ? (e.setData({
                loading: !1,
                total: t.total,
                empty: !0,
                all_total: t.all_total,
                my_total: t.my_total
            }), 0 < t.list.length && e.setData({
                page: e.data.page + 1,
                list: e.data.list.concat(t.list)
            }), t.list.length > t.pagesize && e.setData({
                loaded: !0
            })) : a.toast(t.message, "loading");
        }, this.data.show);
    },
    submitt(t){
        var s = t.currentTarget.dataset,vip="/pages/goods/detail/index?id=340",
        svip="/pages/goods/detail/index?id=344",
        hvip="/pages/goods/detail/index?id=343", i = this;
        console.log(s);
        if(s.id=="VIP"){
            wx.navigateTo({url:vip})
        }
        if(s.id=="SVIP"){
            wx.navigateTo({url:svip})
        }
        if(s.id=="黑卡"){
            wx.navigateTo({url:hvip})
        }
        
    },
    submit: function(t) {
        var s = t.currentTarget.dataset, i = this;
        -1 != s.startbuy && ("0" != s.stock ? a.post("membercard.order.create_order", {
            id: s.id
        }, function(t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : e.toast(i, t.message);
        }) : e.toast(i, "库存不足"));
    }
});