// pages/template/template.js
Page({
  data: {},
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  initTable: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    wx.request({
      url: api + page.data.gid,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        page.setData({
          data: data.data[0].cps
        })
      }
    })
  },
})