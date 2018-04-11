// pages/redeem-code/redeem-code.js
import apiUrl from '../../../api-url.js'
import * as tool from '../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrCode:"123456"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qrCodeHttpRequest();
  },

  qrCodeHttpRequest: function () {
    let param = { 
                  "sceneStr": getApp().globalData.shortUnionId,
                  "appId":5,
                  "unionId": getApp().globalData.unionId,
                }

    wx.showLoading({
      title: '正在加载。。。',
    })

    tool.request(apiUrl.user.generateQrCode, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()
        this.setData({
          qrCode: "456789"//data.miniQrUrl
        });
    }, err => {
  alert("123456789");
      wx.hideLoading()
    })
  },
})