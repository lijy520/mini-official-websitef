import apiUrl from '../../../../api-url.js'
import * as tool from '../../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        param: options
      });

      new getApp().WeToast()
  },

  upDataSubmit: function (e) {

    let name = e.detail.value.name;
    let telephone = e.detail.value.telephone;


    if(name.length == 0){
      this.wetoast.toast({
        img: '',
        title: "请输入您的真实姓名",
      })

      return;
    }

    if (telephone.length == 0) {
      this.wetoast.toast({
        img: '',
        title: "请输入正确的手机号",
      })

      return;
    }

    this.saveHttpRequest(name,telephone);
    
  },

  //保存定制升级信息网络请求
  saveHttpRequest: function (name, telephone) {
    let param = this.data.param
    param["name"] = name;
    param["telephone"] = telephone;

    wx.showLoading({
      title: '',
    })

    tool.request(apiUrl.user.save, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()


      wx.navigateTo({
        url: '/pages/personal-center/custom-made/customSuccess/customSuccess',
      })
    }, err => {
      this.wetoast.toast({
        img: '',
        title: err.message,
      })
      wx.hideLoading()
    })
  },


})