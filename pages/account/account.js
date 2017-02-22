const api = "https://www.baidu.com/acmonitor/appGroups.do?getGroupsByUserIdAndParentdepartid&orgId=8a8ab0b246dc81120146dc8180ba0017"

Page({
  data: {
    unitData:[]
  },
  onLoad: function (options) {
    this.getUnit();
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
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
    return {
      title: 'title', 
      desc: 'desc', 
      path: 'path'
    }
  },
  getUnit: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    wx.request({
      url: api,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        page.setData({unitData :data.data[0].data});
      }
    })
  },
  clickItem:function(event){
    console.log();
    wx.navigateTo({
      url: '../alarm/alarmclass?gid='+event.currentTarget.dataset.gid,
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


