// pages/member/member.js
var t = getApp(), e = t.requirejs("core");
Page({

  data: {
    show:!0,
    list: [],
    params: {},
    page: 1,
    canload: !0,
    loading: !0,
    member:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getInfo: function() {
    var i = this;
    e.get("member", {}, function(t) {
      console.log(t);
      
      i.setData({
        member: t,})
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.data.loaded || this.data.list.length == this.data.total || 1 == this.data.canload && this.getList();
  //   console.log(this.data.show);
  //   this.setData({
  //     loading: !0
  // })
  // setTimeout(() => {
  //   this.getList();
  // }, 1000);
   
  },

  getList: function() {
    var a = this;
    a.setData({
        loading: !0
    }), this.data.canload = !1, a.data.params.page = a.data.page, e.get("goods/get_list", a.data.params, function(t) {
        var e = {
            loading: !1,
            count: t.total,
            show: !0
        };
        t.list || (t.list = []), 0 < t.list.length && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.list), 
        t.list.length < t.pagesize && (e.loaded = !0)), a.setData(e), a.data.canload = !0;
    });
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})