Page({
  data:{
    tempFilePaths:[],
    text:'',
  },
  onLoad:function(options){
    console.log("首页传来的数据：", options.tempFilePaths);
    this.setData({
      tempFilePaths: JSON.parse(options.tempFilePaths)
    })  
  },
  // 活动详情文本框及字数限制
  limit: function (e) {
    // var value = e.detail.value;
    // var length = parseInt(value.length);
    // if (length > this.data.noteMaxLen) {
    //   return;
    // }
    this.setData({
      // current: length,
      text: e.detail.value
    });
  },
  publish:function(){
    //获取当前时间戳
   var create_time = (new Date()).getTime();
    //上传文本
    wx.request({
      url: 'http://192.168.21.223:8080/Pet/MyServlet?method=uploadText',
      data: {
        openid: getApp().globalData.openid,
        text:this.data.text,
        create_time: create_time,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("文本上传成功:",res.data);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

    //上传图片，将图片路径循环赋值给filePath参数
    for (var i = 0; i < this.data.tempFilePaths.length; i++) {
      var imgUrl = this.data.tempFilePaths[i].path;  //每次循环用变量承接每个图片文件
      wx.uploadFile({
        //上传图片的网路请求地址
        url: 'http://192.168.21.223:8080/Pet/MyServlet?method=uploadPicture',
        //选择
        header: { "Content-Type": "multipart/form-data" },//类型
        filePath: imgUrl,
        name: 'file',
        formData: {
          create_time: create_time,
          openid: getApp().globalData.openid ,
          kkk:"文本"
        },
        //每次上传文件成功，就请求数据库，进行存储
        success: function (res) {
           console.log("success");
        },

        fail: function (res) {
          console.log("error");
        }
      });

    }//for循环结束
    wx.navigateTo({
      url: '../index/index',
    })
   


  }
})