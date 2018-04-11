// pages/store-management/index/index.js
import apiUrl from '../../../api-url.js'
import * as tool from '../../../tool.js' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    
  },

  onShow:function (){
    this.queryWithAuthenticateHttpRequest();
  },

  cellClick:function(e){
    let index = e.currentTarget.dataset.index
    let jsonStr = JSON.stringify(this.data.dataArr[index])

     wx.navigateTo({
       url: '/pages/store/index/index?model=' + jsonStr,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  },


  queryWithAuthenticateHttpRequest: function () {
    //当shopId不为空或者不为0时，查询某个店铺信息（包含模板信息） 反之，查询该用户下所有店铺信息
    //参数shopId不为空且不为0；返回结果：isOneself为1，代表是自己点开链接，为2则是别人点开链接
    let param = {
      shopId:0
    }

    wx.showLoading({
      title: '数据加载中',
    })


    tool.request(apiUrl.shop.queryShopWithTemplate, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()
      //status  1 已完成  2 已发布 3 已废弃
      this.setData({
        dataArr: data.shopList
      })

      console.log(this.data.dataArr);
    }, err => {
      wx.hideLoading()
    })
  },

  //编辑
  editingClick: function (e) {
    let index = e.currentTarget.dataset.index
  },

  //分享
  shareClick: function (e) {
    let index = e.currentTarget.dataset.index

    wx.showActionSheet({
      itemList: ['生成本地图片', '分享微信好友'],
      success: function (res) {
        console.log(res.tapIndex)

        this.onShareAppMessage();
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //发布
  publishClick:function (e){
    console.log(e)

    let index = e.currentTarget.dataset.index
    let status = this.data.dataArr[index].status
    let shopId = this.data.dataArr[index].id

    wx.navigateTo({
      url: '/pages/store-management/publish/publish?status=' + status + "&shopId="+shopId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  onShareAppMessage() {
    let that = this;
    return {
      title: '您好，这是我的名片',
      path: '/pages/backPage/backPage?shareCode=' + getApp().globalData.shareCode + '&id=' + that.data.cardList[that.data.currentIdx].info.id,
      success: function () {
        // 转发成功
        console.log(getApp().globalData.shareCode)
        console.log('转发成功')
      },
      fail: function () {
        // 转发失败
        console.log('转发失败')
      }
    }
  }
})