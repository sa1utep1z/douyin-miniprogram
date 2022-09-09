// pages/resignApply/resignApply.js
import { listFeedback } from '../../api/commonApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,
    });
    this.onLoadMore();
  },

  onLoadMore: async function () {
    const { pageNumber, feedbackList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    }
      const res = await listFeedback(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          feedbackList: res.data.content,
        })
      } else {
        this.setData({
          feedbackList: feedbackList.concat(res.data.content),
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