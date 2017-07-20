var dataUrl = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'

//更改数组 第三个参数是对象
function editArr(arr, i, editCnt) {
  let newArr = arr, editingObj = newArr[i];
  for (var x in editCnt) {
    editingObj[x] = editCnt[x];
  }
  return newArr;
}

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    curIpt: '',
    showAll: true,
    lists: [],
    curRange: ['0天', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11天', '12天', '13天', '14天', '15天', '16天', '17天', '18天', '19天', '20天', '21天', '24天', '25天', '30天', '1个月', '45天', '2个月', '3个月', '4个月', '5个月', '半年', '8个月', '9个月', '10个月', '1年', '1年半', '2年', '3年'],
    array1: ['0天', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11天', '12天', '13天', '14天', '15天'],
    curBegin: '2016-09-01',
    index1: 1,
    index2: 1,
    switch1: true,
    remind: []
  },
  onLoad: function () {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'todolist',
      success: function (res) {
        if (res.data) {
          that.setData({
            lists: res.data
          })
        }
      }
    })
  },
  iptChange(e) {
    this.setData({
      curIpt: e.detail.value,
    })
  },
  formReset() {
    this.setData({
      curIpt: ''
    })
    wx.switchTab({
      url: '../index/index',
    })
  },
  formSubmit: function (e) {
    //this.setData({ title var key = this.data.curIpt: e.detail.value.title });
    var that = this
    var key = this.data.curIpt
    var data = this.data.dates
    wx.setStorageSync(key, data)
    this.setData({
      key: key,
      data: data
    });
    wx.getStorage({
      key: 'lists',
      success: function (res) {
        // success
      },
      complete: function (res) {
        wx.setStorage({
          key: 'lists',
          data: (res.data ? res.data : []).concat({
            curIpt: that.data.curIpt,
            beginTime: that.data.curBegin,
            //shelflifeTime: that.data.curRange[this.data.index1],
            finishTime: that.data.dates,
            //aheadTime: that.data.array1[this.data.index2],
            aheadDate: that.data.adates
          }),
          complete: function (e) {
            wx.switchTab({
              url: '../logs/logs',
            });
          }
        });
      }
    })

  },
  bindDateChange(e) {
    this.setData({
      curBegin: e.detail.value
    })
  },
  bindPickerChange(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  calculate: function (e) {
    var stringTime = this.data.curBegin;
    var timestamp1 = Date.parse(new Date(stringTime));
    timestamp1 = timestamp1 / 1000;
    console.log(stringTime + "的时间戳为：" + timestamp1);
    var index1 = this.data.index1;
    console.log(index1);
    var ttt;
    if (index1 <= 21) {
      ttt = index1 * 24 * 60 * 60;
    } else if (index1 == 22 || index1 == 23) {
      var t1 = wx.index1 + 2;
      ttt = t1 * 24 * 60 * 60;
    } else if (index1 == 24) {
      var t2 = index1 + 6;
      ttt = t2 * 24 * 60 * 60;
    } else if (index1 == 25) {
      ttt = 1 * 24 * 60 * 60 * 30;
    } else if (index1 == 26) {
      ttt = 1 * 24 * 60 * 60 * 30 + 1 * 24 * 60 * 60 * 15;
    } else if (index1 == 27 || index1 == 28 || index1 == 29 || index1 == 30 || index1 == 31) {
      var t3 = index1 - 25;
      ttt = t3 * 30 * 24 * 60 * 60;
    } else if (index1 == 32 || index1 == 33 || index1 == 34) {
      var t4 = index1 - 24;
      ttt = t4 * 30 * 24 * 60 * 60;
    } else if (index1 == 35) {
      ttt = 1 * 12 * 30 * 24 * 60 * 60;
    } else if (index1 == 36) {
      ttt = 1 * 12 * 30 * 24 * 60 * 60 + 6 * 24 * 60 * 60 * 30;
    } else {
      var t5 = index1 - 35;
      ttt = t5 * 12 * 30 * 24 * 60 * 60;
    }
    console.log(ttt);
    var timestamp2 = timestamp1 + ttt;
    var newDate = new Date();
    newDate.setTime(timestamp2 * 1000);
    console.log(newDate.toLocaleDateString());
    var dates = newDate.toLocaleDateString();
    this.setData({
      dates: newDate.toLocaleDateString()
    })
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      switch1: e.detail.value
    })
  },
  bindSelectChange: function (e) {
    console.log('select发送选择改变，携带值为', e.detail.value)
    if (this.data.switch1 == true) {
      this.setData({
        index2: e.detail.value
      })
    } else {
      wx.showModal({
        title: '没有选择提前提醒',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
          return
        }
      })
    }
  },
  makesure: function () {
    if (this.data.switch1 == true) {
      var index1 = this.data.index1;
      var index2 = this.data.index2;
        var stringTime1 = this.data.dates;
        var timestamp3 = Date.parse(new Date(stringTime1));
        timestamp3 = timestamp3 / 1000;
        var ddd = index2 * 24 * 60 * 60;
        var timestamp4 = timestamp3 - ddd;
        var newDate = new Date();
        newDate.setTime(timestamp4 * 1000);
        var adates = newDate.toLocaleDateString();
        this.setData({
          adates: newDate.toLocaleDateString()
        })
    } else {
      wx.showModal({
        title: '没有选择提前提醒',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  iptEdit(e) {
    let i = e.target.dataset.id;
    this.setData({
      lists: editArr(this.data.lists, i, { curVal: e.detail.value })
    })
  },
  saveEdit(e) {
    let i = e.target.dataset.id;
    this.setData({
      lists: editArr(this.data.lists, i, { content: this.data.lists[i].curVal, editing: false })
    })
  },
  setDone(e) {
    let i = e.target.dataset.id, originalDone = this.data.lists[i].done;
    this.setData({
      lists: editArr(this.data.lists, i, { done: !originalDone })
    })
  },
  toDelete(e) {
    let i = e.target.dataset.id, newLists = this.data.lists;
    newLists.map(function (l, index) {
      if (l.id == i) {
        newLists.splice(index, 1);
      }
    })
    this.setData({
      lists: newLists
    })
  }
})