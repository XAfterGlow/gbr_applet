var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui");

Page({
    data: {
        list: [],
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        show:!1,
        modal: !1,
        card:"普通游客",
        closeBtn: !1,
        imgUrl:'',
        showid:"",
        showtitle:"",
        logo: "/static/images/logo.jpg",
        rightsnum:6
    },
    onLoad: function(a) {
        var e = {
            cate: a.cate
        };
        t.getCache("isIpx") ? this.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : this.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), this.setData({
            options: a
        }), a.id && (e.id = a.id, e.page = a.page, this.setData({
            id: a.id
        })), this.getlist(e);
        
    },
    onShow(options){
      var card=t.getCache("buycard")
      console.log(card);
      if(card){
        this.setData({
            card:card
          })
      }   
     if(card !="普通游客"){
        wx.setNavigationBarColor({
            frontColor: '#ffffff', 
            backgroundColor: '#FF6186', 
        })
     }
        t.checkAuth(), this.setData({
          options: e,
          imgUrl: t.globalData.approot
      });
      this.getData();
      
   
    },
    swiperchange: function(t) {      
        this.setData({
            current: t.detail.current
        });
        if(t.detail.current==0){
            this.setData({
                rightsnum:6
            })
        }
        if(t.detail.current==1){
            this.setData({
                rightsnum:9
            })
        }
        if(t.detail.current==2){
            this.setData({
                rightsnum:12
            })
        }
    },
    getlist: function(i) {
        var r = this;
        e.get("membercard.detail", i, function(t) {
            if (0 == t.error) {
                if (i.id) for (var a in t.list) i.id == t.list[a].id && r.setData({
                    current: a
                });
                r.setData({
                    list: t.list
                });
            }
        });
    },
    getData: function() {
      var i = this;
      e.get("commission/index", {}, function(t) {
        console.log("数据",t.levelname);
        i.setData({
            card:t.levelname
          })
          7e4 != t.error ? (t.show = !0, i.setData(t), wx.setNavigationBarTitle({
              title: t.set.texts.center
          })) :"";
      });
  },
    submit: function(t) {
        var i = t.currentTarget.dataset, r = this;
        console.error(i), -1 != i.startbuy && ("0" != i.stock ? e.post("membercard.order.create_order", {
            id: i.id
        }, function(t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : a.toast(r, t.message);
        }) : a.toast(r, "库存不足"));
    },
    yhz(){
       
        console.log(1);
        wx.showToast({
            title: '暂未开通',
            icon: 'none',
            duration: 2000
          })
        
    },
    coupon: function(t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.current, s = i.data.list, n = i.data.options, d = {
            cate: n.cate
        }, c = {
            id: r.id,
            couponid: r.couponid
        };
        r.issend || (n.id && (d.id = n.id), e.post("membercard.get_month_coupon", c, function(t) {
            if (0 == t.error) for (var e in a.toast(i, "领取成功"), s[o].month_coupon) r.couponid == s[o].month_coupon[e].id && (s[o].month_coupon[e].isget_month_coupon = !0, 
            i.setData({
                list: s
            })); else a.toast(i, t.message);
        }));
    },
    credit: function(t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.list, s = i.data.current, n = (i.data.options.cate, 
        {
            id: r.id
        });
        r.iscredit || e.post("membercard.get_month_point", n, function(t) {
            0 == t.error ? (a.toast(i, "领取成功"), o[s].isget_month_point = 1, i.setData({
                list: o
            })) : a.toast(i, t.message);
        });
    },
    toshare:function(){
      var i =this
      i.setData({
          closeBtn:!0
      })
  },
      //分享的方法
      sharePoster: function() {
          var nw=t.getCache('umids')                
          wx.navigateTo({
              
              url: "/commission/pages/poster/index?mid="+nw
          });
      },
      closeBtn: function() {
          this.setData({
              closeBtn: !1
          });
      },
      onShareAppMessage: function() {
          var nw=t.getCache('umids');
          return this.setData({
              closeBtn: !1
          }),{
              desc: '最具人气的小程序!',
              path: "/pages/index/index?mid="+nw
          };
          return 
      },
      //跳转到佣金提现(没电签的去电签)
      towithdraw:function(){
          var member=this.data.member;
          console.log(member);
          if(member.isdianqian==1){
            wx.navigateTo({
              url: '/commission/pages/withdraw/index',
            })
          }else{
            wx.navigateTo({
              url: '/pages/member/info/index',
            })
          }
      }
});