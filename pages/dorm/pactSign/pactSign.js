// pages/dorm/pactSign/pactSign.js
import { signDorm } from '../../../api/dorm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreePact: false,
    imgInfo: {}, // 表示的是签字生成的图片对象信息，由签完字返回。
    signText: '签字',
    canSign: false,
    onlyView: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { onlyView } = options;
    if (onlyView) {
      this.setData({
        onlyView
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 监听签完字事件
    const { imgInfo } = this.data;
    if (imgInfo.fileKey) {
      this.onSign(imgInfo.fileKey);
      this.setData({
        signText: '已签字，正在跳转申请页面...',
        canSign: false,
      })
      // todo：跳转页面
      setTimeout(function() {
        // 不会被返回到pactSign该页面
        wx.redirectTo({
          url: '../stayApply/stayApply',
        });
      }, 2000);
    }
  },
  onSign: async function(imgKey) {
    // 上传签字信息并完成签署
    const params = { signImgKey: imgKey }
    await signDorm(params);
    // 清空签署信息
    this.setData({
      imgInfo: {},
    })
  },
  switch2Change: function(e) {
    const { value } = e.detail;
    this.setData({
      agreePact: value,
      canSign: value,
    })
  },
  signClick: function (e) {
    const { agreePact } = this.data;
    if (!agreePact) {
      wx.showToast({
        title: '请先勾选阅读条款',
        icon: 'none',
      });
      return;
    }
    wx.navigateTo({
      url: '../../sign/sign',
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})