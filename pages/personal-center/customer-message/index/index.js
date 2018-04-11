// pages/customer-message/index/index.js
import apiUrl from '../../../../api-url.js'
import * as tool from '../../../../tool.js'
import * as utils from '../../../../util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:null,
    loadMoreTip: "上拉加载更多数据",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.leaveWordsHttpRequest();
    new getApp().WeToast()
  },

  //查询留言列表网络请求
  leaveWordsHttpRequest: function () {
    let param = {
      "shortUnionId": getApp().globalData.shortUnionId,
      "unionId": getApp().globalData.unionId,
    }

    wx.showLoading({
      title: '',
    })

    tool.request(apiUrl.user.leaveWords, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()

      var dataArr = data;
      console.log(dataArr);

      for (let i = 0; i < dataArr.length;i++){
        dataArr[i].createTime = utils.formatTime(dataArr[i].createTime / 1000, 'Y-M-D h:m')
      }

      this.setData({
        dataArr: dataArr
      });
    }, err => {
      console.log(err)
      // this.wetoast.toast({
      //   img: '',
      //   title: err.message,
      // })
      wx.hideLoading()
    })
  },



  cellClick:function(e){
    let index = e.currentTarget.dataset.index
    let jsonStr = JSON.stringify(this.data.dataArr[index])

      wx.navigateTo({
        url: '/pages/personal-center/customer-message/detail/detail?model=' + jsonStr,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
})