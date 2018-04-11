// pages/store-management/create-store/create-store.js
import ApiUrl from '../../../api-url';
import * as Tool from '../../../tool';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "",
    shopName: "",
    shopAddress: "",
    shopPrincipal: "",
    phone: "",
    verificationCode: "",
    license: "",
    avatar: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  handleUpload(e) {
    let name = e.currentTarget.dataset.type;
    Tool.wx.chooseImage({ count: 1 })
      .then(img => {
        return Tool.wx.uploadFile({
          url: ApiUrl.file,
          filePath: img.tempFilePaths[0],
          name: 'file'
        });
      })
      .then(file => {
        let res = JSON.parse(file.data);
        if (res.code > 0) {
          throw res.msg;
        }
        this.setData({ [name]: res.data.fullFilename });
      })
  },
  handleInput(e) {
    let name = e.currentTarget.dataset.type;
    this.setData({ [name]: e.detail.value });
  },
  checkFields() {
    let msg = "";

    if (!this.data.shopName) msg = "店铺名称必填";
    else if (this.data.shopName.length > 20) msg = "店铺名称最长 20 字";
    else if (!this.data.shopAddress) msg = "店铺地址必填";
    else if (this.data.shopAddress.length > 40) msg = "店铺地址最长 40 字";
    else if (!this.data.shopPrincipal) msg = "负责人必填";
    else if (!this.data.phone) msg = "联系电话必填";
    else if (!this.data.license) msg = "营业执照未上传";
    else if (!this.data.avatar) msg = "门头照未上传";

    if (msg) {
      wx.showToast({ title: msg, icon: 'none' });
      return false;
    }
    return true;
  },
  checkPhone() {
    if (!this.data.phone || !/^1\d{10}$/.test(this.data.phone)) {
      // this.fcPhone = true;
      wx.showToast({ title: '手机号码错误', icon: 'none' });
      return false;
    }
    return true;
  },
  handleFormSubmit() {
    if (!this.checkFields() || !this.checkPhone()) {
      return;
    }

    let token = app.globalData.nowToken;
    let unionId = app.globalData.unionId;

    let param = {
      address: this.data.shopAddress,
      avatar: this.data.avatar,
      head: this.data.shopPrincipal,
      license: this.data.license,
      logo: this.data.logo,
      mobile: this.data.phone,
      shopName: this.data.shopName,
      verificationCode: 111111
    };

    Tool.request(ApiUrl.shop.saveOrUpdate, token, param, unionId)
      .then(data => {
        wx.redirectTo({ url: '/pages/store-management/edit/index/index?shopId=' + data });
      }, err => {
        wx.showToast({ title: err.message, icon: 'none' });
      });
  }
})