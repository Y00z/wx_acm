// pages/alarmtype/alarmtype.js
Page({
  data: {
    gid: ''
  },
  onLoad: function (options) {
    this.setData({
      gid: options.gid
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  warninfo: function () {
    var page = this;
    wx.navigateTo({
      url: '../warninfo/warninfo?gid=' + page.data.gid,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  alarminfo: function () {
    console.log("11");
    var page = this
    wx.navigateTo({
      url: '../alarminfo/alarminfo?gid=' + page.data.gid,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})