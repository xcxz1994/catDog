const app = getApp().globalData;
Page({
  data: {
    currentTab: 0,
    students: [{   //假数据  
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }, {
      url: '1.jpg',
      name: '老王'
    }]
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换模式
  clickTab: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      app.zzcx.PointRemoteMode({ //发送模式切换指令
        data: {
          ClassroomId: that.data.rId,
          mode: e.currentTarget.dataset.current
        },
        success: (res) => {
          that.setData({
            currentTab: e.currentTarget.dataset.current
          })
        }
      });
    }
  },
  loadData: function () {
  },
  onLoad: function (options) {
  },
})
