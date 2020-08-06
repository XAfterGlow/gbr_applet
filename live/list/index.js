var s = getApp(), t = getApp().requirejs("core");

// var e = require("utils/core.js");
Page({
    data: {
        show: !1,
        loaded: !1,
        page: 1,
        list: [],
        total: 0,
        empty: !1,
        mid:0,
        lbdata:[],
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 800,
        circular: !0,
        current:0,
        swiperError:0,
        swiperheight:0,
        result:0
    },
    onLoad: function(t) {
        this.getList(!1);
        this.gelbdata(!1)
    },
    onShow:function(){
       let n = s.getCache("umids");
       console.log('aa:',n);
       this.setData({
           mid:n
       })
       var th = this;
       wx.getSystemInfo({
        success: function(t) {   
            console.log(t);
                     
            var e = t.windowWidth / 2.3;
            th.setData({
                swiperheight: e
            });
            console.log(e);
            
        }
    });
       
    },
 
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList(!1), this.gelbdata(!1);

    },
    onPullDownRefresh: function() {
        this.getList(!0);
        this.gelbdata(!0);
    },
    gelbdata:function(e){
       var  th =this
        t.get("live/room/get_banner",{},function(r){
                console.log("ss",r.list);
                th.setData({
                    lbdata:r.list ,
                })
        })
    },
    swiperchange:function(e){
        // console.log(e.detail.source);
        if (e.detail.source === 'autoplay' || e.detail.source === 'touch'){
            this.setData({ current: e.detail.current });
        }        
    },
    imagesHeight: function(t) {
        var e = t.detail.width, a = t.detail.height, i = t.target.dataset.type, s = this;
        console.log(i);
        
        wx.getSystemInfo({
            success: function(t) {
                s.data.result= t.windowWidth / e * a,  s.setData({
                    result: s.data.result+20
                });
                console.log(s.data.result);
                
            }
        });
    },
    getList: function(e) {
        var s = this;
        e && (s.data.page = 1, s.data.list = []), t.get("live/room/get_list", {
            page: s.data.page
        }, function(t) {
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                show: !0
            };
            0 < t.list.length ? (a.page = s.data.page + 1, a.list = s.data.list.concat(t.list), 
            t.list.length < t.pagesize ? a.loaded = !0 : a.loaded = !1, a.empty = !1) : (a.empty = !0, 
            a.list = []), s.setData(a), wx.setNavigationBarTitle({
                title: t.sysset.shopname || "商城直播"
            }), e && wx.stopPullDownRefresh();
        }, this.data.show);
    },
    goto:function(e){
        let roomId = e // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
        let customParams = encodeURIComponent(JSON.stringify({ path: 'live/list/index'})) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
        wx.navigateTo({
            url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
        })
    },

});