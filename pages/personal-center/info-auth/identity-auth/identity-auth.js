// pages/identity-authentication/identity-authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = JSON.parse(options.model);
    this.setData({
      model:model,
    });
    
    console.log(model)
  },

  //身份证正面
  personalCardFrontBtnClick:function(e){
      console(e);
  },

  //身份证背面
  personalCardBackBtnClick:function(e){
      console(e);
  },
})