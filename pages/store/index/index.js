// pages/store/index/index.js
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
      model: model
    });

    console.log(model)


    /*  
        componentType 字段判断类型
        1   无标题段落
        2   有标题段落

        11  图片1X1
        12  图片1X2
        13  图片1X3
        21  商品组图文左右混排
        22  商品组图文组合混排 (一行两个)
        23  商品组图文上下混排
    */
  },

  phoneClick:function (){
    let phone = this.data.model.mobile

    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  

  goodCellClick:function(e){
      console.log(e)
      let goodindex = e.currentTarget.dataset.goodindex
      let templateindex = e.currentTarget.dataset.templateindex


      let goodModel = this.data.model.templates[0].templateComponents[templateindex].components[templateindex];
      console.log(goodModel);


      let jsonStr = JSON.stringify(goodModel)

      wx.navigateTo({
        url: '/pages/store/product-detail/product-detail?model=' + jsonStr,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
})