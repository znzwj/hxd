Page({
  data: {
    imgUrls: [
      '../../image/huazhuangpin.jpg',
      '../../image/qiaokeli.jpg',
      '../../image/chiyao.jpg',
    ],
    contentItems:['','','',''],
    ListItems:['','','',''],
    finishtime: []
  },
  first :function(){
    wx.navigateTo({
      url: '../components/recommend/recommend',
    })
  },
  second : function () {
    wx.navigateTo({
      url: '../components/recommend1/recommend',
    })
  },
  third : function () {
    wx.navigateTo({
      url: '../components/recommend2/recommend',
    })
  },
  forth : function () {
    wx.navigateTo({
      url: '../components/recommend3/recommend',
    })
  },
  fifth : function () {
    wx.navigateTo({
      url: '../components/specific/specific',
    })
  },
   sixth: function () {
     wx.navigateTo({
       url: '../components/specific1/specific',
     })
   },
   onShow: function(){
     var lists = wx.getStorageSync('lists')
     
     var i
     var timestamp = Date.parse(new Date());
     timestamp = timestamp / 1000;
     //当前时间戳为：1403149534
     console.log("当前时间戳为：" + timestamp);
     var newDate = new Date();
     newDate.setTime(timestamp * 1000);
     console.log(newDate.toLocaleDateString());
     var timestamp = newDate.toLocaleDateString();
     console.log("当前日期为：" + timestamp);
     console.log(lists[0])
     console.log(lists[0].finishTime)
     for(i = 0;i <= lists.length; i++){
       console.log(lists[i].finishTime)
       console.log(lists[i].curIpt)
       if(lists[i].finishTime == timestamp){
         wx.showModal({
           title: lists[i].curIpt +'已到期',
           success:function(res){
             if (res.confirm) {
               console.log('用户点击确定')
           }
           }
         })
       }
     }
     for (i = 0; i <= lists.length; i++){
       console.log(lists[i].aheadDate)
       console.log(lists[i].curIpt)
       if (lists[i].aheadDate == timestamp) {
         wx.showModal({
           title: lists[i].curIpt + '快要过期，请您尽快处理',
           success: function (res) {
             if (res.confirm) {
               console.log('用户点击确定')
             }
           }
         })
       }
     }
   }
})
