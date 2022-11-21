// pages/dorm/dorm.js
import { listDormLiveData, fetchButtonCheck, fetchCurrDormLiveInfo, submitDormLiveOutApply } from '../../api/dorm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
    liveOutButton: false,
    liveFixButton: false,
    liveApplyButton: false,
    currDormLiveData: {},
    showLiveOutDialog: false,
    outApplyReasonIndex: '', // 退宿原因index
    outApplyReasonOptions: [
      {"title": "离职退宿", "value": "DORM_LIVE_OUT_RESIGN"},
      {"title": "违纪取消退宿", "value": "DORM_LIVE_OUT_VIOLATE"},
      {"title": "个人外租退宿", "value": "DORM_LIVE_OUT_PERSONAL"},
      {"title": "调迁宿舍", "value": "DORM_LIVE_OUT_TRANSFER"},
    ],
    liveOutDate: '',
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
    this.getDormLiveData();
    this.getButtonCheck();
  },
  bindPickerOutReason: function(e) {
    this.setData({
      outApplyReasonIndex: e.detail.value,
    })
  },
  bindLiveOutDateChange: function(e) {
    this.setData({
      liveOutDate: e.detail.value,
    })
  },
  handelClick: function(e) {
    const { tag } = e.currentTarget.dataset;
    switch(tag) {
      case 'dropOut':
        this.getCurrDormLiveInfo();
        this.setData({
          showLiveOutDialog: true,
        })
        break;
      // case 'repair':
        
      case 'stay':
        wx.navigateTo({
          url: './pactSign/pactSign',
        }); 
        break;
      default:
        wx.showToast({
          title: '此功能暂未开放',
          icon: 'none',
        });
        break;
    }
  },
  getCurrDormLiveInfo: async function() {
    const res = await fetchCurrDormLiveInfo();
    this.setData({
      currDormLiveData: res.data,
    })
  },
  getDormLiveData: async function() {
    const res = await listDormLiveData();
    this.setData({
      dataList: res.data,
    })
  },
  getButtonCheck: async function() {
    const res = await fetchButtonCheck();
    const { liveOutButton, liveFixButton, liveApplyButton } = res.data;
    this.setData({
      liveOutButton,
      liveFixButton,
      liveApplyButton,
    })
  },
  handleLiveOutCancel: function() {
    this.setData({
      showLiveOutDialog: false,
      currDormLiveData: {},
      outApplyReasonIndex: '',
      liveOutDate: '',
    })
  },
  handleLiveOutConfirm: async function() {
    const { currDormLiveData, outApplyReasonIndex, outApplyReasonOptions, liveOutDate } = this.data;
    const { id } = currDormLiveData;
    if (outApplyReasonIndex === '' || liveOutDate === '') {
      wx.showToast({
        title: '请填写信息',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    if (!id) {
      wx.showToast({
        title: '提交失败',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    const params = {
      liveOutDate,
      liveOutReasonType: outApplyReasonOptions[outApplyReasonIndex].value,
    };
    await submitDormLiveOutApply(id, params);
    wx.showToast({
      title: '退宿申请成功',
      icon: 'success',
      duration: 2000
    });
    this.setData({
      liveOutButton: false,
      showLiveOutDialog: false,
      currDormLiveData: {},
      outApplyReasonIndex: '',
      liveOutDate: '',
    })
    this.getDormLiveData();
  },
  onLoadMore: async function () {
    const { pageNumber, dataList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    }
      const res = await listResignApply(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          dataList: res.data.content,
        })
      } else {
        this.setData({
          dataList: dataList.concat(res.data.content),
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