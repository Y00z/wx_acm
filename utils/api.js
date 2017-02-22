const API = 'http://www.baidu.com/acmonitor/appGroups.do?getGroupsByUserIdAndParentdepartid&orgId=8a8ab0b246dc81120146dc8180ba0017'

const get = (callback) => {
    wx.showToast({
         title: '数据加载中...',
        icon: 'loading',
        duration: 2000
    })
    wx.request({
        url: API,
        success: (res) => {
            wx.hideToast()
            const data = res.data
            if(data.code){
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    confirmColor: 'rgb(251,93,93)',
                    content: data.message,
                    success: (res) => {
                    }
                    })
                return
            }
            if(typeof(callback) == 'function')
                callback(data)
        }
    })
}