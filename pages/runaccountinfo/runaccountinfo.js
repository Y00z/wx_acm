// pages/runaccountinfo/runaccountinfo.js
Page({
  data:{
    data:null
  },
  onLoad:function(options){
    this.setData({
      data: JSON.parse(options.gid)
    });
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){
  }
})