var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));

Page({
    data: {
        route: "category",
        category: {},
        icons: t.requirejs("icons"),
        selector: 0,
        advimg: "",
        advurl: "",
        recommands: {},
        level: 0,
        back: 0,
        child: {},
        parent: {}
    },
    tabCategory: function(t) {
        this.setData({
            selector: t.target.dataset.id,
            advimg: t.target.dataset.src,
            advurl: t.target.dataset.url,
            child: t.target.dataset.child,
            back: 0
        }), a.isEmptyObject(t.target.dataset.child) ? this.setData({
            level: 0
        }) : this.setData({
            level: 1
        });
    },
    cateChild: function(t) {
        this.setData({
            parent: t.currentTarget.dataset.parent,
            child: t.currentTarget.dataset.child,
            back: 1
        });
    },
    backParent: function(t) {
        this.setData({
            child: t.currentTarget.dataset.parent,
            back: 0
        });
    },
    getCategory: function() {
        var a = this;
        e.get("shop/get_category", {}, function(t) {
            a.setData({
                category: t.category,
                show: !0,
                set: t.set,
                advimg: t.set.advimg,
                recommands: t.recommands,
                child: t.recommands
            });
        });
    },
    onShow: function() {},
    onLoad: function(e) {
        t.url(e), this.getCategory();
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});