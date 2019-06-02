//index.js
//获取应用实例
const app = getApp();
// var util = require('../../utils/util.js')  目前没用到

Page({
  data: {
    userInfo: {}, 
    tempFilePaths:'',
    list_index:[],
    currentTab:'',
    auto:'',
    height_swiper:'' , //swiper的高度
     height_scroll:''  //scroll的高度
  },

  onLoad: function () {
    var that=this;
    //获取屏幕高宽比例
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;    //比例
        var calc = clientHeight * rpxR;
        console.log("calc", calc);
        getApp().globalData.winHeight = calc;
          that.setData({
            height_swiper:calc-360,  //？？
            height_scroll:calc-314
          })  
      }
    })
    app.callback().then(res => {
        that.setData({
         userInfo: app.globalData.userInfo,
        })
        //连接数据库取出数据
      wx.request({
        url: 'http://192.168.1.103:8080/Pet/MyServlet?method=take',
        data: {
          openid: getApp().globalData.openid
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("加载想要获取的数据：", res.data);
          app.globalData.list = res.data;
          // console.log(util.parseJson(app.globalData.list))

          //从服务器端获取到的数据，将数据赋值给list数组
          that.setData({
            list_index: res.data,  //取出这个时间的图片
          })
        },
        fail: function (res) {
          console.log(".....fail.....");
        }
      })
    })
 },


 
  // //获取用户信息
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  //调用手机相册摄像头
  pic: function (options) {
   var that =this; //需重新定义this，否则下方无法识别
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res",res)
        that.setData({
          tempFilePaths: res.tempFilePaths[0]
        })
        wx.navigateTo({
          url: '../publish/publish?tempFilePaths=' + JSON.stringify(res.tempFiles),
          success: function(res) {console.log("跳转成功")},
          fail: function (res) { console.log("跳转失败")},
        })
        
      }
    })
  },
  //图片放大预览
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.list_index); //仅仅用来记录个数，先转为数组对象才可以
    console.log("objkeys:",objkeys);
    for (var i = 0; i < objkeys.length; i++) {
      imgArr.push(this.data.list_index[i]["image"]);
    }
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

     
  
})
