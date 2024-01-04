// pages/balanceRecord/blanceRecord.js
import { fetchBalanceDetail } from '../../api/bankApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: '0',
    recordList: [],
    pageNumber: 0,
    pageSize: 15,
    loadingStatus: 0,
    typeArr: ['', 'PAYOFF', 'WITHDRAW'],
    type: ''
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
   * tab点击事件
   * @param {*} e 
   */
  handleTab: function (e) {
    const { tabIndex, typeArr } = this.data;
    const { index } = e.currentTarget.dataset;
    if (tabIndex == index) {
      return;
    }
    this.setData({
      tabIndex: index,
      type: typeArr[index]
    });
    this.onRefresh();
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

  onLoadMore: async function (e) {
    const { pageNumber, pageSize, loadingStatus, recordList, type } = this.data;
    if (loadingStatus !== 0) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
      type
    };
    try {
      const res = await fetchBalanceDetail(params);
      const totalPages = res.data.totalPages;
      if (pageNumber === 0) {
        this.setData({
          recordList: res.data.content
        });
      } else {
        this.setData({
          recordList: recordList.concat(res.data.content)
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
    } catch (error) {
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
  }
});