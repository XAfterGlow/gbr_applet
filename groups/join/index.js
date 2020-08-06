var t = getApp(), a = t.requirejs("core"), o = (t.requirejs("jquery"), t.requirejs("foxui"), 
0);

Page({
    data: {
        layershow: !1,
        chosenum: !1,
        options: !1,
        optionarr: [],
        selectSpecsarr: [],
        goods_id: 0
    },
    onLoad: function(t) {
        var o = this, e = t.id;
        this.setData({
            goods_id: e
        }), a.get("groups.goods.openGroups", {
            id: e
        }, function(a) {
            o.setData({
                data: a.data,
                teams: a.teams,
                ladder: a.ladder
            });
        });
    },
    joinTeam: function(s) {
        t.checkAuth();
        var i = this;
        wx.getSetting({
            success: function(t) {
                if (t.authSetting["scope.userInfo"]) {
                    var o = a.pdata(s).type, e = a.pdata(s).op;
                    if (i.setData({
                        optionarr: [],
                        selectSpecsarr: []
                    }), "creat" == e ? i.setData({
                        op: "creat"
                    }) : i.setData({
                        op: ""
                    }), "ladder" == o) {
                        var d = i.data.data.id;
                        a.get("groups.goods.goodsCheck", {
                            id: d,
                            type: "group"
                        }, function(a) {
                            0 == a.error ? i.setData({
                                layershow: !0,
                                chosenum: !0
                            }) : wx.showToast({
                                title: a.message,
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    } else 0 == i.data.data.more_spec ? (d = i.data.data.id, a.get("groups.goods.goodsCheck", {
                        id: d,
                        type: "group"
                    }, function(t) {
                        0 == t.error ? "creat" == e ? wx.navigateTo({
                            url: "../confirm/index?type=groups&id=" + d + "&heads=1"
                        }) : a.get("groups.goods.check_tuan", {
                            id: d,
                            type: "group"
                        }, function(t) {
                            t.data.order_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                                url: "../jointeam/index?id=" + d
                            });
                        }) : wx.showToast({
                            title: t.message,
                            icon: "none",
                            duration: 2e3
                        });
                    })) : (d = i.data.data.id, a.get("groups.goods.goodsCheck", {
                        id: d,
                        type: "group"
                    }, function(t) {
                        0 == t.error ? (a.get("groups.goods.get_spec", {
                            id: d
                        }, function(a) {
                            i.setData({
                                spec: a.data
                            });
                        }), i.setData({
                            layershow: !0,
                            options: !0
                        })) : wx.showToast({
                            title: t.message,
                            icon: "none",
                            duration: 2e3
                        });
                    }));
                }
            }
        });
    },
    chosenum: function(t) {
        var o = a.pdata(t).index, e = a.pdata(t).goodsid, d = a.pdata(t).id, s = a.pdata(t).price;
        this.setData({
            selectindex: o,
            id: e,
            ladder_id: d,
            ladder_price: s
        });
    },
    close: function() {
        this.setData({
            layershow: !1,
            chosenum: !1,
            options: !1
        });
    },
    ladder_buy: function() {
        var o = this;
        o.data.ladder_id ? ("creat" != this.data.op ? a.get("groups.goods.check_tuan", {
            id: o.data.goods_id,
            ladder_id: o.data.ladder_id
        }, function(t) {
            t.data.ladder_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                url: "../jointeam/index?id=" + o.data.goods_id + "&ladder_id=" + o.data.ladder_id,
                success: function() {
                    o.setData({
                        layershow: !1,
                        chosenum: !1,
                        options: !1
                    });
                }
            });
        }) : wx.navigateTo({
            url: "../confirm/index?id=" + o.data.goods_id + "&heads=1&type=groups&ladder_id=" + o.data.ladder_id,
            success: function() {
                o.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }), this.close()) : a.alert("请选择拼团人数");
    },
    specsTap: function(t) {
        o++;
        var e = this, d = e.data.spec, s = a.pdata(t).spedid, i = a.pdata(t).id, n = a.pdata(t).specindex;
        a.pdata(t).idx, d[n].item.forEach(function(a, t) {
            a.id == i ? d[n].item[t].status = "active" : d[n].item[t].status = "";
        }), e.setData({
            spec: d
        });
        var r = e.data.optionarr, c = e.data.selectSpecsarr;
        1 == o ? (r.push(i), c.push(s)) : -1 < c.indexOf(s) ? r.splice(n, 1, i) : (r.push(i), 
        c.push(s)), e.data.optionarr = r, e.data.selectSpecsarr = c, a.post("groups.goods.get_option", {
            spec_id: e.data.optionarr,
            groups_goods_id: e.data.goods_id
        }, function(a) {
            e.setData({
                optiondata: a.data
            });
        });
    },
    buy: function(t) {
        var o = this, e = a.pdata(t).op, d = o.data.goods_id, s = o.data.optiondata;
        o.data.optiondata ? "creat" == e ? 0 < s.stock ? wx.navigateTo({
            url: "../confirm/index?id=" + d + "&heads=1&type=groups&option_id=" + s.id,
            success: function() {
                o.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }) : 0 < s.stock ? a.get("groups.goods.check_tuan", {
            id: d,
            type: "group"
        }, function(t) {
            t.data.order_num <= 0 ? a.alert("暂无拼团") : wx.navigateTo({
                url: "../jointeam/index?id=" + d + "&option_id=" + s.id,
                success: function() {
                    o.setData({
                        layershow: !1,
                        chosenum: !1,
                        options: !1
                    });
                }
            });
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请选择规格",
            icon: "none",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});