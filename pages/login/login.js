// pages/login/login.js
Page({
  data: {
    user: '',
    pass: ''
  },
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
  clean: function () {

  },
  login: function () {
    if (this.data.user.length == 0 || this.data.pass.length == 0) {
      wx.showModal({
        title: '提示',
        content: '帐号或密码不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    if (this.data.user == 'admin' && this.data.pass == 'awit1024') {
      wx.switchTab({
        url: '../index/index',
        success: function (res) {
        },
        fail: function () {
        },
        complete: function () {
        }
      })
      console.log("登录成功");
    } else {
      wx.showModal({
        title: '提示',
        content: '账号或者密码错误',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
  },
  bindUserInput: function (e) {
    this.setData({
      user: e.detail.value
    })
  },
  bindPassInput: function (e) {
    this.setData({
      pass: e.detail.value
    })
  }
})