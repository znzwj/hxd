Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    lists:[],
    key: ''
  },
  onNewItem: function(){
    wx.navigateTo({
      url: '../select_type/select_type',
    })
  },
  onShow: function (e) {
    console.log('onShow')
    var that = this;
    wx.getStorage({
      key: 'lists',
      success: function (res) {
        // success
        console.log("success");
        that.setData({
          lists: res.data
        })
      },
      fail: function (res) {
        console.log("fail");
      },
      complete: function (res) {
        console.log("complete");
      }
    })
    /*var lists = wx.getStorageSync('lists')
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //当前时间戳为：1403149534
    console.log("当前时间戳为：" + timestamp);
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    console.log(newDate.toLocaleDateString());
    var timestamp = newDate.toLocaleDateString();
    console.log("当前日期为：" + timestamp);
    for (var i = 0; i <= lists.length; i++) {
      if (lists[i].finishTime < timestamp) {
        lists.splice(i, 1);
        this.setData({
          lists: lists
        })
      }
    }*/
  }
})
