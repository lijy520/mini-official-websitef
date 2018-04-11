// pages/Info-auth/index/index.js
import apiUrl from '../../../../api-url.js'
import * as tool from '../../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.queryWithAuthenticateHttpRequest();
  },
  
  queryWithAuthenticateHttpRequest: function () {

    let param = {}


    tool.request(apiUrl.shop.queryWithAuthenticate, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
        

        this.setData({
          dataArr: data
        })

        console.log(this.data.dataArr);
    }, err => {
      wx.hideLoading()
    })
  },

  //身份认证
  personalCardClick:function(e){
    let index = e.currentTarget.dataset.index
    let jsonStr = JSON.stringify(this.data.dataArr[index])

     wx.navigateTo({
       url:  "/pages/personal-center/info-auth/identity-auth/identity-auth?model=" + jsonStr,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  },
})