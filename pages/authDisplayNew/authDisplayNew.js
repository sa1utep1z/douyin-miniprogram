// pages/authDisplay/authDisplay.js
import { fetchCertificationInfo } from '../../api/userApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authData: {}
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
    this.getUserAuthInfo();
  },

  getUserAuthInfo: async function (e) {
    const res = await fetchCertificationInfo();
    this.setData({
      authData: res.data
    });
  },
  /**
   * 编辑实名信息
   */
  handleEdit: function () {
    tt.navigateTo({
      url: '../../pages/authCenterNew/authCenterNew'
    });
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

  }
});