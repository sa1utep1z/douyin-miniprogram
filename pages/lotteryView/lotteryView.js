// pages/lotteryView/lotteryView.js
import { fetchLotteryActivityExplain, fetchLotteryActivityTurntable,
  fetchLotteryPrizeId, fetchDrawResidueNums, drawPreCheck, listDrawRecord  } from '../../api/opshub'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lotteryActivityId: '',
    activityTitle: '',
    // =================转盘信息 开始=================
    trunTableDisable: false,
    trunTableDisableExplain: '',
    lotteryCount: -1, // 剩余的抽奖次数，-1表示不限次数
    datas: [], // 转盘数据 
    prizeId: '',  // 抽中结果id，通过属性方式传入组件
    config: { 		// 转盘配置，通过属性方式传入组件
      titleLength: 10,
      bgColors: ['#fad47d','#f0e2af','#e19f8a','#d9f29d','#ffe6ad','#f29d9d','#f7bfad','#e3f7c8','#ffbaad','#ebc9be','#f0d495','#dff5ae','#e3c381','#edc5ad'],
      fontSize: 12,
      duration: 5000,
      ease: 'ease-in-out'
    },
    // =================转盘信息 结束=================

    // =================表格信息 开始=================
    tableHeader: [
      { prop: 'levelName', width: 180, label: '奖项等级'},
      { prop: 'name', width: 220, label: '奖项名称' },
      { prop: 'nums', width: 120, label: '奖项数量' }
    ],
    activityExplain: {},
    // =================表格信息 结束=================
    // tab
    tabs: [{title: '活动说明'}, {title: '抽奖记录'}],
    // 抽奖记录
    pageSize: 10,
    pageNumber: 0,
    drawList: [],
    loadingStatus: 0,
  },
  /**
   * 次数不足回调
   * @param e
   */
  onNotEnoughHandle(e) {
    wx.showToast({
      icon: 'none',
      title: e.detail
    })
  },
  /**
   * 抽奖回调
   */
  onLuckDrawHandle() {
    this.getLotteryPrizeId(this.data.lotteryActivityId);
  },
  /**
   * 动画旋转完成回调
   */
  onLuckDrawFinishHandle() {
    const datas = this.data.datas;
    const data = datas.find((item) => {
      return item.id === this.data.prizeId;
    });
    if (data.thanks === true) {
      wx.showToast({
        icon: 'none',
        title: `${data.title}`
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: `恭喜你抽中 ${data.title}`
      })
    }
    this.setData({
      prizeId: '',
      lotteryCount: this.data.lotteryCount !== -1 ? this.data.lotteryCount - 1 : -1
    });
  },
  // openDrawRecord: function () {
  //   wx.navigateTo({
  //     url: '/pages/drawRecord/drawRecord?lotteryActivityId=' + this.data.lotteryActivityId,
  //   })
  // },
  onTabHandle: function(e) {
    const tabIndex = e.detail
    if (tabIndex === 1) {
      this.onRefresh();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { lotteryActivityId } = options
    if (lotteryActivityId) {
      this.setData({
        lotteryActivityId
      });
      this.getLotteryActivityTurntable(lotteryActivityId);
      this.getDrawPreCheck(lotteryActivityId).then(e => {
        if (e) {
          this.getDrawResidueNums(lotteryActivityId);
        }
      })
      this.getLotteryActivityExplain(lotteryActivityId);
    }
  },
  getDrawPreCheck: async function (lotteryActivityId) {
    return await drawPreCheck(lotteryActivityId).then((res) => {
      if (res.data === false) {
        this.setData({
          trunTableDisable: true,
          trunTableDisableExplain: '不满足抽奖条件'
        })
      }
      return res.data;
    }).catch((err) => {
      this.setData({
        trunTableDisable: true,
        trunTableDisableExplain: '抽奖失败，请重新进入试试'
      })
      return false
    });
  },
  getDrawResidueNums: async function(lotteryActivityId) {
    const res = await fetchDrawResidueNums(lotteryActivityId);
    this.setData({
      lotteryCount: res.data,
    })
  },
  getLotteryActivityExplain: async function(lotteryActivityId) {
    const res = await fetchLotteryActivityExplain(lotteryActivityId)
    this.setData({
      activityExplain: res.data,
    })
  },
  getLotteryActivityTurntable: async function(lotteryActivityId) {
    const res = await fetchLotteryActivityTurntable(lotteryActivityId)
    this.setData({
      datas: res.data.prizes,
      activityTitle: res.data.lotteryActivityTitle,
    })
  },
  getLotteryPrizeId: async function(lotteryActivityId) {
    await fetchLotteryPrizeId(lotteryActivityId).then((res) => {
      this.setData({
        prizeId: res.data
      })
    }).catch((err) => {
      this.setData({
        prizeId: ''
      })
    });
  },
  // =================================抽奖记录====================================
  onLoadMore: async function (e) {
    const { pageNumber, drawList, pageSize, loadingStatus, lotteryActivityId} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
      lotteryActivityId
    };
    const res = await listDrawRecord(params);
    const totalPages = res.data.totalPages;
    if(pageNumber === 0) {
      this.setData({
        drawList: res.data.content,
      })
    } else {
      this.setData({
        drawList: drawList.concat(res.data.content),
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