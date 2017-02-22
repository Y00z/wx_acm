// pages/warninfo/warninfo.js

const api = "https://www.baidu.com/acmonitor/appWarnUpdate.do?findWarnList&groupId="

const seeApi = "https://www.baidu.com/acmonitor/appWarnDeal.do?getWarnData&id="

const dealApi = "https://www.baidu.com/acmonitor/appWarnDeal.do?subWarnDeal&userId=8a8ab0b246dc81120146dc8181950052&desc="

const clearApi = "https://www.baidu.com/acmonitor/appWarnUpdate.do?doUpdateWarnState&type=single&warnId="

const clearAllApi = "https://www.baidu.com/acmonitor/appWarnUpdate.do?doUpdateWarnState&groupId="


// 内网 8a8ab0b246dc81120146dc8181950052
Page({
  data: {
    gid: '',
    data: [],
    deal: '',
    focus: false,
    isAdd: false,
    wid: '',
    inputValue: '',
    fid: '',
  },
  onLoad: function (options) {
    this.setData({
      gid: 'f0fcea58586b54c001586b5ba77e0001',
    })
    this.init()
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  init: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    var url = api + page.data.gid + "&type=1";
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        console.log(url);
        console.log(data.data);
        console.log(JSON.stringify(data));
        page.setData({
          data: data.data[0].Data
        })
      }
    })
  },
  clickItem: function (event) {
    var data = event.currentTarget.dataset.mdata;
    var page = this;
    wx.showActionSheet({
      itemList: ['查看', '处理', '清除', '全部清除'],
      success: function (res) {
        if (res.tapIndex == 0)
          page.seeInfo(data.id);
        else if (res.tapIndex == 1)
          page.inputDeal();
        else if (res.tapIndex == 2)
          page.clear();
        else if (res.tapIndex == 3)
          page.clearAll();
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
    this.setData({
      fid: data.id,
      wid: data.aws_warn_id
    })

  },
  seeInfo: function (fid) {
    console.log(0);
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    var url = seeApi + fid;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        console.log(url);
        console.log(data.data);
        console.log(JSON.stringify(data));
        var result = data.data[0].data[0]
        if (data.data[0].data.length == 0) {
          wx.showToast({
            title: '抱歉,该报警记录暂未处理',
            duration: 2000
          })
          return;
        }
        wx.showModal({
          title: '查看',
          content: ' 处理详情:' + result.awd_desc + "\n 处理时间:" + result.awd_time + "\n 处理人:" + result.realname,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  dealInfo: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    var time = this.getNowFormatDate();
    var url = dealApi + this.data.inputValue + "&state_id=" + this.data.fid + "&warnId=" + this.data.wid + "&time=" + time;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        console.log(url);
        console.log(data.data);
        console.log(JSON.stringify(data));
        var value = page.data.inputValue;
        console.log(value);
        if (value == null || value.length < 1) {
          wx.showToast({
            title: '请输入处理描述信息',
            duration: 2000
          })
          return
        }
        console.log(data.data);
        // if (data.data=="true") {
        wx.showToast({
          title: '处理成功',
          duration: 2000
        })
        // }
      }
    })
  },
  inputDeal: function () {
    // this.setData({
    //   focus: true,
    //   isAdd: true,
    // })
               wx.showToast({
          title: '处理成功',
          duration: 2000
        })
  },
  clear: function () {
    console.log(2);
    var page = this;
           wx.showToast({
          title: '清除成功',
          duration: 2000
        })
    // wx.showToast({
    //   title: '数据加载中...',
    //   icon: 'loading',
    //   duration: 2000
    // })
    // var url = clearApi + wid + "&groupId=" + this.data.gid;
    // wx.request({
    //   url: url,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (data) => {
    //     wx.hideToast()
    //     console.log(url);
    //     console.log(data.data);
    //     console.log(JSON.stringify(data));
    //     wx.showToast({
    //       title: '清除成功',
    //       duration: 2000
    //     })
    //   }
    // })
  },
  clearAll: function () {
    console.log(3);
    var page = this;
    wx.showToast({
      title: '全部清除成功',
      duration: 2000
    })
    // wx.showToast({
    //   title: '数据加载中...',
    //   icon: 'loading',
    //   duration: 2000
    // })
    // var url = clearAllApi + this.data.gid;
    // wx.request({
    //   url: url,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (data) => {
    //     wx.hideToast()
    //     console.log(url);
    //     console.log(data.data);
    //     console.log(JSON.stringify(data));
    //     wx.showToast({
    //       title: '全部清除成功',
    //       duration: 2000
    //     })
    //   }
    // })
  },
  cancelDeal: function () {
    this.setData({
      isAdd: false
    })
  },
  confirmDeal: function () {
    this.setData({
      isAdd: false
    })
    this.dealInfo();
  },
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})