// pages/member/member.js
import { fetchBelongPersonList, updateReturnVisit } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listSearchType: 0,
    returnVisitType: [
      { title: '全部', value: ''},
      { title: '待回访', value: 'PREPARING'},
      { title: '不通过', value: 'NO_PASS' },
      { title: '通过', value: 'PASS' },
    ],
    pageSize: 15,
    pageNumber: 0,
    memberList: [],
    loadingStatus: 0,
    recommendMobile: '---',
    showChangeDialog: false,
    changeReturnVisit: '',
    currentRecordId: ''
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
  onTabClicked: function (e) {
    const { index } = e.currentTarget.dataset;
    const { listSearchType } = this.data;
    if (listSearchType === index) {
      return;
    }
    this.setData({
     listSearchType: index,
    });
    this.onRefresh();
   },
  // 拨打推荐人电话
  handlePhoneCall: function (e) {
    const mobile = e.currentTarget.dataset.item
    if(!mobile){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: mobile,
    });
  },
  showReturnVisitVerify: function (event) {
    const { id, returnVisitVerify } = event.currentTarget.dataset.item
    if ('PREPARING' === returnVisitVerify) {
      this.setData({
        currentRecordId: id,
        showChangeDialog: true,
      })
    }
  }, 
  changeReturnVisitVerify: function (e) {
    this.setData({
      changeReturnVisit: e.detail.value
    })
  }, 
  handleCancel: function () {
    this.onResetReturnVisitData();
  },
  onResetReturnVisitData: function() {
    this.setData({
      showChangeDialog: false,
      changeReturnVisit: '',
      currentRecordId: '',
    })
  },
  handleConfirm: async function (e) {
    const { currentRecordId, changeReturnVisit } = this.data
    const params = {changeReturnVisit}
    await updateReturnVisit(currentRecordId, params)
    this.onResetReturnVisitData();
    this.onRefresh();
  },
  onLoadMore: async function (e) {
    const { pageNumber, memberList, pageSize, loadingStatus, listSearchType, returnVisitType} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const searchReturnVisitVerify = returnVisitType[listSearchType].value;
    const params = {
      pageNumber,
      pageSize,
      searchReturnVisitVerify
    };
    const res = await fetchBelongPersonList(params);
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