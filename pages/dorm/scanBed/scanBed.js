// pages/dorm/scanBed/scanBed.js
import { fetchScanBedInfo, submitConfirmBed } from '../../../api/dorm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanBedInfo: {},
    noneDataTip: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { bedId } = options;
    if (bedId) {
      this.getScanBedInfo(bedId);
    } else {
      this.setData({
        noneDataTip: '获取床位信息失败',
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
  getScanBedInfo: async function(bedId) {
    await fetchScanBedInfo(bedId).then((res) => {
      this.setData({
        scanBedInfo: res.data,
      })
    }).catch((err) => {
      this.setData({
        noneDataTip: err.msg,
      })
    });
    
  },
  confirmLiveIn: async function() {
    const { scanBedInfo } = this.data;
    if (!scanBedInfo.id) {
      wx.showToast({
        title: '信息缺失',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    await submitConfirmBed(scanBedInfo.id);
    scanBedInfo.canLiveIn = false;
    scanBedInfo.buttonName = '已确认';
    this.setData({
      scanBedInfo,
    })
    wx.showToast({
      title: '已确认',
      icon: 'success',
      duration: 2000
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