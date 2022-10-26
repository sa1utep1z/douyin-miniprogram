// pages/authDisplay/authDisplay.js
import { fetchContactsInfo, submitContactsInfo } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urgentName: '',
    urgentMobile: '',
    urgentRelation: '',
    typeIndex: '',
    typeOptions: [
      { title: '朋友', value: 'FRIEND' },
      { title: '父母', value: 'PARENT' },
      { title: '儿女', value: 'CHILDREN' },
      { title: '兄弟姐妹', value: 'BROTHER_OR_SISTERS' },
      { title: '配偶', value: 'SPOUSE' },
      { title: '亲戚', value: 'RELATIVE' },
    ],

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
    this.getContanctsInfo();
  },

  getContanctsInfo: async function (e) {
    const res = await fetchContactsInfo();
    const { urgentName, urgentMobile, urgentRelation } = res.data;
    const { typeOptions } = this.data;
    this.setData({
      urgentName,
      urgentMobile,
      typeIndex: urgentRelation ? typeOptions.findIndex((v) => v.value === urgentRelation) : ''
    });
  },

  submitData: async function (e) {
    const { urgentName, urgentMobile, typeIndex, typeOptions } = this.data;
    const params = { 
      urgentName, 
      urgentMobile,
      urgentRelation: typeOptions[typeIndex].value,
    };
    await submitContactsInfo(params);
    wx.showToast({
      title: '提交成功',
      icon:'none',
      duration: 2500
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2000);


  },
  onInputName: function (e) {
    this.setData({
      urgentName: e.detail.value,
    })
  },
  onInputMobile: function (e) {
    this.setData({
      urgentMobile: e.detail.value,
    })
  },
  bindPickerType: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
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
})