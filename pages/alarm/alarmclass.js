// pages/alarm/alarmclass.js
Page({
  data: {
    gid: ''
  },
  onLoad: function (options) {
    this.setData({
      gid: options.gid
    });
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  runaccount: function(){
    var page = this;
        wx.navigateTo({
      url: '../runaccount/runaccount?gid='+page.data.gid,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})