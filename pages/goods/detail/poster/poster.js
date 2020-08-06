var t = getApp(), e = (t.requirejs("core"), t.requirejs("foxui"));

Page({
    data: {
        accredit: "",
        errMsg: "",
        Image: "https://api.clubmall.cn/attachment/images/7/2017/11/r13oT11buG60bn2ntVp1q4pe3B6EGQ.jpeg"
    },
    onLoad: function(t) {},
    previewImage: function() {
        wx.previewImage({
            current: "https://api.clubmall.cn/attachment/images/7/2017/11/r13oT11buG60bn2ntVp1q4pe3B6EGQ.jpeg",
            urls: [ "https://api.clubmall.cn/attachment/images/7/2017/11/r13oT11buG60bn2ntVp1q4pe3B6EGQ.jpeg" ]
        });
    },
    savePicture: function() {
        var i = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.writePhotosAlbum"] ? (wx.showLoading({
                    title: "图片下载中..."
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), wx.downloadFile({
                    url: "https://api.clubmall.cn/attachment/images/7/2017/11/r13oT11buG60bn2ntVp1q4pe3B6EGQ.jpeg",
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                e.toast(i, "保存图片成功");
                            },
                            fail: function(t) {
                                i.setData({
                                    errMsg: t.errMsg
                                }), e.toast(i, "保存图片失败");
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    fail: function() {
                        t.getmsg("writePhotosAlbum", "使用保存图片功能");
                    }
                });
            }
        });
    }
});