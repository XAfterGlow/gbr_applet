var t, a, e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"), r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), u = (i.requirejs("foxui"), 
i.requirejs("jquery"));

Page((a = {
    onPullDownRefresh: function() {
        var e = this;
        o.get(this, "home", function(t) {
            e.getDiypage(t), 0 == t.error && wx.stopPullDownRefresh();
        });
    },
    data: (t = {
       
        imgUrls: [ "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg" ],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        mid:'',
        current: 0,
        clock: "",
        diypage: "true",
        route: "home",
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
    (0, e.default)(t, "closeBtn", !1), (0, e.default)(t, "soundpic", !1), (0, e.default)(t, "sound", !0), 
    (0, e.default)(t, "modelShow", !1), (0, e.default)(t, "limits", !0), (0, e.default)(t, "result", {}), 
    (0, e.default)(t, "showcoupon", !1), (0, e.default)(t, "showcoupontips", !1), (0, 
    e.default)(t, "topmenu", {}), (0, e.default)(t, "topmenuDataType", ""), (0, e.default)(t, "tabbarData", {}), 
    (0, e.default)(t, "tabbarDataType", ""), (0, e.default)(t, "istopmenu", !1), (0, 
    e.default)(t, "seckillinfo", {}), (0, e.default)(t, "timer", 0), (0, e.default)(t, "lasttime", 0), 
    (0, e.default)(t, "hour", "-"), (0, e.default)(t, "min", "-"), (0, e.default)(t, "sec", "-"), 
    t),
    getShop: function() {
        var e = this;
        s.get("shop/get_shopindex", {}, function(t) {
            n.wxParse("wxParseData", "html", t.copyright, e, "5"), e.setData({
                shop: t
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand();
    },
    getRecommand: function() {
        var a = this;
        "true" != a.data.diypage && s.get("shop/get_recommand", {
            page: a.data.page
        }, function(t) {
            var e = {
                loading: !1,
                total: t.total
            };
            a.setData({
                loading: !1,
                total: t.total,
                show: !0
            }), t.list || (t.list = []), 0 < t.list.length && (a.setData({
                storeRecommand: a.data.storeRecommand.concat(t.list),
                page: t.page + 1
            }), t.list.length < t.pagesize && (e.loaded = !0));
        });
    },
    onLoad: function(t) {
        console.log(t);
        if(t.mid){
           var n=t.mid;
            console.log("n2:",n);
            i.setCache("mids", n)
        }
        wx.hideTabBar({}), t = t || {};
        var a = this;
        a.setData({
            imgUrl: i.globalData.approot
        }), s.get("black", {}, function(t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    t.confirm && a.close(), t.cancel && a.close();
                }
            });
        });
        var e = decodeURIComponent(t.scene);
        if (!t.id && e) {
            var n = s.str2Obj(e);
            t.id = n.id, n.mid && (t.mid = n.mid, i.setCache("usermid", n));
            console.log("n1:",n.mid);
        }else{
            var n = s.str2Obj(e);
            i.setCache("usermid", n)
            console.log("n:",n);
        }
        
        setTimeout(function() {
            a.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3), i.url(t), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? a.diypageGet() : s.get("wxAppSetting", {}, function(t) {
                    t.sysset.force_auth, a.diypageGet();
                });
            }
        }), a.setData({
            cover: !0,
            showvideo: !1
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth / 1.8;
                a.setData({
                    swiperheight: e+10
                });
            }
        });
    },
    diypageGet: function() {
        var d = this;
        o.get(this, "home", function(t) {
            if (console.log(t), wx.showTabBar({}), d.getDiypage(t), null != d.data.startadv && "" != d.data.startadv) {
                0 != d.data.startadv.status && "" != d.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && d.get_nopayorder();
                    }
                });
                var e = d.data.startadv.params;
                if ("default" == e.style) {
                    var a = e.autoclose;
                    !function t(e) {
                        d.setData({
                            clock: a
                        }), a <= 0 ? d.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            a -= 1, t(e);
                        }, 1e3);
                    }(d);
                }
                if (1 == e.showtype) {
                    var s = 1e3 * e.showtime * 60, n = i.getCache("startadvtime"), o = +new Date(), r = !0;
                    d.setData({
                        adveradmin: !0
                    }), n && o - n < s && (r = !1), d.setData({
                        adveradmin: r
                    }), r && i.setCache("startadvtime", o);
                }
                d.data.startadv.status;
            }
        });
    },
    onHide: function() {
        this.setData({
            adveradmin: !1,
            unpaid: !1
        });
    },
    onShow: function() {
        var a = this, t = wx.getSystemInfoSync(), e = i.getCache("sysset");
    
        a.getShop(), a.getRecommand(), a.get_hasnewcoupon(), a.get_cpinfos(), wx.getSetting({
            success: function(t) {
                var e = t.authSetting["scope.userInfo"];
                a.setData({
                    limits: e
                });
               
                
            }
        });
        var s = e.shopname || "商城首页";

        a.data.pages && "" != a.data.pages.title && (s = a.data.diytitle), wx.setNavigationBarTitle({
            title: s
        }), a.data.pages && wx.setNavigationBarColor({
            frontColor: a.data.pages.titlebarcolor,
            backgroundColor: a.data.pages.titlebarbg
        }), a.setData({
            screenWidth: t.windowWidth
        });
        console.log("diypages数据",a.data.diypage);
        
    },
    goodsicon: function(t) {
        this.setData({
            iconheight: t.detail.height,
            iconwidth: t.detail.width
        });
    },
    getDiypage: function(t) {
        var n = this;
        u.each(t.diypage.items, function(t, e) {
            if ("topmenu" == e.id) if (n.setData({
                topmenu: e
            }), null == e.data[0]) var a = ""; else a = e.data[0].linkurl, s.get("diypage/getInfo", {
                dataurl: a
            }, function(t) {
                e.data[0].data = t.goods.list;
            });
            if ("seckillgroup" == e.id) {
                var i = {};
                i.status = e.data.status, i.endtime = e.data.endtime, i.starttime = e.data.starttime, 
                n.initSeckill(i);
            }
        });
    },
    nato:function(v){
        // console.log(v.currentTarget.dataset.url)
        let urls=v.currentTarget.dataset.url
        // console.log(urls.indexOf('room_id'));
        var nw=i.getCache('umids')
        if(urls.indexOf('room_id')>=0){
            wx.navigateTo({
                url: urls+'&custom_params='+ nw,
                fail: function() {
                    wx.switchTab({
                        url: urls+'&custom_params='+ nw
                    });
                }
            });
        }else{
            wx.navigateTo({
                url: urls,
                fail: function() {
                    wx.switchTab({
                        url: urls
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {
        var t = null, e = null;
        return this.data.diytitle && (t = "/pages/index/index", e = this.data.diytitle), 
        s.onShareAppMessage(t, e);
    },
    imagesHeight: function(t) {
        var e = t.detail.width, a = t.detail.height, i = t.target.dataset.type, s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.data.result[i] = t.windowWidth / e * a, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
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
        var e = t.target.dataset.cover;
        this.setData({
            cover: e,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("Video"), this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var e;
        e = "open" == t.target.dataset.type, this.setData({
            unpaid: e
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var e = this;
        s.get("shop/get_nopayorder", {}, function(t) {
            1 == t.hasinfo && e.setData({
                nopaygoods: t.goods,
                nopaygoodstotal: t.goodstotal,
                nopayorder: t.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var e = this;
        s.get("shop/get_hasnewcoupon", {}, function(t) {
            1 == t.hasnewcoupon && e.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var e = this;
        s.get("shop/get_cpinfos", {}, function(t) {
            1 == t.hascpinfos && e.setData({
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
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        });
    }
}, (0, e.default)(a, "unpaidcolse", function(t) {
    var e;
    e = "open" == t.target.dataset.type, this.setData({
        unpaid: e
    });
}), (0, e.default)(a, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}), (0, e.default)(a, "selectPicker", function(e) {
    i.checkAuth();
    var a = this;
    wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userInfo"] && (d.selectpicker(e, a, "goodslist"), a.setData({
                cover: "",
                showvideo: !1
            }));
        }
    });
}), (0, e.default)(a, "chooseGift", function(t) {
    d.chooseGift(t, this);
}), (0, e.default)(a, "specsTap", function(t) {
    d.specsTap(t, this);
}), (0, e.default)(a, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), (0, e.default)(a, "buyNow", function(t) {
    d.buyNow(t, this);
}), (0, e.default)(a, "getCart", function(t) {
    d.getCart(t, this);
}), (0, e.default)(a, "select", function() {
    d.select(this);
}), (0, e.default)(a, "inputNumber", function(t) {
    d.inputNumber(t, this);
}), (0, e.default)(a, "number", function(t) {
    d.number(t, this);
}), (0, e.default)(a, "onChange", function(t) {
    return r.onChange(this, t);
}), (0, e.default)(a, "DiyFormHandler", function(t) {
    return r.DiyFormHandler(this, t);
}), (0, e.default)(a, "selectArea", function(t) {
    return r.selectArea(this, t);
}), (0, e.default)(a, "bindChange", function(t) {
    return r.bindChange(this, t);
}), (0, e.default)(a, "onCancel", function(t) {
    return r.onCancel(this, t);
}), (0, e.default)(a, "onConfirm", function(t) {
    return r.onConfirm(this, t);
}), (0, e.default)(a, "getIndex", function(t, e) {
    return r.getIndex(t, e);
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
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, i = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
        url: e,
        fail: function() {
            wx.switchTab({
                url: e
            });
        }
    }), a && wx.makePhoneCall({
        phoneNumber: a
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
}), (0, e.default)(a, "tabtopmenu", function(t) {
    var n = this, e = n.data.diypages, a = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url), o = t.currentTarget.dataset.type, r = n.data.topmenu, i = t.currentTarget.dataset.index;
    if (n.setData({
        topmenuindex: i
    }), "m0" == t.currentTarget.id && "" == a && s.get("diypage", {
        type: "home"
    }, function(t) {
        var e = t.diypage;
        u.each(e.items, function(t, e) {
            "topmenu" == e.id && (e.status = o);
        }), 0 == t.error && n.setData({
            diypages: t.diypage
        });
    }), "" != a && null != a) {
        if (1 == a.indexOf("pages")) {
            var d = a.lastIndexOf("="), c = a.substring(d + 1, a.length);
            s.get("diypage", {
                id: c
            }, function(t) {
                if (0 == t.error) {
                    var e = [];
                    for (var a in t.diypage.items) e.push(t.diypage.items[a]);
                    e.unshift(r);
                    var i = new Object();
                    for (var s in e) i[s] = e[s], "topmenu" == e[s].id && (e[s].status = o);
                    t.diypage.items = i, n.setData({
                        diypages: t.diypage,
                        topmenuDataType: ""
                    });
                }
            });
        } else s.get("diypage/getInfo", {
            dataurl: a
        }, function(i) {
            n.data.topmenu, s.get("diypage", {
                type: "home"
            }, function(t) {
                var e = t.diypage;
                u.each(e.items, function(t, e) {
                    if ("topmenu" == e.id) for (var a in e.status = o, e.data) a == o && (e.data[a].data = i.goods.list, 
                    i.goods.list.length <= 8 && (e.data[a].showmore = !0));
                }), 0 == t.error && n.setData({
                    diypages: t.diypage,
                    topmenuDataType: i.type
                });
            });
        });
        n.setData({
            diypages: e
        });
    }
}), (0, e.default)(a, "tabwidget", function(t) {
    var a = this, i = a.data.diypages, n = (i.items, t.currentTarget.dataset.id), e = t.currentTarget.dataset.url, o = t.currentTarget.dataset.type;
    "" != e && null != e && s.get("diypage/getInfo", {
        dataurl: e
    }, function(t) {
        for (var e in i.items) e == n && (i.items[e].data[o].data = t.goods.list, i.items[e].data[o].type = t.type, 
        i.items[e].type = t.type, i.items[e].status = o, t.goods.list.length <= 8 && (i.items[e].data[o].showmore = !0), 
        a.setData({
            diypages: i
        }));
    });
}), (0, e.default)(a, "getstoremore", function(t) {
    var o = this, r = t.currentTarget.dataset.id, d = o.data.diypages;
    u.each(d.items, function(t, e) {
        if (t == r) if (null == e.status || "" == e.status) {
            if (-1 != e.data[0].linkurl.indexOf("stores")) var a = "stores"; else a = "goods";
            var i = e.data[0].linkurl, n = e.data[0].data.length;
            s.get("diypage/getInfo", {
                dataurl: i,
                num: n,
                paramsType: a
            }, function(t) {
                e.data[0].data = t.goods.list, e.data[0].data.length == t.goods.count && (e.data[0].showmore = !0), 
                o.setData({
                    diypages: d
                });
            });
        } else a = -1 != e.data[e.status].linkurl.indexOf("stores") ? "stores" : "goods", 
        i = e.data[e.status].linkurl, n = e.data[e.status].data.length, s.get("diypage/getInfo", {
            dataurl: i,
            num: n,
            paramsType: a
        }, function(t) {
            e.data[e.status].data = t.goods.list, e.data[e.status].data.length == t.goods.count && (e.data[e.status].showmore = !0), 
            o.setData({
                diypages: d
            });
        });
    });
}), (0, e.default)(a, "close", function() {
    i.globalData.flag = !0, wx.reLaunch({
        url: "../index/index"
    });
}), (0, e.default)(a, "initSeckill", function(a) {
    var s = this, n = parseInt(a.status), o = a.starttime, r = a.endtime;
    if (-1 != n) {
        var d = 0, u = 0, t = i.globalData.approot;
        wx.request({
            url: t + "timer.php",
            success: function(t) {
                var e = t.data;
                d = 0 == n ? r - e : o - e, s.setData({
                    lasttime: d
                }), clearInterval(s.data.timer), s.setTimer(a), u = s.setTimerInterval(a), s.setData({
                    timer: u
                });
            }
        });
    }
}), (0, e.default)(a, "setTimer", function(a) {
    var s = this, n = 0;
    if (-1 != a.status && parseInt(s.data.lasttime) % 10 == 0) {
        var t = i.globalData.approot;
        wx.request({
            url: t + "timer.php",
            success: function(t) {
                var e = t.data;
                n = 0 == a.status ? a.endtime - e : a.starttime - e, s.setData({
                    lasttime: n
                });
            }
        });
    }
    n = parseInt(s.data.lasttime) - 1;
    var e = s.formatSeconds(n);
    s.setData({
        lasttime: n,
        hour: e.hour,
        min: e.min,
        sec: e.sec
    }), n <= 0 && s.onLoad();
}), (0, e.default)(a, "setTimerInterval", function(t) {
    var e = this;
    return setInterval(function() {
        e.setTimer(t);
    }, 1e3);
}), (0, e.default)(a, "formatSeconds", function(t) {
    var e = parseInt(t), a = 0, i = 0;
    return 60 < e && (a = parseInt(e / 60), e = parseInt(e % 60), 60 < a && (i = parseInt(a / 60), 
    a = parseInt(a % 60))), {
        hour: i < 10 ? "0" + i : i,
        min: a < 10 ? "0" + a : a,
        sec: e < 10 ? "0" + e : e
    };
}), (0, e.default)(a, "cutGoods", function(t) {
    var e = t.currentTarget.dataset.type, a = t.currentTarget.dataset.num, i = t.currentTarget.dataset.id, s = this.data.diypages;
    for (var n in s.items) if (n == i) {
        var o = s.items[n].current || 0;
        s.items[n].current = "advance" == e ? o < a - 1 ? o + 1 : 0 : 0 < o ? o - 1 : a - 1, 
        this.setData({
            diypages: s
        });
    }
}), a));