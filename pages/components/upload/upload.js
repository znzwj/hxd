 const templateMessageUrl = require('../../../config').templateMessageUrl

var app = getApp()
Page({
  data:{
    lists: []
  },
  onShow: function () {
    console.log('onShow')
    var lists = wx.getStorageSync('lists')
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //当前时间戳为：1403149534
    console.log("当前时间戳为：" + timestamp);
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    console.log(newDate.toLocaleDateString());
    var timestamp = newDate.toLocaleDateString();
    var lists = wx.getStorageSync('lists')
    //console.log(index)
    
    var that = this;
    wx.getStorage({
      key: 'lists',
      success: function (res) {
        // success
        console.log("success");
        that.setData({
          lists: res.data
        })
      }
    })
    var finishTime = wx.getStorageSync('key')
    console.log(finishTime)
  },
  onLoad: function () {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp); 
  },

  submitForm: function (e) {
    var self = this
    var form_id = e.detail.formId
    var formData = e.detail.value

    console.log('form_id is:', form_id)

    self.setData({
      loading: true
    })

    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: templateMessageUrl,
          method: 'POST',
          data: {
            form_id,
            openid,
            formData
          },
          success: function (res) {
            console.log('submit form success', res)
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
            self.setData({
              loading: false
            })
          },
          fail: function ({errMsg}) {
            console.log('submit form fail, errMsg is:', errMsg)
          }
        })
      } else {
        console.log('err:', err)
      }
    })
  }
})
