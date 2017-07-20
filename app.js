//app.js
App({
  /*onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('personal') || []
    logs.unshift(Date.now())
    wx.setStorageSync('personal', personal)
  },*/

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
