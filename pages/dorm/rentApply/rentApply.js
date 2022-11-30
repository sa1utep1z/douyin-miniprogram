// pages/dorm/stayApply/stayApply.js
import { submitRent } from '../../../api/dorm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreePact: false,
    canSubmit: false,
    rentType: '',
    editHometown: '',
    signImgKey: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { signImgKey } = options;
    if (signImgKey) {
      this.setData({
        signImgKey,
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
    
  },
  switch2Change: function(e) {
    const { value } = e.detail;
    this.setData({
      agreePact: value,
      canSubmit: value,
    })
  },
  changeRentType: function (e) {
    this.setData({
      rentType: e.detail.value
    })
  },
  rediectPact: function(e) {
    wx.navigateTo({
      url: '../rentSign/rentSign?onlyView=true',
    });
  },
  bindRentAddress: function(e) {
    this.setData({
      rentAddress: e.detail.value,
    })
  },
  submitData: async function() {
    const { agreePact, rentAddress, rentType, signImgKey } = this.data;
    if (!agreePact) {
      wx.showToast({
        title: '请先勾选阅读条款',
        icon: 'none',
      });
      return;
    }
    if (!rentType) {
      wx.showToast({
        title: '请选择外租类型',
        icon: 'none',
      });
      return;
    }
    if (!rentAddress) {
      wx.showToast({
        title: '请输入外租地址',
        icon: 'none',
      });
      return;
    }
    const params = {
      rentType,
      rentAddress,
      signImgKey,
    }
    await submitRent(params);
    this.setData({
      canSubmit: false,
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2000)
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