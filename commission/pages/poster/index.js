var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), s = 0, i = 0, o = 0, r = "";

Page({
    data: {
        full: !1,
        scrollleft: "",
        margin: "",
        showloading: !0,
        accredit: "",
        index: 0,
        errMsg: "",
        check: "/static/images/check.png",
        posterArr: []
    },
    onLoad: function() {
        var s = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = t.screenWidth, a = t.windowHeight;
                s.setData({
                    posterwidth: e,
                    windowHeight: a,
                    index: 0
                });
            }
        }), e.json("commission/poster", {}, function(t) {
            if (0 == t.error) s.setData({
                posterArr: t.poster || [],
                posterboxwidth: s.data.posterwidth * t.poster.length
            }), s.getImage(0); else {
                if (7e4 == t.error) return void wx.redirectTo({
                    url: "../register/index"
                });
                if (70001 == t.error) return void wx.redirectTo({
                    url: "/pages/member/info/index"
                });
                a.toast(s, t.message);
            }
        });
    },
    onshow: function() {
        this.setData({
            index: 0
        });
    },
    savePicture: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? (wx.showLoading({
                    title: "图片下载中..."
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), wx.downloadFile({
                    url: e.data.posterArr[e.data.index].poster,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                a.toast(e, "保存图片成功");
                            },
                            fail: function(t) {
                                e.setData({
                                    errMsg: t.errMsg
                                }), a.toast(e, "保存图片失败");
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权，将无法正常使用保存图片或视频的功能体验，请删除小程序重新进入。"
                        });
                    }
                });
            }
        });
    },
    getImage: function(t) {
        var e = this.data.posterArr, a = this;
        setTimeout(function() {
            if (1 == a.data.full) {
                if (e[t].poster) return;
                a.requestImg(t);
            } else {
                if (e[t].thumb) return;
                a.requestImg(t);
            }
        }, 10);
    },
    requestImg: function(s) {
        var i = this.data.posterArr, o = this;
        o.setData({
            showloading: !0
        }), e.json("commission/poster/getimage", {
            id: i[s].id
        }, function(t) {
            0 == t.error ? (i[s].thumb = t.thumb, i[s].poster = t.poster, o.setData({
                posterArr: i
            })) : a.toast(o, "保存图片失败");
        });
    },
    touchStart: function(t) {
        s = t.touches[0].pageX, i = t.touches[0].pageY, r = setInterval(function() {
            o++;
        }, 1e3);
    },
    touchMove: function(t) {
        var e = t.touches[0].pageX, a = t.touches[0].pageY;
        this.setData({
            moveY: a,
            touchMove: e
        }), e - s <= -60 && o < 10 && this.setData({
            diff: e - s,
            touchMove: e
        }), 60 <= e - s && o < 10 && this.setData({
            diff: e - s
        });
    },
    touchEnd: function(t) {
        var e = this.data.index, a = Math.abs(this.data.moveY - i), n = Math.abs(this.data.touchMove - s) - a;
        clearInterval(r), o = 0, 40 < this.data.diff && 0 < n ? 0 == e ? e = 0 : e-- : this.data.diff < -40 && 0 < n && (e == this.data.posterArr.length - 1 ? e = this.data.posterArr.length - 1 : e++);
        var h = e * this.data.posterwidth;
        this.setData({
            left: h,
            diff: 0,
            index: e
        }), this.getImage(e);
    },
    pre: function() {
        var t = this.data.index;
        0 == t ? t = 0 : t--;
        var e = t * this.data.posterwidth;
        this.setData({
            left: e,
            index: t
        }), this.getImage(t);
    },
    next: function() {
        var t = this.data.index;
        t == this.data.posterArr.length - 1 ? t = this.data.posterArr.length - 1 : t++;
        var e = t * this.data.posterwidth;
        this.setData({
            left: e,
            index: t
        }), this.getImage(t);
    },
    loadImg: function(t) {
        var a = this.data.posterArr, s = t.detail.height, i = e.pdata(t).index;
        e.pdata(t).poster ? a[i].posterLoaded = !0 : a[i].thumbLoaded = !0, this.setData({
            lgimgheight: s,
            showloading: !1,
            posterArr: a
        });
    },
    enlarge: function() {
        this.setData({
            full: !0
        }), this.getImage(this.data.index);
    },
    ensmall: function() {
        this.setData({
            full: !1
        }), this.getImage(this.data.index);
    }
});