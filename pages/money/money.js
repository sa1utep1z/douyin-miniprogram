// pages/money/money.js
import { fetchMemberList, fetchShareList, fetchShareRecord, countInviteRecord, fetchShareUrlParam, fetchShareScene } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharedList: [
      '恭喜大*位邀请成功，领到96元红包',
      '恭喜小*橙邀请成功，领到16元红包',
      '恭喜小*宝邀请成功，领到22元红包',
      '恭喜张*城邀请成功，领到99元红包',
      '恭喜红*果邀请成功，领到24元红包',
      '恭喜李*金邀请成功，领到66元红包',
    ],
    memberList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
    inviteCount:{},
    needParseArg: false,
    showShareDialog: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const { recommendId, shareSceneId } =  options;
     if (recommendId) {
       wx.setStorageSync('recommendId', recommendId);
     }
     if (shareSceneId) {
      wx.setStorageSync('shareSceneId', shareSceneId);
    }
    //  if (options.scene) {
    //    console.log(options.scene);
    //    const scene = decodeURIComponent(options.scene);
    //    this.setData({
    //      needParseArg: true,
    //    })
    //  }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    // const { needParseArg } = this.data;
    // if (needParseArg) {
    // const res =   await fetchShareScene();
    // }
    // 用登录信息才获取
    const userId = wx.getStorageSync('userId')
    if (userId) {
      this.onRefresh();
      this.getSharedRecord();
    }
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
   * 展示分享方式弹框
   * @param {*} e 
   */
  onShowShareDialog: function (e) {
    const { showShareDialog } = this.data;
    if (!showShareDialog) {
      this.setData({
        showShareDialog: true,
      });
    }
  },

  /**
   * 跳转到生成海报页面，生成个人专属海报
   * @param {*} e 
   */
  onCreateCode: function  (e) {
    wx.navigateTo({
      url: '../../pages/sharePost/sharePost',
    });
     this.setData({
       showShareDialog: false,
     });
  },

  /**
   *  关闭弹窗
   * @param {*} e 
   */
  onCloseShareDialog: function (e) {
    this.setData({
      showShareDialog: false,
    });
  },

  /**
   * 通过海报或者二维码入口进入时，解析参数
   * @param {*} scene 
   */
  getShareArgument: function (scene) {
    //todo  解析参数存下recommendId
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: async function (e) {
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    let gps = null;
    if (longitude && latitude){
       gps = {
        longitude,
        latitude
      }
    }
    const res = await fetchShareUrlParam(gps);
    const {memberId, shareSceneId} = res.data;
    return  {
      title: '注册有好礼哦，好工作一起来！',
      path: `/pages/money/money?recommendId=${memberId}&shareSceneId=${shareSceneId}`, 
    }
  },

  //我的邀请记录
  getSharedRecord: async function (params) {
    const res = await fetchShareRecord();
    this.setData({
      inviteCount: res.data,
    });
  },

  getRecommendInfo: async function (e) {
    const res = await fetchMemberList();
    this.setData({
      recommendMobile: res.data.mobile,
    })
  },
  onLoadMore: async function (e) {
    console.log('触发加载更多')
    const { pageNumber, memberList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber: pageNumber,
      pageSize: pageSize,
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