var t, e, a = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/defineProperty")), i = getApp(), o = i.requirejs("core"), s = (i.requirejs("icons"), 
i.requirejs("foxui")), n = i.requirejs("biz/diypage"), r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = i.requirejs("jquery"), l = i.requirejs("wxParse/wxParse"), u = 0, g = i.requirejs("biz/selectdate");
let livePlayer = requirePlugin('live-player-plugin')
Page((e = {
    data: (t = {
        diypages: {},
        usediypage: !1,
        specs: [],
        options: [],
        icons: i.requirejs("icons"),
        goods: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        active: "",
        slider: "",
        tempname: "",
        info: "active",
        preselltimeend: "",
        presellsendstatrttime: "",
        advWidth: 0,
        dispatchpriceObj: 0,
        now: parseInt(Date.now() / 1e3),
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timer: 0,
        discountTitle: "",
        istime: 1,
        istimeTitle: "",
        istimeTitleEnd: "",
        isSelected: !1,
        params: {},
        total: 1,
        optionid: 0,
        audios: {},
        audiosObj: {},
        defaults: {
            id: 0,
            merchid: 0
        },
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        canBuy: "",
        diyform: {},
        showPicker: !1,
        showcoupon: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        commentObj: {},
        commentObjTab: 1,
        loading: !1,
        commentEmpty: !1,
        commentPage: 1,
        commentTotal: 1,
        commentLevel: "all",
        commentList: [],
        closeBtn: !1,
        soundpic: !0,
        animationData: {},
        uid: "",
        stararr: [ "all", "good", "normal", "bad", "pic" ],
        nav_mask: !1,
        nav_mask2: !1,
        nav: 0,
        giftid: "",
        limits: !0,
        modelShow: !1,
        showgoods: !0
    }, (0, a.default)(t, "timer", 0), (0, a.default)(t, "lasttime", 0), (0, a.default)(t, "hour", "-"), 
    (0, a.default)(t, "min", "-"), (0, a.default)(t, "sec", "-"), (0, a.default)(t, "currentDate", ""), 
    (0, a.default)(t, "dayList", ""), (0, a.default)(t, "currentDayList", ""), (0, a.default)(t, "currentObj", ""), 
    (0, a.default)(t, "currentDay", ""), (0, a.default)(t, "checkedDate", ""), (0, a.default)(t, "showDate", ""), 
    (0, a.default)(t, "scope", ""), (0, a.default)(t, "goods_hint_show", !1), (0, a.default)(t, "presellisstart", 0), 
    (0, a.default)(t, "advHeight", 1), (0, a.default)(t, "show_goods", !0), (0, a.default)(t, "goodscircle", {
        can_share_goodscircle: !1
    }), t),
    imageLoad: function(t) {
        var e = t.detail.height, a = t.detail.width, i = Math.floor(750 * e / a);
        e == a ? this.setData({
            advHeight: 750
        }) : this.setData({
            advHeight: i
        });
    },
    favorite: function(t) {
        i.checkAuth();
        var e = this;
        if (e.data.limits) {
            var a = t.currentTarget.dataset.isfavorite ? 0 : 1;
            o.get("member/favorite/toggle", {
                id: e.data.options.id,
                isfavorite: a
            }, function(t) {
                t.isfavorite ? e.setData({
                    "goods.isfavorite": 1
                }) : e.setData({
                    "goods.isfavorite": 0
                });
            });
        }
    },
    goodsTab: function(t) {
        var e = this, a = t.currentTarget.dataset.tap;
        if ("info" == a) this.setData({
            info: "active",
            para: "",
            comment: ""
        }); else if ("para" == a) this.setData({
            info: "",
            para: "active",
            comment: ""
        }); else if ("comment" == a) {
            if (e.setData({
                info: "",
                para: "",
                comment: "active"
            }), 0 < e.data.commentList.length) return void e.setData({
                loading: !1
            });
            e.setData({
                loading: !0
            }), o.get("goods/get_comment_list", {
                id: e.data.options.id,
                level: e.data.commentLevel,
                page: e.data.commentPage
            }, function(t) {
                0 < t.list.length ? e.setData({
                    loading: !1,
                    commentList: t.list,
                    commentTotal: t.total,
                    commentPage: t.page
                }) : e.setData({
                    loading: !1,
                    commentEmpty: !0
                });
            });
        }
    },
    onReachBottom: function() {
        var e = this;
        if (e.data.commentTotal <= 10) return !1;
        var t = e.data.commentObjTab, a = "";
        1 == t ? a = "all" : 2 == t ? a = "good" : 3 == t ? a = "normal" : 4 == t ? a = "bad" : 5 == t && (a = "pic"), 
        e.setData({
            loading: !0
        }), o.get("goods/get_comment_list", {
            id: e.data.options.id,
            level: a,
            page: e.data.commentPage
        }, function(t) {
            0 == t.error && (e.setData({
                loading: !1
            }), 0 < t.list.length && e.setData({
                commentPage: e.data.commentPage + 1,
                commentTotal: t.total,
                commentList: e.data.commentList.concat(t.list)
            }));
        });
    },
    comentTap: function(t) {
        var e = this, a = t.currentTarget.dataset.type, i = "";
        1 == a ? (i = "all", e.data.commentPage = 1) : 2 == a ? (e.data.commentPage = 1, 
        i = "good") : 3 == a ? (e.data.commentPage = 1, i = "normal") : 4 == a ? (e.data.commentPage = 1, 
        i = "bad") : 5 == a && (e.data.commentPage = 1, i = "pic"), a != e.data.commentObjTab && o.get("goods/get_comment_list", {
            id: e.data.options.id,
            level: i,
            page: e.data.commentPage
        }, function(t) {
            0 < t.list.length && e.setData({
                loading: !1,
                commentList: t.list,
                commentTotal: t.total,
                commentPage: t.page,
                commentObjTab: a,
                commentEmpty: !1
            });
        });
    },
    preview: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: t.currentTarget.dataset.urls
        });
    },
    getDetail: function(t) {
        var g = this, m = parseInt(Date.now() / 1e3);
        g.setData({
            loading: !0
        }), o.get("goods/get_detail", {
            id: t.id
        }, function(e) {
            if (0 != e.error) return g.setData({
                show: !0,
                showgoods: !1
            }), s.toast(g, e.message), void setTimeout(function() {
                wx.navigateBack();
            }, 1500);
            [ "marketprice", "productprice" ].forEach(function(t) {
                void 0 !== e.goods[t] && (e.goods[t] = parseFloat(e.goods[t]));
            });
            var t = e.goods.coupons, a = (e.goods.thumbMaxHeight, e.goods.thumbMaxWidth, e.goods.goodscircle);
            if (g.setData({
                coupon: t,
                coupon_l: t.length,
                packagegoods: e.goods.packagegoods,
                packagegoodsid: e.goods.packagegoods.goodsid || 0,
                credittext: e.goods.credittext,
                activity: e.goods.activity,
                bottomFixedImageUrls: e.goods.bottomFixedImageUrls,
                phonenumber: e.goods.phonenumber || "",
                showDate: e.goods.showDate || "",
                scope: e.goods.scope || "",
                show_goods: e.goods.show_goods,
                goodscircle: a
            }), e.goods.packagegoods && g.package(), l.wxParse("wxParseData", "html", e.goods.content, g, "0"), 
            l.wxParse("wxParseData_buycontent", "html", e.goods.buycontent, g, "0"), g.setData({
                show: !0,
                goods: e.goods,
                minprice: e.goods.minprice,
                maxprice: e.goods.maxprice,
                preselltimeend: e.goods.preselltimeend,
                style: e.goods.labelstyle.style || "",
                navbar: e.goods.navbar,
                labels: e.goods.labels
            }), e.goods.gifts && 1 == e.goods.gifts.length && g.setData({
                giftid: e.goods.gifts[0].id
            }), wx.setNavigationBarTitle({
                title: e.goods.title || "商品详情"
            }), u = e.goods.hasoption, c.isEmptyObject(e.goods.dispatchprice) || "string" == typeof e.goods.dispatchprice ? g.setData({
                dispatchpriceObj: 0
            }) : g.setData({
                dispatchpriceObj: 1
            }), 0 < e.goods.isdiscount && e.goods.isdiscount_time >= m) {
                clearInterval(g.data.timer);
                var i = setInterval(function() {
                    g.countDown(0, e.goods.isdiscount_time);
                }, 1e3);
                g.setData({
                    timer: i
                });
            }
            0 < e.goods.istime && (clearInterval(g.data.timer), i = setInterval(function() {
                g.countDown(e.goods.timestart, e.goods.timeend, "istime");
            }, 1e3), g.setData({
                timer: i,
                istimeTitle: e.sysset.trade
            })), 0 < e.goods.ispresell && (i = setInterval(function() {
                0 == e.goods.canbuy ? g.countDown(m, e.goods.preselltimestart, "istime") : 1 == e.goods.canbuy && g.countDown(m, e.goods.preselltimeend, "istime");
            }, 1e3), g.setData({
                timer: i,
                presellisstart: e.goods.presellisstart
            }), g.setData({
                preselltimeend: e.goods.preselltimeend || e.goods.preselltimeend.getMonth() + "月" + e.goods.preselltimeend || e.goods.preselltimeend.getDate() + "日 " + e.goods.preselltimeend || e.goods.preselltimeend.getHours() + ":" + e.goods.preselltimeend || e.goods.preselltimeend.getMinutes() + ":" + e.goods.preselltimeend || e.goods.preselltimeend.getSeconds(),
                presellsendstatrttime: e.goods.presellsendstatrttime || e.goods.presellsendstatrttime.getMonth() + "月" + e.goods.presellsendstatrttime || e.goods.presellsendstatrttime.getDate() + "日"
            })), 0 < e.goods.getComments && o.get("goods/get_comments", {
                id: g.data.options.id
            }, function(t) {
                g.setData({
                    commentObj: t
                });
            }), e.goods.fullbackgoods && g.setData({
                fullbackgoods: e.goods.fullbackgoods
            });
            var n = g.data.fullbackgoods;
            if (null != n) {
                var r = n.maxfullbackratio, d = n.maxallfullbackallratio;
                r = Math.round(r), d = Math.round(d), g.setData({
                    maxfullbackratio: r,
                    maxallfullbackallratio: d
                });
            }
            9 == e.goods.type && (g.setData({
                checkedDate: e.goods.nowDate
            }), g.show_cycelbuydate()), e.goods.seckillinfo && g.initSeckill(e.goods);
        });
    },
    initSeckill: function(a) {
        var o = this, s = parseInt(a.seckillinfo.status), n = a.seckillinfo.starttime, r = a.seckillinfo.endtime;
        if (-1 != s) {
            var d = 0, c = 0, t = i.globalData.approot;
            wx.request({
                url: t + "map.json",
                success: function(t) {
                    var e = new Date(t.header.Date) / 1e3;
                    d = 0 == s ? r - e : n - e, o.setData({
                        lasttime: d
                    }), clearInterval(o.data.timer), o.setTimer(a.seckillinfo), c = o.setTimerInterval(a.seckillinfo), 
                    o.setData({
                        timer: c
                    });
                }
            });
        }
    },
    setTimer: function(t) {
        var a = this, o = 0;
        if (-1 != t.status && parseInt(a.data.lasttime) % 10 == 0) {
            var s = parseInt(t.status), n = t.starttime, r = t.endtime;
            if (-1 != s) {
                var e = i.globalData.approot;
                wx.request({
                    url: e + "map.json",
                    success: function(t) {
                        var e = new Date(t.header.Date) / 1e3;
                        o = 0 == s ? r - e : n - e, a.setData({
                            lasttime: o
                        });
                    }
                });
            }
        }
        o = parseInt(a.data.lasttime) - 1;
        var d = a.formatSeconds(o);
        a.setData({
            lasttime: o,
            hour: d.hour,
            min: d.min,
            sec: d.sec
        }), o <= 0 && a.onLoad();
    },
    setTimerInterval: function(t) {
        var e = this;
        return setInterval(function() {
            e.setTimer(t);
        }, 1e3);
    },
    formatSeconds: function(t) {
        var e = parseInt(t), a = 0, i = 0;
        return 60 < e && (a = parseInt(e / 60), e = parseInt(e % 60), 60 < a && (i = parseInt(a / 60), 
        a = parseInt(a % 60))), {
            hour: i < 10 ? "0" + i : i,
            min: a < 10 ? "0" + a : a,
            sec: e < 10 ? "0" + e : e
        };
    },
    countDown: function(t, e, a) {
        var i = parseInt(Date.now() / 1e3), o = parseInt((i < t ? t : e) - i), s = Math.floor(o / 86400), n = Math.floor((o - 24 * s * 60 * 60) / 3600), r = Math.floor((o - 24 * s * 60 * 60 - 3600 * n) / 60), d = [ s, n, r, Math.floor(o - 24 * s * 60 * 60 - 3600 * n - 60 * r) ];
        this.setData({
            time: d
        }), i < t ? this.setData({
            istimeTitleEnd: 0
        }) : t <= i && i < e ? this.setData({
            istimeTitleEnd: 1
        }) : this.setData({
            istime: 0,
            istimeTitleEnd: 2
        });
    },
    cityPicker: function(t) {
        t.currentTarget.dataset.tap, wx.navigateTo({
            url: "/pages/goods/region/index?id=" + this.data.goods.id + "&region=" + this.data.goods.citys.citys + "&onlysent=" + this.data.goods.citys.onlysent
        });
    },
    giftPicker: function() {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    couponPicker: function() {
        this.setData({
            active: "active",
            showcoupon: !0
        });
    },
    couponrecived: function(t) {
        var e = t.currentTarget.dataset.id, a = this;
        o.post("goods.pay_coupon", {
            id: e
        }, function(t) {
            0 == t.error ? (a.setData({
                showcoupon: !1,
                active: ""
            }), s.toast(a, "已领取")) : s.toast(a, t.message);
        });
    },
    selectPicker: function(t) {
        i.checkAuth();
        var e = t.currentTarget.dataset.time, a = t.currentTarget.dataset.timeout;
        if (this.data.limits) {
            if ("timeout" == e || "access_time" == e) {
                if ("false" == a) return void this.setData({
                    goods_hint_show: !0
                });
                if ("true" == a) {
                    if ("access_time" == e) {
                        this.setData({
                            goods_hint_show: !1
                        });
                        var o = "goodsdetail";
                        return void d.selectpicker(t, this, o);
                    }
                    if ("timeout" == e) return void this.setData({
                        goods_hint_show: !1
                    });
                }
            }
            o = "goodsdetail", d.selectpicker(t, this, o);
        }
    },
    specsTap: function(t) {
        d.specsTap(t, this);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1,
            cycledate: !1
        });
    },
    buyNow: function(t) {
        d.buyNow(t, this, "goods_detail");
    },
    getCart: function(t) {
        d.getCart(t, this);
    },
    select: function() {
        var t = this.data.optionid;
        this.data.diyform, 0 < u && 0 == t ? s.toast(this, "请选择规格") : this.setData({
            active: "",
            slider: "out",
            isSelected: !0,
            tempname: ""
        });
    },
    inputNumber: function(t) {
        d.inputNumber(t, this);
    },
    number: function(t) {
        d.number(t, this);
    },
    onLoad: function(t) {
        i.checkAuth();
        var s = this;
        s.setData({
            imgUrl: i.globalData.approot
        }), o.get("black", {}, function(t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(t) {
                    t.confirm && this.close(), t.cancel && this.close();
                }
            });
        }), n.get(this, "goodsdetail", function(t) {
            var e = t.diypage.items;
            for (var a in e) "copyright" == e[a].id && s.setData({
                copyright: e[a]
            });
        }), t = t || {};
        var e = decodeURIComponent(t.scene);
        if (!t.id && e) {
            var a = o.str2Obj(e);
            t.id = a.id, a.mid && (t.mid = a.mid);
        }
        this.setData({
            id: t.id
        }), i.url(t), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), s.getDetail(t), s.setData({
            uid: t.id,
            options: t,
            success: !0,
            cover: !0,
            showvideo: !0
        }), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    advWidth: t.windowWidth
                });
            }
        }), setTimeout(function() {
            s.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3);
    },
    show_cycelbuydate: function() {
        var t = g.getCurrentDayString(this, this.data.showDate);
        this.setData({
            currentObj: t,
            currentDate: t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日 " + [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][t.getDay()],
            currentYear: t.getFullYear(),
            currentMonth: t.getMonth() + 1,
            currentDay: t.getDate(),
            initDate: Date.parse(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()),
            checkedDate: Date.parse(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()),
            maxday: this.data.scope
        });
    },
    package: function() {
        var e = this;
        o.get("package.get_list", {
            goodsid: this.data.packagegoodsid
        }, function(t) {
            e.setData({
                packageList: t.list[0]
            });
        });
    },
      
    onShow(options){
       
            livePlayer.getShareParams()
                .then(res => {
                    console.log('get room id', res.room_id) // 房间号
                    console.log('get openid', res.openid) // 用户openid
                    console.log('get share openid', res.share_openid) // 分享者openid，分享卡片进入场景才有
                    console.log('get custom params', res.custom_params) // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
                }).catch(err => {
                    console.log('get share params', err)
                })
        
        var a = this;
        i.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), wx.getStorage({
            key: "mydata",
            success: function(t) {
                wx.removeStorage({
                    key: "mydata",
                    success: function(t) {}
                }), a.getDetail(t.data), wx.pageScrollTo({
                    scrollTop: 0
                });
            }
        }), wx.getSetting({
            success: function(t) {
                var e = t.authSetting["scope.userInfo"];
                a.setData({
                    limits: e
                });
            }
        });
    },
    onChange: function(t) {
        return r.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return r.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return r.selectArea(this, t);
    },
    bindChange: function(t) {
        return r.bindChange(this, t);
    },
    onCancel: function(t) {
        return r.onCancel(this, t);
    },
    onConfirm: function(t) {
        return r.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return r.getIndex(t, e);
    },
    onShareAppMessage: function() {
        return this.setData({
            closeBtn: !1
        }), o.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id, this.data.goods.title);
    },
    showpic: function() {
        this.setData({
            showpic: !0,
            cover: !1,
            showvideo: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
    },
    showvideo: function() {
        this.setData({
            showpic: !1,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    startplay: function() {
        this.setData({
            cover: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    bindfullscreenchange: function(t) {
        1 == t.detail.fullScreen ? this.setData({
            success: !1
        }) : this.setData({
            success: !0
        });
    },
    phone: function() {
        var t = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sharePoster: function() {
        wx.navigateTo({
            url: "/pages/goods/poster/poster?id=" + this.data.uid
        });
    },
    closeBtn: function() {
        this.setData({
            closeBtn: !1
        });
    },
    onHide: function() {
        this.setData({
            closeBtn: !1
        });
    },
    showshade: function() {
        i.checkAuth(), this.setData({
            closeBtn: !0
        });
    },
    nav: function() {
        this.setData({
            nav_mask: !this.data.nav_mask
        });
    },
    nav2: function() {
        this.setData({
            nav_mask2: !this.data.nav_mask2
        });
    },
    changevoice: function() {
        this.data.sound ? this.setData({
            sound: !1,
            soundpic: !0
        }) : this.setData({
            sound: !0,
            soundpic: !1
        });
    },
    radioChange: function(t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    activityPicker: function() {
        this.setData({
            fadein: "in"
        });
    },
    actOutPicker: function() {
        this.setData({
            fadein: ""
        });
    },
    hintclick: function() {
        wx.openSetting({
            success: function(t) {}
        });
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    sendclick: function() {
        wx.navigateTo({
            url: "/pages/map/index"
        });
    },
    syclecancle: function() {
        this.setData({
            cycledate: !1
        });
    },
    sycleconfirm: function() {
        this.setData({
            cycledate: !1
        });
    },
    editdate: function(t) {
        g.setSchedule(this), this.setData({
            cycledate: !0
        });
    },
    doDay: function(t) {
        g.doDay(t, this);
    },
    selectDay: function(t) {
        g.selectDay(t, this), g.setSchedule(this);
    },
    play: function(t) {
        var r = t.target.dataset.id, d = this.data.audiosObj[r] || !1;
        if (!d) {
            d = wx.createInnerAudioContext("audio_" + r);
            var e = this.data.audiosObj;
            e[r] = d, this.setData({
                audiosObj: e
            });
        }
        var c = this;
        d.onPlay(function() {
            var n = setInterval(function() {
                var t = d.currentTime / d.duration * 100 + "%", e = Math.floor(Math.ceil(d.currentTime) / 60), a = (Math.ceil(d.currentTime) % 60 / 100).toFixed(2).slice(-2), i = Math.ceil(d.currentTime);
                e < 10 && (e = "0" + e);
                var o = e + ":" + a, s = c.data.audios;
                s[r].audiowidth = t, s[r].Time = n, s[r].audiotime = o, s[r].seconds = i, c.setData({
                    audios: s
                });
            }, 1e3);
        });
        var a = t.currentTarget.dataset.audio, i = t.currentTarget.dataset.time, o = t.currentTarget.dataset.pausestop, s = t.currentTarget.dataset.loopplay;
        0 == s && d.onEnded(function(t) {
            n[r].status = !1, c.setData({
                audios: n
            });
        });
        var n = c.data.audios;
        n[r] || (n[r] = {}), d.paused && 0 == i ? (d.src = a, d.play(), 1 == s && (d.loop = !0), 
        n[r].status = !0, c.pauseOther(r)) : d.paused && 0 < i ? (d.play(), 0 == o ? d.seek(i) : d.seek(0), 
        n[r].status = !0, c.pauseOther(r)) : (d.pause(), n[r].status = !1), c.setData({
            audios: n
        });
    },
    pauseOther: function(i) {
        var o = this;
        c.each(this.data.audiosObj, function(t, e) {
            if (t != i) {
                e.pause();
                var a = o.data.audios;
                a[t] && (a[t].status = !1, o.setData({
                    audios: a
                }));
            }
        });
    }
}, (0, a.default)(e, "onHide", function() {
    this.pauseOther();
}), (0, a.default)(e, "onUnload", function() {
    this.pauseOther();
}), (0, a.default)(e, "navigate", function(t) {
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, i = t.currentTarget.dataset.appid, o = t.currentTarget.dataset.appurl;
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
        path: o
    });
}), (0, a.default)(e, "close", function() {
    i.globalData.flag = !0, wx.reLaunch({
        url: "../index/index"
    });
}), (0, a.default)(e, "showtextarea", function(t) {
    var e = t.currentTarget.dataset.index;
    this.data.diyform.fields[e].texthide = !0, this.data.diyform.fields[e].textareashow = !0, 
    this.data.diyform.fields[e].black = "", this.setData({
        diyform: this.data.diyform
    });
}), (0, a.default)(e, "bindTextAreaBlur", function(t) {
    var e = t.detail.value, a = t.currentTarget.dataset.index;
    this.data.diyform.fields[a].texthide = !1, this.data.diyform.fields[a].textareashow = !1, 
    this.data.diyform.fields[a].placeholder = e, this.data.diyform.fields[a].black = "color: #000", 
    this.setData({
        diyform: this.data.diyform
    });
}), e));