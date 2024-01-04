// pages/expandPosterView/expandPosterView.js
import { listExpandPosterTemplate } from '../../api/expandPoster';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 16,
    pageNumber: 0,
    imgList: [],
    loadingStatus: 0,
    listSearchType: 0,
    posterTypes: [
    { title: '全部', value: '' },
    { title: '早安', value: 'EXPAND_INVITATION_MORNING' },
    { title: '晚安', value: 'EXPAND_INVITATION_NIGHT' },
    { title: '节日节气', value: 'EXPAND_INVITATION_FESTIVAL' },
    { title: '正能量', value: 'EXPAND_INVITATION_JUST' },
    { title: '预约活动', value: 'EXPAND_INVITATION_PREPARE' },
    { title: '其他', value: 'EXPAND_INVITATION_OTHER' }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.onRefresh();
  },
  onTabClicked: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      listSearchType: index
    });
    this.onRefresh();
  },
  posterImgClick: function (e) {
    const { bean } = e.currentTarget.dataset;
    tt.navigateTo({
      url: `../../pages/expandPoster/expandPoster?expandTempId=${bean.id}`
    });
  },
  onLoadMore: async function (e) {
    const { pageNumber, imgList, pageSize, loadingStatus, posterTypes, listSearchType } = this.data;
    if (loadingStatus !== 0) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const adjunctType = posterTypes[listSearchType].value;
    const params = {
      adjunctType,
      pageNumber,
      pageSize
    };
    const res = await listExpandPosterTemplate(params);
    const totalPages = res.data.totalPages;
    if (pageNumber === 0) {
      this.setData({
        imgList: res.data.content
      });
    } else {
      this.setData({
        imgList: imgList.concat(res.data.content)
      });
    }
    if (pageNumber < totalPages - 1) {
      this.setLoadingReady();
      this.setData({
        pageNumber: pageNumber + 1
      });
    } else {
      this.setLoadingNoMore();
    }
  },
  onRefresh: function (e) {
    this.setLoadingReady();
    this.setData({
      pageNumber: 0
    });
    this.onLoadMore();
  },
  setLoadingStart: function () {
    this.setData({
      loadingStatus: 1
    });
  },
  setLoadingReady: function () {
    this.setData({
      loadingStatus: 0
    });
  },
  setLoadingNoMore: function () {
    this.setData({
      loadingStatus: 2
    });
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
});