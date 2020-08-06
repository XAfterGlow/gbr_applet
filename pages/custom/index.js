var t, a, e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"), d = i.requirejs("biz/diyform"), u = i.requirejs("biz/goodspicker"), r = (i.requirejs("foxui"), 
i.requirejs("jquery"));

Page((a = {
    data: (t = {
        imgUrls: [ "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg" ],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        clock: "",
        diypage: "true",
        route: "custom",
        icons: i.requirejs("icons"),
        shop: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        storeRecommand: [],
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        indicatorDotsHot: !1,
        autoplayHot: !0,
        intervalHot: 5e3,
        durationHOt: 1e3,
        circularHot: !0,
        hotimg: "/static/images/hotdot.jpg",
        notification: "/static/images/notification.png",
        saleout1: "/static/images/saleout-1.png",
        saleout2: "/static/images/saleout-2.png",
        saleout3: "/static/images/saleout-3.png",
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        specs: [],
        options: [],
        diyform: {},
        specsTitle: ""
    }, (0, e.default)(t, "total", 1), (0, e.default)(t, "active", ""), (0, e.default)(t, "slider", ""), 
    (0, e.default)(t, "tempname", ""), (0, e.default)(t, "buyType", ""), (0, e.default)(t, "areas", []), 
    (0, e.default)(t, "closeBtn", !1), (0, e.default)(t, "soundpic", !0), (0, e.default)(t, "modelShow", !1), 
    (0, e.default)(t, "limits", !0), (0, e.default)(t, "result", {}), (0, e.default)(t, "audios", {}), 
    (0, e.default)(t, "audiosObj", {}), (0, e.default)(t, "picture", {}), (0, e.default)(t, "result", {}), 
    (0, e.default)(t, "pageid", 0), t),
    onShow: function() {
        var e = this, t = wx.getSystemInfoSync(), a = e.data.pageid;
        s.get("diypage&id=" + a, {}, function(t) {
            var a = {
                loading: !1,
                diypage: t.diypage
            };
            e.setData(a);
        }), e.setData({
            screenWidth: t.windowWidth
        });
    },
    onLoad: function(t) {
        t = t || {};
        var u = this;
        u.pauseOther();
        var a = t.pageid;
        if (null == a) {
            var e = getCurrentPages(), n = e[e.length - 1].route.split("/");
            a = n[n.length - 1];
        }
        u.setData({
            pageid: a,
            imgUrl: i.globalData.approot
        });
        var d = decodeURIComponent(t.scene);
        if (!t.id && d) {
            var r = s.str2Obj(d);
            t.id = r.id, r.mid && (t.mid = r.mid);
        }
        setTimeout(function() {
            u.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3), i.url(t), o.get(this, a, function(t) {
            if (null != u.data.startadv && "" != u.data.startadv) {
                0 != u.data.startadv.status && "" != u.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"];
                    }
                });
                var a = u.data.startadv.params;
                if ("default" == a.style) {
                    var e = a.autoclose;
                    !function t(a) {
                        u.setData({
                            clock: e
                        }), e <= 0 ? u.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            e -= 1, t(a);
                        }, 1e3);
                    }(u);
                }
                if (1 == a.showtype) {
                    var s = 1e3 * a.showtime * 60, n = i.getCache("startadvtime"), o = +new Date(), d = !0;
                    u.setData({
                        adveradmin: !0
                    }), n && o - n < s && (d = !1), u.setData({
                        adveradmin: d
                    }), d && i.setCache("startadvtime", o);
                }
                u.data.startadv.status;
            }
        }), u.setData({
            cover: !0,
            showvideo: !1
        }), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth / 1.7;
                u.setData({
                    swiperheight: a
                });
            }
        });
    },
    getShop: function() {
        var a = this;
        s.get("shop/get_shopindex", {}, function(t) {
            n.wxParse("wxParseData", "html", t.copyright, a, "5"), a.setData({
                shop: t
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand();
    },
    getRecommand: function() {
        var e = this;
        "true" != e.data.diypage && s.get("shop/get_recommand", {
            page: e.data.page
        }, function(t) {
            var a = {
                loading: !1,
                total: t.total
            };
            e.setData({
                loading: !1,
                total: t.total,
                show: !0
            }), t.list || (t.list = []), 0 < t.list.length && (e.setData({
                storeRecommand: e.data.storeRecommand.concat(t.list),
                page: t.page + 1
            }), t.list.length < t.pagesize && (a.loaded = !0));
        });
    },
    imagesHeight: function(t) {
        var a = t.detail.width, e = t.detail.height, i = t.target.dataset.type, s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.data.result[i] = t.windowWidth / a * e, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                    result: s.data.result
                });
            }
        });
    },
    bindInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    t1: function(t) {
        o.fixedsearch(this, t);
    },
    startplay: function(t) {
        var a = t.target.dataset.cover;
        this.setData({
            cover: a,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("Video"), this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var a;
        a = "open" == t.target.dataset.type, this.setData({
            unpaid: a
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var a = this;
        s.get("shop/get_nopayorder", {}, function(t) {
            1 == t.hasinfo && a.setData({
                nopaygoods: t.goods,
                nopaygoodstotal: t.goodstotal,
                nopayorder: t.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var a = this;
        s.get("shop/get_hasnewcoupon", {}, function(t) {
            1 == t.hasnewcoupon && a.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var a = this;
        s.get("shop/get_cpinfos", {}, function(t) {
            1 == t.hascpinfos && a.setData({
                showcoupon: !0,
                cpinfos: t.cpinfos
            });
        });
    },
    adverclose: function() {
        this.setData({
            adveradmin: !1
        }), this.get_nopayorder();
    },
    indexChangebtn: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: a
        });
    }
}, (0, e.default)(a, "unpaidcolse", function(t) {
    var a;
    a = "open" == t.target.dataset.type, this.setData({
        unpaid: a
    });
}), (0, e.default)(a, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}), (0, e.default)(a, "selectPicker", function(a) {
    i.checkAuth();
    var e = this;
    wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userInfo"] && (u.selectpicker(a, e, "goodslist"), e.setData({
                cover: "",
                showvideo: !1
            }));
        }
    });
}), (0, e.default)(a, "specsTap", function(t) {
    u.specsTap(t, this);
}), (0, e.default)(a, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), (0, e.default)(a, "buyNow", function(t) {
    u.buyNow(t, this);
}), (0, e.default)(a, "getCart", function(t) {
    u.getCart(t, this);
}), (0, e.default)(a, "select", function() {
    u.select(this);
}), (0, e.default)(a, "inputNumber", function(t) {
    u.inputNumber(t, this);
}), (0, e.default)(a, "number", function(t) {
    u.number(t, this);
}), (0, e.default)(a, "onChange", function(t) {
    return d.onChange(this, t);
}), (0, e.default)(a, "DiyFormHandler", function(t) {
    return d.DiyFormHandler(this, t);
}), (0, e.default)(a, "selectArea", function(t) {
    return d.selectArea(this, t);
}), (0, e.default)(a, "bindChange", function(t) {
    return d.bindChange(this, t);
}), (0, e.default)(a, "onCancel", function(t) {
    return d.onCancel(this, t);
}), (0, e.default)(a, "onConfirm", function(t) {
    return d.onConfirm(this, t);
}), (0, e.default)(a, "getIndex", function(t, a) {
    return d.getIndex(t, a);
}), (0, e.default)(a, "changevoice", function() {
    this.data.sound ? this.setData({
        sound: !1,
        soundpic: !0
    }) : this.setData({
        sound: !0,
        soundpic: !1
    });
}), (0, e.default)(a, "phone", function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
        phoneNumber: t
    });
}), (0, e.default)(a, "cancelclick", function() {
    this.setData({
        modelShow: !1
    });
}), (0, e.default)(a, "confirmclick", function() {
    this.setData({
        modelShow: !1
    }), wx.openSetting({
        success: function(t) {}
    });
}), (0, e.default)(a, "navigate", function(t) {
    var a = t.currentTarget.dataset.url, e = t.currentTarget.dataset.phone, i = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl;
    a && wx.navigateTo({
        url: a,
        fail: function(t) {
            wx.switchTab({
                url: a
            });
        }
    }), e && wx.makePhoneCall({
        phoneNumber: e
    }), i && wx.navigateToMiniProgram({
        appId: i,
        path: s
    });
}), (0, e.default)(a, "closecoupon", function() {
    this.setData({
        showcoupon: !1
    });
}), (0, e.default)(a, "closecoupontips", function() {
    this.setData({
        showcoupontips: !1
    });
}), (0, e.default)(a, "onReady", function(t) {}), (0, e.default)(a, "pauseOther", function(i) {
    var s = this;
    r.each(this.data.audiosObj, function(t, a) {
        if (t != i) {
            a.pause();
            var e = s.data.audios;
            e[t] && (e[t].status = !1, s.setData({
                audios: e
            }));
        }
    });
}), (0, e.default)(a, "play", function(t) {
    var d = t.target.dataset.id, u = this.data.audiosObj[d] || !1;
    if (!u) {
        u = wx.createInnerAudioContext("audio_" + d);
        var a = this.data.audiosObj;
        a[d] = u, this.setData({
            audiosObj: a
        });
    }
    var r = this;
    u.onPlay(function() {
        var o = setInterval(function() {
            var t = u.currentTime / u.duration * 100 + "%", a = Math.floor(Math.ceil(u.currentTime) / 60), e = (Math.ceil(u.currentTime) % 60 / 100).toFixed(2).slice(-2), i = Math.ceil(u.currentTime);
            a < 10 && (a = "0" + a);
            var s = a + ":" + e, n = r.data.audios;
            n[d].audiowidth = t, n[d].Time = o, n[d].audiotime = s, n[d].seconds = i, r.setData({
                audios: n
            });
        }, 1e3);
    });
    var e = t.currentTarget.dataset.audio, i = t.currentTarget.dataset.time, s = t.currentTarget.dataset.pausestop, n = t.currentTarget.dataset.loopplay;
    0 == n && u.onEnded(function(t) {
        o[d].status = !1, r.setData({
            audios: o
        });
    });
    var o = r.data.audios;
    o[d] || (o[d] = {}), u.paused && 0 == i ? (u.src = e, u.play(), 1 == n && (u.loop = !0), 
    o[d].status = !0, r.pauseOther(d)) : u.paused && 0 < i ? (u.play(), 0 == s ? u.seek(i) : u.seek(0), 
    o[d].status = !0, r.pauseOther(d)) : (u.pause(), o[d].status = !1), r.setData({
        audios: o
    });
}), (0, e.default)(a, "imagesHeight", function(t) {
    var a = t.detail.width, e = t.detail.height, i = t.target.dataset.type, s = this;
    wx.getSystemInfo({
        success: function(t) {
            s.data.result[i] = t.windowWidth / a * e, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                result: s.data.result
            });
        }
    });
}), (0, e.default)(a, "onHide", function() {
    this.pauseOther();
}), (0, e.default)(a, "onUnload", function() {
    this.pauseOther();
}), (0, e.default)(a, "onPullDownRefresh", function() {}), (0, e.default)(a, "onReachBottom", function() {}), 
(0, e.default)(a, "onShareAppMessage", function() {
    return {
        title: this.data.diypages.page.title
    };
}), (0, e.default)(a, "tabtopmenu", function(t) {
    var n = this, a = n.data.diypages, e = (a.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url), o = t.currentTarget.dataset.type, d = n.data.topmenu, i = t.currentTarget.dataset.index;
    if (c = n.data.pageid, n.setData({
        topmenuindex: i
    }), "" != e && null != e) {
        if (1 == e.indexOf("pages")) {
            var u = e.lastIndexOf("="), c = e.substring(u + 1, e.length);
            s.get("diypage", {
                id: c
            }, function(t) {
                if (0 == t.error) {
                    var a = [];
                    for (var e in t.diypage.items) a.push(t.diypage.items[e]);
                    a.unshift(d);
                    var i = new Object();
                    for (var s in a) i[s] = a[s], "topmenu" == a[s].id && (a[s].status = o);
                    t.diypage.items = i, n.setData({
                        diypages: t.diypage,
                        topmenuDataType: ""
                    });
                }
            });
        } else s.get("diypage/getInfo", {
            dataurl: e
        }, function(i) {
            n.data.topmenu, s.get("diypage", {
                type: c
            }, function(t) {
                var a = t.diypage;
                r.each(a.items, function(t, a) {
                    if ("topmenu" == a.id) for (var e in a.status = o, a.data) e == o && (a.data[e].data = i.goods.list, 
                    i.goods.list.length <= 8 && (a.data[e].showmore = !0));
                }), 0 == t.error && n.setData({
                    diypages: t.diypage,
                    topmenuDataType: i.type
                });
            });
        });
        n.setData({
            diypages: a
        });
    }
}), (0, e.default)(a, "tabwidget", function(t) {
    var e = this, i = e.data.diypages, n = (i.items, t.currentTarget.dataset.id), a = t.currentTarget.dataset.url, o = t.currentTarget.dataset.type;
    "" != a && null != a && s.get("diypage/getInfo", {
        dataurl: a
    }, function(t) {
        for (var a in i.items) a == n && (i.items[a].data[o].data = t.goods.list, i.items[a].data[o].type = t.type, 
        i.items[a].type = t.type, i.items[a].status = o, t.goods.list.length <= 8 && (i.items[a].data[o].showmore = !0), 
        e.setData({
            diypages: i
        }));
    });
}), (0, e.default)(a, "getstoremore", function(t) {
    var o = this, d = t.currentTarget.dataset.id, u = o.data.diypages;
    r.each(u.items, function(t, a) {
        if (t == d) if (null == a.status || "" == a.status) {
            if (-1 != a.data[0].linkurl.indexOf("stores")) var e = "stores"; else e = "goods";
            var i = a.data[0].linkurl, n = a.data[0].data.length;
            s.get("diypage/getInfo", {
                dataurl: i,
                num: n,
                paramsType: e
            }, function(t) {
                a.data[0].data = t.goods.list, a.data[0].data.length == t.goods.count && (a.data[0].showmore = !0), 
                o.setData({
                    diypages: u
                });
            });
        } else e = -1 != a.data[a.status].linkurl.indexOf("stores") ? "stores" : "goods", 
        i = a.data[a.status].linkurl, n = a.data[a.status].data.length, s.get("diypage/getInfo", {
            dataurl: i,
            num: n,
            paramsType: e
        }, function(t) {
            a.data[a.status].data = t.goods.list, a.data[a.status].data.length == t.goods.count && (a.data[a.status].showmore = !0), 
            o.setData({
                diypages: u
            });
        });
    });
}), a));