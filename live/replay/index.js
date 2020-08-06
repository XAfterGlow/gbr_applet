var t = getApp().requirejs("core");

Page({
    data: {
        id: "",
        list: [],
        media_url: "",
        autoplay: !1,
        currentIndex: 0,
        name: "",
        avatar: "",
        nickname: ""
    },
    onLoad: function(t) {
        this.setData({
            id: t.id,
            name: t.name,
            avatar: t.avatar,
            nickname: t.nickname
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getList: function() {
        var a = this;
        t.get("live/room/get_replay", {
            id: a.data.id
        }, function(t) {
            t.list[0].color = !0, a.setData({
                list: t.list,
                media_url: t.list[0].media_url
            });
        }, this.data.show);
    },
    showVideo: function(t) {
        var a = t.currentTarget.dataset.index, n = t.currentTarget.dataset.src;
        this.setData({
            media_url: n,
            autoplay: !0,
            currentIndex: a
        });
    },
    replayLoading: function() {
        console.log("视频加载中");
    }
});