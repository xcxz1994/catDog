var AppSecret = "832f57f3af775e5c36690bee11db70f5";
var AppID = "wx3e87d6efe76cbbc1";
var grant_type = "authorization_code";
var code = "";
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
    //callback函数，用于回调
    callback: function() {
    return new Promise((resolve) => {
      wx.login({
        //登录成功后，将code先存起来
        success: function (res) {
          console.log("res.code:", res.code)
          code = res.code;
          //获取用户信息，成功后发送请求给后台进行连接
          wx.getUserInfo({
            success: function (res) {
              getApp().globalData.authorize = true;
              getApp().globalData.userInfo = res.userInfo;
              console.log("res.userInfo", res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo);
              //发送请求
              wx.request({
                url: 'http://192.168.21.223:8080/Pet/MyServlet?method=user_info', //接口地址
                data: {
                  code: code,
                  appsercet: AppSecret,
                  appid: AppID,
                  grant_type: grant_type,
                  user_name: res.userInfo.nickName,
                  user_url: res.userInfo.avatarUrl,
                  user_city: res.userInfo.city,
                  user_country: res.userInfo.country,
                  user_gender: res.userInfo.gender,
                  user_province: res.userInfo.province
                },
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: function (res) {
                  wx.setStorageSync('openid', res.data);
                  getApp().globalData.openid = res.data;
                  console.log("openid:", getApp().globalData.openid);
                  resolve(res.data)
                }
              })
            },
            fail: function (res) {
              getApp().globalData.authorize = false;
              getApp().globalData.load = false;
              resolve(getApp().globalData.load)
            }
          })
        }
      })
    })
  
    }

 
})