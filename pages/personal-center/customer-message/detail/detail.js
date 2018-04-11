// pages/customer-message/detail/detail.js
import apiUrl from '../../../../api-url.js'
import * as tool from '../../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      name: '',
      phone: '',
      createTime: '',
      leaveWord: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let model = JSON.parse(options.model);
    this.setData({
      info:model
    });

    this.signWebLeaveWordToReadHttpRequest();
  },



  //查询留言列表网络请求
  signWebLeaveWordToReadHttpRequest: function () {
    let param = {
      "leaveWordId": this.data.info.id
    }


    tool.request(apiUrl.user.signWebLeaveWordToRead, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {

    }, err => {
      console.log(err)
     
    })
  }

})