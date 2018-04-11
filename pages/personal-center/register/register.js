import apiUrl from '../../../api-url.js'
import * as tool from '../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fcPhone: false,
    fcVerificationCode: false,
    fcPassword: false,
    fcInvitationCode: false,

    isPhoneFc: false,
    isVerificationCodeFc: false,
    isPasswordFc: false,
    isInvitationCodeFc: false,

    phone: '',
    verificationCode: '',
    password: '',
    invitationCode: '',

    txtGetVerificationCode: '获取',
    txtToggleDisplayPassowrd: '显示',

    hiddenPassword: true,


    isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new getApp().WeToast()
  },


  //注册
  handleFormSubmit() {
    if (this.data.phone.length == 0 || this.data.phone.length < 11) {
      this.wetoast.toast({
        img: '',
        title: "手机号格式有误",
      })
      return;
    }

    if (this.data.verificationCode.length == 0 || this.data.verificationCode.length < 6) {
      this.wetoast.toast({
        img: '',
        title: "验证码格式有误",
      })
      return;
    }

    if (this.data.password.length == 0) {
      this.wetoast.toast({
        img: '',
        title: "请输入您的密码",
      })
      return;
    }

    this.registerRequest();
  },

  handleInputFocus(ev) {
    console.log('focus', ev);
    let name = ev.currentTarget.dataset.name;
    name = 'is' + name[0].toUpperCase() + name.substring(1) + 'Fc';
    this.setData({ [name]: true });
  },

  handleInputBlur(ev) {
    console.log('blur', ev);
    let name = ev.currentTarget.dataset.name;
    name = 'is' + name[0].toUpperCase() + name.substring(1) + 'Fc';
    this.setData({ [name]: false });
  },


  handleInputInput(ev) {
    console.log('input', ev);
    let name = ev.currentTarget.dataset.name;
    this.setData({ [name]: ev.detail.value });
  },


  //点击获取按钮
  handleGetVerificationCode() {
    if (this.data.phone.length == 0 || this.data.phone.length < 11){
      this.wetoast.toast({
        img: '',
        title: "手机号格式有误",
      })
      return;
    }

    this.getCodeRequest();
  },


  changeGetCodeTitle:function(){
    if (this.data.txtGetVerificationCode != '获取') {
      return;
    }

    let countDown = () => {
      setTimeout(() => {
        let txt = this.data.txtGetVerificationCode;
        let second = Number(txt.substring(0, txt.length - 1));
        if (second > 1) {
          this.setData({ txtGetVerificationCode: (second - 1) + 's' }, countDown);
        } else {
          this.setData({ txtGetVerificationCode: '获取' });
        }
      }, 1000);
    };

    this.setData({ txtGetVerificationCode: '60s' }, countDown);
  },

  handleToggleDisplayPassword() {
    let hiddenPassword = !this.data.hiddenPassword;
    let txtToggleDisplayPassowrd = hiddenPassword ? '显示' : '隐藏';
    let fcPassword = true;
    this.setData({
      hiddenPassword,
      txtToggleDisplayPassowrd,
      fcPassword
    });
  },










  /**
   * 获取验证码请求
   */
  getCodeRequest: function () {
    let param = {
      mobile: this.data.phone,
      serviceType: 4
    }

    tool.request(apiUrl.user.code, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()

      this.wetoast.toast({
        img: '',
        title: "验证码发送成功",
      })
      this.changeGetCodeTitle();
    }, err => {
      this.wetoast.toast({
        img: '',
        title: err.message,
      })
      wx.hideLoading()
    })
  },


  /**
   * 注册
   */
  registerRequest: function () {
    if (this.data.isLoading){
      return;
    }

    this.setData({
      isLoading : true,
    });

    let param = {
      account: this.data.phone,
      password: this.data.password,
      smsCode: this.data.verificationCode,
      invitationCode: this.data.invitationCode,
    }

    wx.showLoading({
      title: '',
    })

    tool.request(apiUrl.user.register, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()

      getApp().globalData.isPunitive = true;

      this.setData({
        isLoading: false,
      });

      this.wetoast.toast({
        img: '',
        title: "绑定成功",
      })
      wx.switchTab({
        url: '/pages/personal-center/index/index'
      })
    }, err => {
      this.wetoast.toast({
        img: '',
        title: err.message,
      })

      this.setData({
        isLoading: false,
      });
      wx.hideLoading()
    })
  },
})