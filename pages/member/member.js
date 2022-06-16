// pages/member/member.js
import { fetchMemberList, fetchShareList } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 15,
    pageNumber: 0,
    memberList: [],
    loadingStatus: 0,
    recommendMobile: '---',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onRefresh();
    this.getRecommendInfo();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 拨打推荐人电话
  handlePhoneCall: function (e) {
    const { recommendMobile } = this.data;
    if(recommendMobile==='---'){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: recommendMobile,
    });
  },

  getRecommendInfo: async function (e) {
    const res = await fetchMemberList();
    if(res.data === null){
      return;
    }
    this.setData({
      recommendMobile: res.data.mobile||'---',
    })
  },
  onLoadMore: async function (e) {
    const { pageNumber, memberList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    };
      const res = await fetchShareList(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          memberList: res.data.content,
        })
      } else {
        this.setData({
          memberList: memberList.concat(res.data.content),
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
})