// pages/store-management/edit/paragraph/paragraph.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type;
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
  handleSubmit(e) {
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 1 - 1];
    if (prePage) {
      prePage.handleParagraphSubmit({ type: this.data.type, value: e.detail.value });
    }

    wx.navigateBack();
  }
})