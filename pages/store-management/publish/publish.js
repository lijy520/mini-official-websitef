// pages/store-management/publish/publish.js
import apiUrl from '../../../api-url.js'
import * as tool from '../../../tool.js' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:2,
    shopId:0,
    price:"-",//单位为元

    disabled:true,
    orderNo:"",
  },

  onLoad: function (options) {
    this.setData({
      status: options.status, 
      shopId: options.shopId
    });
    new getApp().WeToast()
    this.preparePublishHttpRequest();
  },


  buyClick:function (){
    this.payHttpRequest();
  },

  //获取用户支付信息
  preparePublishHttpRequest: function () {

    let param = {
      shopId: this.data.shopId,
    }

    wx.showLoading({
      title: '数据加载中',
    })


    tool.request(apiUrl.shop.preparePublish, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()
      /*
        payStatus
         0  待支付     1  支付成功  -1  支付失败   3 已退款
      */


      if (data.payStatus == 0){

      }

      var price = data.price/100
      this.setData({
        price: price,
        orderNo: data.orderCode,
        openid: data.openId,
        disabled:false,
      });

    }, err => {
      this.wetoast.toast({
        img: '',
        title: err.message,
      })

      wx.hideLoading()
    })
  },
  
  //支付
  payHttpRequest: function () {

    let param = {
      orderNo: this.data.orderNo,
      tradeType: "JSAPI",
      openid: this.data.openid,
      billType: "13",
    }

    wx.showLoading({
      title: '数据加载中',
    })


    tool.request(apiUrl.shop.pay, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()


    }, err => {
      this.wetoast.toast({
        img: '',
        title: err.message,
      })
      wx.hideLoading()
    })
  },

  
})