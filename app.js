//app.js
import * as Tool from './tool';
import ApiUrl from './api-url.js';

let { WeToast } = require("/common/template/wetoast/wetoast.js");


App({
  WeToast,
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)


    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    this.login();
  },

  onReady(callback) {
    if (this.globalData.isReady) {
      callback(this.globalData.loginErr);
      return;
    }

    this.globalData.readyCallbackList.push(callback);
  },

  login() {
    if (this.globalData.isLogining) {
      return;
    }
    this.globalData.isLogining = true;
    Tool.login()
      .then(data => {
        console.log("----",data,"----------");
        this.globalData.userInfo = data.userInfo;
        this.globalData.nowToken = data.loginInfo.token;
        this.globalData.unionId = data.loginInfo.unionId;
        if (data.loginInfo.hasOwnProperty("userId")){
          this.globalData.isPunitive = true;
        }else {
          this.globalData.isPunitive = false;
        }

        this.globalData.shortUnionId = data.loginInfo.shortUnionId;
        this.globalData.sharePicSwitch = data.loginInfo.sharePicSwitch;
        this.globalData.isReady = true;
        this.globalData.isLogining = false;
        this.globalData.readyCallbackList.forEach(cb => cb());

      }, err => {
        console.log("+++++++++", err, "+++++++");

        this.globalData.loginErr = err;
        this.globalData.isReady = true;
        this.globalData.isLogining = false;
        console.log('login error:', err);

        if (err.code == -100) {
          wx.navigateBack();

        } else {
          this.globalData.readyCallbackList.forEach(cb => cb(err));
        }
      })
  },



  globalData: {
    isLogining: false,
    isReady: false,
    loginErr: null,
    readyCallbackList: [],

    userInfo: null,
    nowToken: null,
    unionId: null,
    isPunitive: false,//是否绑定过小程序   根据是否返回userId判断
    shortUnionId: null,
    hongbaoSet: null,

    // 模拟同步锁，防重复点击
    isClick: false,

    // 分享图开关
    sharePicSwitch: '',
    // 静态码
    shareUrl: [],
    disabled: false,
  }
})