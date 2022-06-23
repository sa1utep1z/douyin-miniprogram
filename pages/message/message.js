// pages/message/message.js
import { fetchMessageType } from '../../api/messageApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTypeList: [],
  
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
    this.getMessageType();
  },
  handelWorkMessage: function (e) {
    const { bean } =  e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/message/workMessage/workMessage?messageType=${bean.code}`,
    });
  },
  handelSystemMessage: function (e) {
    const { bean } =  e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/message/systemMessage/systemMessage?messageType=${bean.code}`,
    });
  },
  handelAccountMessage: function () {
    wx.navigateTo({
      url: '../../pages/message/accountMessage/accountMessage',
    });
  },

  getMessageType: async function (e) {
    const res = await fetchMessageType();
    this.setData({
      messageTypeList: res.data,
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

  },
})