// pages/custom-made/custom-made.js
import apiUrl from '../../../../api-url.js'
import * as tool from '../../../../tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      {
        content:"官网类",
        isSelected:true,
      },
      {
        content: "电商类",
        isSelected: false,
      },
      {
        content: "门店类",
        isSelected: false,
      },
      {
        content: "官网类",
        isSelected: false,
      },
      {
        content: "门店类",
        isSelected: false,
      },
    ],


    budgetList: [
      {
        content: "1万以内",
        isSelected: true,
      },
      {
        content: "1-3万",
        isSelected: false,
      },
      {
        content: "3-5万",
        isSelected: false,
      },
      {
        content: "5-10万",
        isSelected: false,
      },
      {
        content: "10-30万",
        isSelected: false,
      },
      {
        content: "30万以上",
        isSelected: false,
      },
    ],

    //当前选中的需求类型下标
    selecetedTypeIndex:0,
    //当前选中的费用预算下标
    selecetedBudgetIndex:0,
    supplement:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.customCategoriesHttpRequest();
  },
  

  //获取定制信息网络请求
  customCategoriesHttpRequest: function () {
    let param = {
      "shortUnionId": getApp().globalData.shortUnionId,
      "unionId": getApp().globalData.unionId,
    }

    wx.showLoading({
      title: '',
    })

    tool.request(apiUrl.user.customCategories, getApp().globalData.nowToken, param, getApp().globalData.unionId).then(data => {
      wx.hideLoading()

      var requireTypes = data.requireTypes;
      if (requireTypes.length > 0) {
        requireTypes[0].isSelected = true;
      }
      

      var budgetMoneys = data.budgetMoneys;
      if (budgetMoneys.length > 0) {
        budgetMoneys[0].isSelected = true;
      }


      this.setData({
        typeList: requireTypes,
        budgetList: budgetMoneys,
      });

      
    }, err => {

      wx.hideLoading()
    })
  },



  //需求类型
  typeBtnClick:function(e){
    let index = e.currentTarget.dataset.index

    var typeList = this.data.typeList
    for (let i = 0; i < this.data.typeList.length;i++){
      typeList[i].isSelected = false;
    }
    typeList[index].isSelected = true;

    this.setData({
      typeList: typeList,
      selecetedTypeIndex:index
    });
  },

  //费用预算
  budgetBtnClick: function (e) {
    let index = e.currentTarget.dataset.index

    var budgetList = this.data.budgetList
    for (let i = 0; i < this.data.budgetList.length; i++) {
      budgetList[i].isSelected = false;
    }
    budgetList[index].isSelected = true;

    this.setData({
      budgetList: budgetList,
      selecetedBudgetIndex: index
    });
  },


  /**
   * 补充说明输入框输入方法
   */
  supplementInputClick: function (e) {
    this.data.supplement = e.detail.value;
  },
 
  //下一步
  nextBtnClick:function(){
    

    let requireType = this.data.typeList[this.data.selecetedTypeIndex].content
    requireType = requireType.length ? requireType:""

    let budgetMoney = this.data.budgetList[this.data.selecetedBudgetIndex].content
    budgetMoney = budgetMoney.length ? budgetMoney : ""


    wx.navigateTo({
      url: '/pages/personal-center/custom-made/contact-info/contact-info?requireType=' + requireType + "&budgetMoney=" + budgetMoney + "&supplement=" + this.data.supplement,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
})