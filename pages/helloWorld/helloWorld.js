//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Int_1:'',
    prize_result:'抽奖结果',
    modalHidden: true,//是否隐藏对话框  modalHidden:true,//是否隐藏对话框  
    num:0
  },
  onLoad: function () {
    
  },
  start_draw: function(){
    console.log("开始进行抽奖： -------------------------");
    var _this = this;
    var num = 0;
    this.setData({
      Int_1: setInterval(function () {
        _this.setData({
          'prize_result': parseInt(Math.random() * 30000)
        });
        _this.update();
        num++;
        console.log('num: ' + num);
        if (num >= 3) {
          clearInterval(_this.data.Int_1);
          _this.setData({
            modalHidden: false
          });

          wx.request({
             // url: 'http://www.roylion.cn/search/java',
            url: 'http://192.168.21.129:8082/activity/saveWxRank',
            data: {nickName:'林天祥',province:'zhejiang',city:'ningbo'},
            method: 'post',
            // header: { 'Content-Type': 'application/json' },
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res);
              return typeof cb == "function" && cb(res.data)
            },
            fail: function () {
              console.log("failure");
              return typeof cb == "function" && cb(false)
            }
          }) 

        }
      }, 1000)
    });


  },
  //确定按钮点击事件  
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  //取消按钮点击事件  
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },  



})
