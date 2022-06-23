// pages/authCenter/AuthCenter.js
import { fetchAuthInfo, twoFactorAuthentication, sendCode } from '../../api/userApi'
import {idCardNoCheck} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idCard: '',
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserAuthInfo();
  },

  getUserAuthInfo: async function (e) {
    const res = await fetchAuthInfo();
    this.setData({
      name: res.data.bindUserName,
      idCard: res.data.bindIdNo,
    });
  },

  onInputName: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },

  onInputIDCard: function (e) {
    this.setData({
      idCard: e.detail.value,
    })
  },

  /**
   * 提交实名
   * @param {*} e 
   */
  handleConfirm: async function (e) {
    const { name, mobile, smsCode, idCard } = this.data;
      if(name===null||name.length===0){
        wx.showToast({
          title: '请输入真实姓名',
          icon:'none',
          duration: 1800
        });
        return;
      }
      if(idCard===null || idCard.length===0 || !idCardNoCheck(idCard)){
        wx.showToast({
          title: '请输入有效身份证号',
          icon:'none',
          duration: 1800
        });
        return;
      }
      const res = await twoFactorAuthentication({
        name,
        idNo: idCard
      });
      if (res.code !== 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'error',
          duration: 1500
        });
      } else {
        wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      });
      wx.navigateBack({
        delta: 0,
      })
      }
      
  },
   jumpPrivacy(){
    wx.navigateTo({
      url: '../privacyProtocol/privacyProtocol',
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
})