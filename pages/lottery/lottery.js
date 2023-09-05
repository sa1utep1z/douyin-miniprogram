// pages/lottery/lottery.js
import { listLotteryActivity } from '../../api/opshub'
import { fetchValidation } from '../../utils/validation'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 15,
    pageNumber: 0,
    activityList: [],
    loadingStatus: 0,
  },
  openWinningRecord: function () {
    wx.navigateTo({
      url: '/pages/winningRecord/winningRecord',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetchValidation().then(r => {
      if (r) {
        this.onRefresh();
      }
    })
  },
  activityClick: function(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/lotteryView/lotteryView?lotteryActivityId=' + id,
    })
  },
  onLoadMore: async function (e) {
    const { pageNumber, activityList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    };
    const res = await listLotteryActivity(params);
    const totalPages = res.data.totalPages;
    if(pageNumber === 0) {
      this.setData({
        activityList: res.data.content,
      })
    } else {
      this.setData({
        activityList: activityList.concat(res.data.content),
      })
    }
    if(pageNumber < totalPages-1){
      this.setLoadingReady();
      this.setData({
        pageNumber: pageNumber + 1,
      });
    } else {
      this.setLoadingNoMore();
    }
  },
  onRefresh: function (e) {
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,   
    });
    this.onLoadMore();
  },
  setLoadingStart: function () {
    this.setData({
      loadingStatus: 1,
    }) 
  },
  setLoadingReady: function () {
    this.setData({
      loadingStatus: 0,
    }) 
  },
  setLoadingNoMore: function () {
    this.setData({
      loadingStatus: 2,
    }) 
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