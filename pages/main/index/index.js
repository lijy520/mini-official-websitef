//index.js
//获取应用实例
const app = getApp();

const pages = [
  {
    "id": -1,
    "name": "个人中心",
    "pathName": "pages/personal-center/index/index",
    "query": ""
  },
  {
    "id": 1,
    "name": "信息认证-身份认证",
    "pathName": "pages/personal-center/info-auth/identity-auth/identity-auth",
    "query": ""
  },
  {
    "id": -1,
    "name": "定制升级",
    "pathName": "pages/personal-center/custom-made/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "定制升级-联系方式",
    "pathName": "pages/personal-center/custom-made/contact-info/contact-info",
    "query": ""
  },
  {
    "id": -1,
    "name": "客户留言",
    "pathName": "pages/personal-center/customer-message/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "客户留言-详细",
    "pathName": "pages/personal-center/customer-message/detail/detail",
    "query": ""
  },
  {
    "id": -1,
    "name": "推广码",
    "pathName": "pages/personal-center/redeem-code/redeem-code",
    "query": ""
  },
  {
    "id": -1,
    "name": "信息认证",
    "pathName": "pages/personal-center/info-auth/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "店铺管理",
    "pathName": "pages/store-management/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "发布",
    "pathName": "pages/store-management/publish/publish",
    "query": ""
  },
  {
    "id": -1,
    "name": "店铺",
    "pathName": "pages/store/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "商品详情",
    "pathName": "pages/store/product-detail/product-detail",
    "query": ""
  },
  {
    "id": -1,
    "name": "商品组",
    "pathName": "pages/store-management/edit/product/product",
    "query": ""
  },
  {
    "id": -1,
    "name": "私人订制",
    "pathName": "pages/main/personal-made/personal-made",
    "query": ""
  },
  {
    "id": -1,
    "name": "店铺管理-编辑",
    "pathName": "pages/store-management/edit/index/index",
    "query": ""
  },
  {
    "id": -1,
    "name": "信息认证-店铺资料",
    "pathName": "pages/personal-center/info-auth/store-info/store-info",
    "query": ""
  }
];

Page({
  data: {
    pages,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
