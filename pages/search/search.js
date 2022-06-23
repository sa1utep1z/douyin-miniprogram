// pages/search/search.js
import { fecthSerarchResult } from '../../api/jobApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusNavBarHeight: 0,
    navBarHeight: 0,
    height: 0,
    top: 0,
    jobList: [],
    pageSize: 15,
    pageNumber: 0,
    jobList: [],
    loadingStatus: 0,
    keyWord: '',
    totalPages: 0,
    showSignDialog: false,
    jobId: '',
    emptyText: '请输入岗位名称或者公司名称进行搜索',
    emptyHint: '对不起，暂时没有找到相关岗位请换个条件试试',
    phoneNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getStatusBarHeight: function () {
    // 获取状态栏高度
    const { statusBarHeight } = wx.getSystemInfoSync();
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonObject;
    // 计算导航栏的高度
    // 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    const navBarHeight = height + (top - statusBarHeight) * 3;
    // 计算状态栏与导航栏的总高度
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    this.setData({
      navBarHeight,
      statusNavBarHeight,
      height,
      top,
    });
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
    this.getStatusBarHeight();
    this.fecthData();
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

  //加载更多
  onLoadMore: function (e) {
    this.fecthData();
  },
  //调用接口的方法
  fecthData: async function (e) {
    const { loadingStatus } = this.data;
    const   { keyWord, pageNumber, pageSize, jobList ,emptyHint } = this.data;
    if (loadingStatus !== 0 ||keyWord === '') {
      console.log('抛弃无效请求');
      return;
    } 
    this.setLoadingStart();
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    const params = {
      keyWord,
      pageNumber,
      pageSize,
      gps: {
        latitude,
        longitude,
      }
    }
    const res = await fecthSerarchResult(params);
    const totalPages = res.data.totalPages
    this.setData({
      jobList: res.data.content,
      totalPages: res.data.totalPages,
      emptyText: emptyHint,
    });
    if (pageNumber === 0) {
      this.setData({
        jobList: res.data.content,
      });
    } else {
      this.setData({
        jobList: jobList.content(res.data.content),
      });
    }
    if(pageNumber < totalPages-1) {
      this.setData({
        pageNumber: pageNumber + 1,
      });
      this.setLoadingReady();
    } else {
      this.setLoadingNoMore();
    }
  },
  //处理输入框失焦
  handleSearchBlur: async function (e) {
    console.log('handleSearchBlur');
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,
    });
    this.fecthData();
  },
  //处理输入
  handleSearchInput: function (e) {
    const { value } = e.detail;
    this.setData({
      keyWord: value,
    });
  },
  //重置输入框内容
  handleRest: function (e) {
    console.log(e);
    this.setData({
      keyWord: '',
    });
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

  onChangeDialog: function (e) {
    this.setData(({
      showSignDialog: e.detail,
    }))
  },
  onSignUp: function (e) {
    const { id } = e.currentTarget.dataset;
    const { showSignDialog } = this.data;
    console.log(id);
    if( !showSignDialog ) {
      this.setData({
        jobId: id,
        showSignDialog: true,
      });
    }   
  },
  handleItemClick: function (e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/jobDetail/jobDetail?jobId=${item.id}`,
    });
  }, 

  handleBack: function (e) {
    wx.navigateBack({
      delta: 1,
    });
  },

  callPhone: function (params) {
    const { phoneNumber } = this.data;
    wx.makePhoneCall({
      phoneNumber,
    });
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