// pages/staffList/staffList.js
import { fetchStaffList } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffList: {},
    startDate: '',
    endDate: '',
    pageNumber: 0,
    pageSize: 15,
    loadingStatus: 0,
    dateStr:'全部',
    show: false,
    minDate: new Date(2020, 0, 1).getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onRefresh();
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

  handleCall: function (event) {
    const { phone } = event.currentTarget.dataset;
    if( phone ) {
      wx.makePhoneCall({
        phoneNumber: phone,
      });
    }
  },
  formatDate: function (date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },

  formatDateArg: function () {
   const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },

  onDisplay: function (params) {
    this.setData({ show: true });
  },

  onClose: function (e) {
    this.setData({ show: false });
  },

  onConfirm: function (event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      startDate:`${this.formatDate(start)}`,
      endDate: `${this.formatDate(end)}`,
      dateStr: `${this.formatDate(start)} 至 ${this.formatDate(end)}`,
    });
    this.onRefresh();
  },

  onLoadMore: async function (e) {
    const { pageNumber, pageSize, startDate, endDate, loadingStatus, staffList} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
      startDate,
      endDate,
    };
    try {
      const res = await fetchStaffList(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          staffList: res.data.content,
        })
      } else {
        this.setData({
          staffList: staffList.concat(res.data.content),
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
    } catch (error) {
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