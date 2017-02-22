// pages/detail/detail.js
const api = "https://www.baidu.com/acmonitor/appStateDatasDymic.do?getDatasAll&groupId=";

const curveApi = "https://www.baidu.com/acmonitor/appStateDatas.do?getACDatasForDouble&groupid="

var wxCharts = require('../../utils/wxcharts.js');

var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    gid: 0,
    data: [],
    lqshswd: '',
    lqscswd: '',
    ldscswd: '',
    ldshswd: '',
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    mData: null,
    coolwater: '',
    coldwater: '',
    title: '冷冻水进出水温',
    dty_code: 'T1,T2',
    currentButtom: 1,
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      gid: options.gid
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    setInterval(function () {
      that.initLine();
      that.initTable();
    }, 60000);
    this.initTable();
    this.initLine();
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  primary1: function () {
    this.setData({
      'mData.loading1': true,
      'mData.title': '冷冻水进出水温',
      dty_code: 'T1,T2',
      currentButtom: 1
    })
    this.initLine();
  },
  primary2: function () {
    this.setData({
      'mData.loading2': !this.data.mData.loading2,
      'mData.title': '冷却水进出水温',
      dty_code: 'T3,T4',
      currentButtom: 2
    })
    this.initLine();
  },
  primary3: function () {
    this.setData({
      'mData.loading3': !this.data.mData.loading3,
      'mData.title': '#1压缩机高低压',
      dty_code: 'p1,p2',
      currentButtom: 3
    })
    this.initLine();
  },
  primary4: function () {
    this.setData({
      'mData.loading4': !this.data.mData.loading4,
      'mData.title': '#2压缩机高低压',
      dty_code: 'p3,p4',
      currentButtom: 4
    })
    this.initLine();
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
          data: data.data[0].cps,
          lqshswd: data.data[0].lqshswd,
          lqscswd: data.data[0].lqscswd,
          ldscswd: data.data[0].ldscswd,
          ldshswd: data.data[0].ldshswd,
          coolwater: data.data[0].coolwater,
          coldwater: data.data[0].coldwater
        })
        page.initObject();
      }
    })
  },
  initObject: function () {
    let mData = {
      data: this.data.data,
      loading1: this.data.loading1,
      loading2: this.data.loading2,
      loading3: this.data.loading3,
      loading4: this.data.loading4,
      defaultSize: this.data.defaultSize,
      primarySize: this.data.primarySize,
      warnSize: this.data.warnSize,
      lqshswd: this.data.lqshswd,
      lqscswd: this.data.lqscswd,
      ldscswd: this.data.ldscswd,
      ldshswd: this.data.ldshswd,
      coldwater: this.data.coldwater,
      coolwater: this.data.coolwater,
      title: this.data.title
    }
    this.setData({
      mData: mData
    })
  },
  initLine: function () {
    var page = this;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 2000
    })
    var url = curveApi + this.data.gid + "&dty_code=" + this.data.dty_code + "&panelstatu=sdfsdf";
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (data) => {
        wx.hideToast()
        console.log(url);
        console.log(JSON.stringify(data));
        page.initView(data);
        // page.setData({
        //   data: data.data[0].cps,
        //   lqshswd: data.data[0].lqshswd,
        //   lqscswd: data.data[0].lqscswd,
        //   ldscswd: data.data[0].ldscswd,
        //   ldshswd: data.data[0].ldshswd,
        //   coolwater: data.data[0].coolwater,
        //   coldwater: data.data[0].coldwater
        // })
      }
    })
  },
  initView: function (data) {
    // var arr = data.data[0].cate;
    // var F;
    // for (F = arr.length; F;) arr[--F] = [(new Date(arr[F])).getTime(), arr[F]]
    // arr.sort(function (A, B) { return A[0] - B[0] })
    // for (F = arr.length; F;) arr[--F] = arr[F][1]
    // console.log(arr);
    let windowWidth = 320;
    let res = wx.getSystemInfoSync();
    windowWidth = res.windowWidth;
    var page = this;
    if (data.data[0].datas[0].data.length > 0 && data.data[0].datas[1].data.length > 0) {
      new wxCharts({
        canvasId: 'wxChartCanvas',
        type: 'line',
        categories: data.data[0].cate,
        series: [{
          name:  "出水",
          data: data.data[0].datas[0].data,
          format: function (val) {
            return val.toFixed(2);
          }
        }, {
          name: "回水",
          data: data.data[0].datas[1].data,
          format: function (val) {
            return val.toFixed(2);
          }
        }],
        yAxis: {
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: windowWidth,
        height: 300
      });
    }

    var current = this.data.currentButtom;
    if (current == 1) {
      this.setData({
        'mData.loading1': false
      })
    } else if (current == 2) {
      this.setData({
        'mData.loading2': false
      })
    } else if (current == 3) {
      this.setData({
        'mData.loading3': false
      })
    } else if (current == 4) {
      this.setData({
        'mData.loading4': false
      })
    }
  }
})

