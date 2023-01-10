// pages/expandPosterView/expandPosterView.js
import { listExpandPosterTemplate } from '../../api/expandPoster'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 16,
    pageNumber: 0,
    imgList: [],
    loadingStatus: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.onRefresh();
  },
  posterImgClick: function(e) {
    const { bean } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/expandPoster/expandPoster?expandTempId=${bean.id}`,
    });
  },
  onLoadMore: async function (e) {
    const { pageNumber, imgList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize
    };
    const res = await listExpandPosterTemplate(params);
    const totalPages = res.data.totalPages;
    if(pageNumber === 0) {
      this.setData({
        imgList: res.data.content,
      })
    } else {
      this.setData({
        imgList: imgList.concat(res.data.content),
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