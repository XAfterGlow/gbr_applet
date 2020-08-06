var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("jquery");

Page({
    data: {
        route: "cart",
        icons: t.requirejs("icons"),
        merch_list: !1,
        cnxh:!1,
        list: !1,
        page: 1,
        show:!1,
    params: {},
    page: 1,
    canload: !0,
    loading: !0,
        edit_list: [],
        can_sync_goodscircle: !1,
        modelShow: !1,
        noramalData:[],
        noramalDatas: [{
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
            "CoverHeight": 447,
            "CoverWidth": 350,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"老藤佳酿",
            "tip":"缺",
            "price":"458.98"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 671,
            "CoverWidth": 672,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"小众精品",
            "tip":"多",
            "price":"458.98"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
            "CoverHeight": 487,
            "CoverWidth": 350,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"入门臻选",
            "tip":"缺",
            "price":"458.98"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 771,
            "CoverWidth": 672,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"原厂原装原标",
            "tip":"多",
            "price":"458.98"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
            "CoverHeight": 427,
            "CoverWidth": 350,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"食疗更安心，呵护胃健康",
            "tip":"多",
            "price":"458.98"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 671,
            "CoverWidth": 672,
            "title":"超级疯抢-HunterLAB光耀植萃魔法精华油",
            "bq":"新品",
            "tip":"缺",
            "price":"458.98"
          }
        ],
      
        leftList: [],
        rightList: [],
        leftHight: 0,
        rightHight: 0
    },
    onLoad: function(i) {
        var a = this;
        var allData = a.data.noramalData;
        //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
        var leftH = a.data.leftHight;
        var rightH = a.data.rightHight;
        var leftData = [];
        var rightData = [];
        for (let i = 0; i < allData.length; i++) {
          var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
          allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
          if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
            leftData.push(allData[i]);
            leftH += currentItemHeight;
          } else {
            rightData.push(allData[i]);
            rightH += currentItemHeight;
          }
        }
      
        //更新左右两栏的数据以及累计高度
        a.setData({
          leftHight: leftH,
          rightHight: rightH,
          leftList: leftData,
          rightList: rightData
        })
        e.get("black", {}, function(t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    t.confirm && a.close(), t.cancel && a.close();
                }
            });
        }), t.url(i);

    },
    onShow: function() {
        this.getList()
        t.scanCarts(), this.get_cart();
        var i = this;
        i.setData({
            imgUrl: t.globalData.approot
        }), wx.getSetting({
            success: function(t) {
                var e = t.authSetting["scope.userInfo"];
                i.setData({
                    limits: e
                });
            }
        });
    },
    get_cart: function() {
        var i, a = this;
        e.get("member/cart/get_cart", {}, function(e) {
            t.scanCarts(), i = {
                show: !0,
                ismerch: !1,
                ischeckall: e.ischeckall,
                can_sync_goodscircle: e.can_sync_goodscircle,
                total: e.total,
                cartcount: e.total,
                totalprice: e.totalprice,
                empty: e.empty || !1,
                sysset: e.sysset
            }, void 0 === e.merch_list ? i.list = e.list || [] : (i.merch_list = e.merch_list || [], 
            i.ismerch = !0), a.setData(i);
        });
    },
    edit: function(t) {
        if ((o = this).data.limits) {
            var s, c = e.data(t), o = this;
            switch (c.action) {
              case "edit":
                this.setData({
                    edit: !0
                });
                break;

              case "complete":
                this.allgoods(!1), this.setData({
                    edit: !1
                });
                break;

              case "move":
                s = this.checked_allgoods().data, i.isEmptyObject(s) || e.post("member/cart/tofavorite", {
                    ids: s
                }, function(t) {
                    o.get_cart();
                });
                break;

              case "delete":
                s = this.checked_allgoods().data, i.isEmptyObject(s) || e.confirm("是否确认删除该商品?", function() {
                    e.post("member/cart/remove", {
                        ids: s
                    }, function(t) {
                        o.get_cart();
                    });
                });
                break;

              case "pay":
                0 < this.data.total && e.get("member/cart/submit", {}, function(t) {
                    if (0 != t.error) return a.toast(o, t.message), void o.get_cart();
                    wx.navigateTo({
                        url: "/pages/order/create/index"
                    });
                });
            }
        }
    },
    checkall: function(t) {
        e.loading();
        var i = this, a = this.data.ischeckall ? 0 : 1;
        e.post("member/cart/select", {
            id: "all",
            select: a
        }, function(t) {
            i.get_cart(), e.hideLoading();
        });
    },
    update: function(t) {
        var i = this, a = this.data.ischeckall ? 0 : 1;
        e.post("member/cart/select", {
            id: "all",
            select: a
        }, function(t) {
            i.get_cart();
        });
    },
    number: function(t) {
        var i = this, s = e.pdata(t), c = a.number(this, t), o = s.id, r = s.optionid;
        1 == c && 1 == s.value && "minus" == t.target.dataset.action || s.value == s.max && "plus" == t.target.dataset.action || e.post("member/cart/update", {
            id: o,
            optionid: r,
            total: c
        }, function(t) {
            i.get_cart();
        });
    },
    selected: function(t) {
        e.loading();
        var i = this, a = e.pdata(t), s = a.id, c = 1 == a.select ? 0 : 1;
        e.post("member/cart/select", {
            id: s,
            select: c
        }, function(t) {
            i.get_cart(), e.hideLoading();
        });
    },
    allgoods: function(t) {
        var e = this.data.edit_list;
        if (!i.isEmptyObject(e) && void 0 === t) return e;
        if (t = void 0 !== t && t, this.data.ismerch) for (var a in this.data.merch_list) for (var s in this.data.merch_list[a].list) e[this.data.merch_list[a].list[s].id] = t; else for (var a in this.data.list) e[this.data.list[a].id] = t;
        return e;
    },
    checked_allgoods: function() {
        var t = this.allgoods(), e = [], i = 0;
        for (var a in t) t[a] && (e.push(a), i++);
        return {
            data: e,
            cartcount: i
        };
    },
    editcheckall: function(t) {
        var i = e.pdata(t).check, a = this.allgoods(!i);
        this.setData({
            edit_list: a,
            editcheckall: !i
        }), this.editischecked();
    },
    editischecked: function() {
        var t = !1, e = !0, i = this.allgoods();
        for (var a in this.data.edit_list) if (this.data.edit_list[a]) {
            t = !0;
            break;
        }
        for (var s in i) if (!i[s]) {
            e = !1;
            break;
        }
        this.setData({
            editischecked: t,
            editcheckall: e
        });
    },
    edit_list: function(t) {
        var i = e.pdata(t), a = this.data.edit_list;
        void 0 !== a[i.id] && 1 == a[i.id] ? a[i.id] = !1 : a[i.id] = !0, this.setData({
            edit_list: a
        }), this.editischecked();
    },
    url: function(t) {
        var i = e.pdata(t);
        wx.navigateTo({
            url: i.url
        });
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    close: function() {
        t.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    getList: function() {
        var th = this;
        th.setData({
            loading: !0
        }), this.data.canload = !1, th.data.params.page = 1, e.get("goods/get_list", th.data.params, function(t) {
            
            var e = {
                loading: !1,
                count: t.total,
                show: !0
            };
            t.list || (t.list = []), 0 < t.list.length && (e.page = th.data.page + 1, e.noramalData = th.data.noramalData.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), th.setData(e), th.data.canload = !0;

            console.log('111',th.data.noramalData,'22', e.noramalData);
        });
    },
});