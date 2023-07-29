// pages/advance/advance.js
import { listMemberAdvance, statisticsMemberAdvance, fetchAdvanceApproveInfo } from '../../api/applyApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listSearchStatus: 0,
    applyStatusList: [
      { title: '全部', value: '', subKey: 'allNums'},
      { title: '审核中', value: 'PENDING', subKey: 'pendingNums'},
      { title: '拒绝', value: 'FAIL', subKey: 'failNums'},
      { title: '通过', value: 'PASS', subKey: 'passNums'},
    ],
    pageSize: 15,
    pageNumber: 0,
    applyList: [],
    loadingStatus: 0,
    showDetailDialog: false,
    applyDetailDialog: false,
    detailObj: {}, // 详情弹窗的内容
    approveDetailObj: {}, // 审核进度详情弹窗的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.onRefresh();
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
    this.getStatisticsMemberAdvance();
  },
  clickUserName: function(e) {
    const { applyList } = this.data;
    const { index } = e.currentTarget.dataset;
    this.setData({
      showDetailDialog: true,
      detailObj: applyList[index],
    });
  },
  clickStatus: function(e) {
    const { id } = e.currentTarget.dataset;
    this.getAdvanceApproveInfo(id);
    this.setData({
      applyDetailDialog: true,
    })
  },
  handleConfirm: function(e) {
    this.setData({
      showDetailDialog: false,
      detailObj: {}
    });
  },
  handleConfirmApply: function(e) {
    this.setData({
      applyDetailDialog: false,
      approveDetailObj: {}
    });
  },
  callMobile: function(e) {
    const { mobile } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: mobile,
    });
  },
  onTabClicked: function (e) {
    const { index } = e.currentTarget.dataset;
    const { listSearchStatus } = this.data;
    if (listSearchStatus === index) {
      return;
    }
    this.setData({
      listSearchStatus: index,
    });
    this.onRefresh();
   },
   onRefresh: function (e) {
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,   
    });
    this.onLoadMore();
  },
  getStatisticsMemberAdvance: async function() {
    const params = {};
    const res = await statisticsMemberAdvance(params);
    if (res.code === 0) {
      const { applyStatusList } = this.data;
      const statisData = res.data;
      const newArr = applyStatusList.map((item) => {
        return {
          ...item,
          subTitle: statisData[item.subKey],
        }
      })
      this.setData({
        applyStatusList: newArr
      });
    }
  },
  getAdvanceApproveInfo: async function(applyId) {
    const res = await fetchAdvanceApproveInfo(applyId);
    if (res.code === 0) {
      this.setData({
        approveDetailObj: res.data
      });
    }
  },
  onLoadMore: async function (e) {
    const { pageNumber, applyList, pageSize, loadingStatus, listSearchStatus, applyStatusList} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const status = applyStatusList[listSearchStatus].value;
    const params = {
      pageNumber,
      pageSize,
      status
    };
    const res = await listMemberAdvance(params);
    const totalPages = res.data.totalPages;
    if(pageNumber === 0) {
      this.setData({
        applyList: res.data.content,
      })
    } else {
      this.setData({
        applyList: applyList.concat(res.data.content),
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