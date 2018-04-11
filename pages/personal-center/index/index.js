// pages/personal-center/personal-center.js
import apiUrl from '../../../api-url.js'
import * as tool from '../../../tool.js'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "",
    name: "--",
    isPunitive:false,
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().onReady(err => {
      //登录成功回调
      let userInfo = getApp().globalData.userInfo;
      let logo = userInfo.avatarUrl;
      let name = userInfo.nickName;

      this.setData({
        logo: logo,
        name: name,
        isPunitive: getApp().globalData.isPunitive,
      });

      this.personCenterHttpRequest();
    });

    
  },

  onShow:function(){
    this.setData({
      isPunitive: getApp().globalData.isPunitive,
    });
  },

  //绑定新乐汇账号
  punitiveBtnClick:function(e){
    wx.navigateTo({
      url: '/pages/personal-center/register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //联系客服
  phoneClick:function(e){
    wx.makePhoneCall({
      phoneNumber: '4006858188'
    })
  },


  //获取个人信息数据
  personCenterHttpRequest: function () {

    let param = {

    }

    tool.request(apiUrl.user.personCenter, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      this.setData({
        phone: data.bindMobile
      })

    }, err => {

    })
  },
})