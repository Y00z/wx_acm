// pages/runaccount/runaccount.js
const api = "https://www.baidu.com/acmonitor/appDeviceStatu.do?getDeviceStatu&groupId="

Page({
  data: {
    gid: '',
    index: 1,
    data: []
  },
  onLoad: function (options) {
    this.setData({
      gid: options.gid
    });
    this.init();
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
    console.log('刷新');
    this.setData({
      index: 1
    })
    this.init();
  },
  onReachBottom: function () {
    console.log('下一页');
    var mIndex = this.data.index;
    this.setData({
      index: mIndex + 1
    })
    this.init();
  },
  init: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    var url = api + page.data.gid + "&row=12" + "&page=" + page.data.index;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        console.log(url);
        console.log(data.data);
        console.log(JSON.stringify(data.data));
        var mdata = page.data.data;
        for (var i = 0; i < data.data.length; i++) {
          mdata.push(
            data.data[i]
          )
        }
        page.setData({
          data: mdata
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  clickItem: function (event) {
    var data = JSON.stringify(event.currentTarget.dataset.mdata)
    console.log(data);
    wx.navigateTo({
      url: '../runaccountinfo/runaccountinfo?gid=' + data,
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