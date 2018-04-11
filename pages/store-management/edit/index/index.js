// pages/store-management/edit/index/index.js
import ApiUrl from '../../../../api-url';
import * as Tool from '../../../../tool';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: null,
    shop: null,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shopId = Number(options.shopId);

    app.onReady(() => {

      let token = app.globalData.nowToken;
      let unionId = app.globalData.unionId;
      let param = { shopId: this.data.shopId };
      Tool.request(ApiUrl.shop.queryShopWithTemplate, token, param, unionId)
        .then(data => {
          let shop = {};
          let list = [];
          if (data.shopList.length) {
            shop = data.shopList[0];
            if (shop.templates && shop.templates.length) {
              list = shop.templates[0].templateComponents;
            }
          }
          this.setData({ shop, list });
        });

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleMoveDown() {

  },
  handleMoveUp() {

  },
  handleDel() {

  },
  handleParagraphEdit(e) {
    let item = e.detail;
    wx.navigateTo({ url: '/pages/store-management/edit/paragraph/paragraph?type=' + item.componentType });
  },
  handleParagraphSubmit(data) {
    let token = app.globalData.nowToken;
    let unionId = app.globalData.unionId;
    let param = {
      componentId: '',
      componentType: data.type,
      paragraphs: [
        {
          title: data.value.title,
          context: data.value.content
        }
      ],
      shopId: this.data.shopId,
      sortIndex: 0,
      templateId: ''
    };
    Tool.request(ApiUrl.template.paragraph, token, param, unionId);
  },
  handleAppendComponent(e) {
    let type = e.detail;
    switch (type) {
      case 1:
      case 2:
        let data = { type, value: { title: '', content: '' } };
        this.handleParagraphSubmit(data);
        break;
      case 21:
      case 22:
      case 23:
        break
      case 31:
      case 32:
      case 33:
        break;
    }
  }
})