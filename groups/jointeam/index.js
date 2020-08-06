var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery"), t.requirejs("foxui"), Page({
    data: {
        goods_id: 0,
        option_id: 0,
        ladder_id: 0
    },
    onLoad: function(t) {
        var i = this, d = t.id, e = t.ladder_id;
        this.setData({
            goods_id: t.id,
            option_id: t.option_id,
            ladder_id: t.ladder_id
        }), a.get("groups.goods.fight_groups", {
            id: d,
            ladder_id: e
        }, function(t) {
            1 != t.error ? (i.setData({
                data: t.data,
                other: t.other
            }), setInterval(function() {
                var t = i.data.other;
                for (var a in t) {
                    var d = t[a].residualtime, e = 0, o = 0;
                    60 < d && (o = parseInt(d / 60), d = parseInt(d % 60), 60 < o && (e = parseInt(o / 60), 
                    o = parseInt(o / 60))), d < 0 && (d = o = e = 0, i.data.other[a].status = "hide", 
                    i.data.other = []), i.data.other[a].hours = e, i.data.other[a].minite = o, i.data.other[a].second = d, 
                    i.data.other[a].residualtime = i.data.other[a].residualtime - 1;
                }
                i.setData({
                    other: t
                });
            }, 1e3)) : a.alert(t.message);
        });
    },
    join: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    do_: function(t) {
        var d = this, e = t.target.dataset.teamid;
        a.get("groups/order/create_order", {
            id: d.data.goods_id,
            group_option_id: d.data.option_id,
            ladder_id: d.data.ladder_id,
            type: "groups",
            heads: 0,
            teamid: e
        }, function(t) {
            1 != t.error ? wx.navigateTo({
                url: "../confirm/index?id=" + d.data.goods_id + "&heads=0&type=groups&option_id=" + d.data.option_id + "&teamid=" + e + "&ladder_id=" + d.data.ladder_id
            }) : a.alert(t.message);
        });
    }
});