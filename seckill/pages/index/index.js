var t = getApp(), e = t.requirejs("/core"), a = t.requirejs("jquery");

Page({
    data: {
        audios: {},
        audiosObj: {},
        roomid: "0",
        timeindex: "0",
        taskid: "0",
        timeid: "0",
        timer: 0,
        goods: "",
        rooms: "",
        room_num: 0,
        times: "",
        time_num: 0,
        advs: "",
        adv_num: 0,
        list_error: 0,
        goods_error: 0,
        message: "",
        lasttime: 0,
        hour: "-",
        min: "-",
        sec: "-",
        diypages: "",
        seckill_style: "",
        seckill_color: "",
        color: {
            red: "#ff5555",
            blue: "#4e87ee",
            purple: "#a839fa",
            orange: "#ff8c1e",
            pink: "#ff7e95"
        },
        swiperheight: ""
    },
    onLoad: function() {
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                "0" == t.model.indexOf("iPhone X") && i.setData({
                    height: "168rpx"
                });
                var e = t.windowWidth / 1.7;
                i.setData({
                    swiperheight: e
                });
            }
        }), e.get("seckill/get_list", {}, function(s) {
            1 == s.error ? i.setData({
                list_error: 1,
                message: s.message
            }) : (null != s.diypages.items && a.each(s.diypages.items, function(t, e) {
                var a = {};
                "seckill_advs" == e.id && (a.adv_num = e.data.length), a.diypages = s.diypages, 
                i.setData(a);
            }), i.setData({
                rooms: s.rooms,
                room_num: s.rooms.length,
                times: s.times,
                time_num: s.times.length,
                timeindex: s.timeindex,
                roomid: s.roomid,
                taskid: s.taskid,
                timeid: s.timeid,
                seckill_style: s.seckill_style,
                seckill_color: s.seckill_color,
                background_color: s.diypages.background_color
            }), "style2" == s.seckill_style ? (wx.setNavigationBarColor({
                frontColor: s.diypages.titlebarcolor,
                backgroundColor: i.data.color[s.seckill_color]
            }), wx.setNavigationBarTitle({
                title: s.diypages.page_title
            })) : wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: "#ffffff"
            }), i.getGoods(s.timeid));
        });
    },
    selected: function(t) {
        var a = this;
        a.setData({
            roomid: t.currentTarget.dataset.id
        });
        var s = t.currentTarget.dataset.id;
        e.get("seckill/get_list", {
            roomid: s
        }, function(t) {
            1 == t.error ? a.setData({
                list_error: 1,
                message: t.message
            }) : a.setData({
                rooms: t.rooms,
                times: t.times,
                time_num: t.times.length,
                timeindex: t.timeindex
            }), a.getGoods(t.timeid);
        });
    },
    current: function(t) {
        this.getGoods(t.currentTarget.dataset.timeid), this.setData({
            timeindex: t.currentTarget.dataset.index
        });
    },
    getGoods: function(a) {
        var s = this;
        e.get("seckill/get_goods", {
            taskid: s.data.taskid,
            roomid: s.data.roomid,
            timeid: a
        }, function(t) {
            1 == t.error ? s.setData({
                goods_error: 1,
                message: t.message
            }) : (s.setData({
                goods_error: 0,
                goods: t.goods
            }), s.initTimer(a));
        });
    },
    initTimer: function(s) {
        var i = this, r = "";
        a.each(i.data.times, function(t, e) {
            e.id === s && (r = e);
        });
        var o = parseInt(r.status), n = r.starttime, d = r.endtime;
        if (clearInterval(i.data.timer), -1 != o) {
            var u = 0, l = 0, e = t.globalData.approot;
            wx.request({
                url: e + "map.json",
                success: function(t) {
                    var e = new Date(t.header.Date) / 1e3;
                    u = 0 == o ? d - e : n - e, i.setData({
                        lasttime: u
                    }), i.setTimer(r), l = i.setTimerInterval(r), i.setData({
                        timer: l
                    });
                }
            });
        }
    },
    formatSeconds: function(t) {
        var e = parseInt(t), a = 0, s = 0;
        return 60 < e && (a = parseInt(e / 60), e = parseInt(e % 60), 60 < a && (s = parseInt(a / 60), 
        a = parseInt(a % 60))), {
            hour: s < 10 ? "0" + s : s,
            min: a < 10 ? "0" + a : a,
            sec: e < 10 ? "0" + e : e
        };
    },
    setTimer: function(a) {
        var s = this, i = 0;
        if (-1 != a.status && parseInt(s.data.lasttime) % 10 == 0) {
            var e = t.globalData.approot;
            wx.request({
                url: e + "timer.php",
                success: function(t) {
                    var e = t.data;
                    console.log(t), i = 0 == a.status ? a.endtime - e : a.starttime - e, s.setData({
                        lasttime: i
                    });
                }
            });
        }
        i = parseInt(s.data.lasttime) - 1;
        var r = s.formatSeconds(i);
        s.setData({
            lasttime: i,
            hour: r.hour,
            min: r.min,
            sec: r.sec
        }), i <= 0 && s.onLoad();
    },
    setTimerInterval: function(t) {
        var e = this;
        return setInterval(function() {
            e.setTimer(t);
        }, 1e3);
    },
    play: function(t) {
        var n = t.target.dataset.id, d = this.data.audiosObj[n] || !1;
        if (!d) {
            d = wx.createInnerAudioContext("audio_" + n);
            var e = this.data.audiosObj;
            e[n] = d, this.setData({
                audiosObj: e
            });
        }
        var u = this;
        d.onPlay(function() {
            var o = setInterval(function() {
                var t = d.currentTime / d.duration * 100 + "%", e = Math.floor(Math.ceil(d.currentTime) / 60), a = (Math.ceil(d.currentTime) % 60 / 100).toFixed(2).slice(-2), s = Math.ceil(d.currentTime);
                e < 10 && (e = "0" + e);
                var i = e + ":" + a, r = u.data.audios;
                r[n].audiowidth = t, r[n].Time = o, r[n].audiotime = i, r[n].seconds = s, u.setData({
                    audios: r
                });
            }, 1e3);
        });
        var a = t.currentTarget.dataset.audio, s = t.currentTarget.dataset.time, i = t.currentTarget.dataset.pausestop, r = t.currentTarget.dataset.loopplay;
        0 == r && d.onEnded(function(t) {
            o[n].status = !1, u.setData({
                audios: o
            });
        });
        var o = u.data.audios;
        o[n] || (o[n] = {}), d.paused && 0 == s ? (d.src = a, d.play(), 1 == r && (d.loop = !0), 
        o[n].status = !0, u.pauseOther(n)) : d.paused && 0 < s ? (d.play(), 0 == i ? d.seek(s) : d.seek(0), 
        o[n].status = !0, u.pauseOther(n)) : (d.pause(), o[n].status = !1), u.setData({
            audios: o
        });
    },
    pauseOther: function(s) {
        var i = this;
        a.each(this.data.audiosObj, function(t, e) {
            if (t != s) {
                e.pause();
                var a = i.data.audios;
                a[t] && (a[t].status = !1, i.setData({
                    audios: a
                }));
            }
        });
    },
    navigate: function(t) {
        var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, s = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
        e && wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        }), a && wx.makePhoneCall({
            phoneNumber: a
        }), s && wx.navigateToMiniProgram({
            appId: s,
            path: i
        });
    },
    tabwidget: function(t) {
        var a = this, s = a.data.diypages, i = (s.items, t.currentTarget.dataset.id), r = t.currentTarget.dataset.url, o = t.currentTarget.dataset.type;
        "" != r && null != r && e.get("diypage/getInfo", {
            dataurl: r
        }, function(t) {
            for (var e in s.items) e == i && (s.items[e].data[o].data = t.goods.list, s.items[e].data[o].type = t.type, 
            s.items[e].type = t.type, s.items[e].status = o, t.goods.list.length <= 8 && (s.items[e].data[o].showmore = !0), 
            a.setData({
                diypages: s
            }));
        });
    }
});