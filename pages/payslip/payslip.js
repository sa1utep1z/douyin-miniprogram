// pages/payslip/payslip.js
import { listPayslips, signPayslip, newestYM } from '../../api/payslip'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [], // 薪资条数据
    userInfo: {}, // 个人信息
    imgInfo: {}, // 表示的是签字生成的图片对象信息，由签完字返回。
    signDetailId: '', // 签署的薪资单id
    queryYear: '', // 筛选的年份，可能是消息跳转过来自动转化的
    queryMonth: '', // 筛选的月份，可能是消息跳转过来自动转化的
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 查询最新工资条的年月
    this.getNewestYM();
  }, 
  getNewestYM: async function() {
    const res = await newestYM();
    if (res.code === 0) {
      const {year, month} = res.data;
      if (year && month) {
        this.setData({
          queryYear: year,
          queryMonth: month,
        });
      } else {
        const date = new Date();
        this.setData({
          queryYear: date.getFullYear(),
          queryMonth: date.getMonth() + 1,
        });
      }
      this.getData();
    }
  },
  getData: async function() {
    const { queryYear, queryMonth } = this.data;
    const res = await listPayslips(queryYear, queryMonth);
    if (res.code === 0) {
      const { userInfo, content } = res.data;
      this.setData({
        userInfo,
        dataList: content,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  bindQueryDateChange: function (e) {
    const value = e.detail.value;
    const arr = value.split('-');
    if (arr) {
      const { queryYear: oldQueryYear, queryMonth: oldQueryMonth } = this.data;
      if (oldQueryYear !== arr[0] || oldQueryMonth !== arr[1]) {
        this.setData({
          queryYear: arr[0],
          queryMonth: arr[1],
        })
        this.getData(arr[0], arr[1]);
      }
    }
  },
  signClick: function (e) {
    // todo：需要赋值给signDetailId
    const currId = e.currentTarget.dataset.id;
    if (currId) {
      this.setData({
        signDetailId: currId,
      })
      wx.navigateTo({
        url: '../../pages/sign/sign',
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 监听签完字事件
    const { imgInfo, signDetailId } = this.data;
    if (signDetailId && imgInfo.fileKey) {
      this.onSign(signDetailId, imgInfo.fileKey);
    }
  },
  onSign: async function(signDetailId, imgKey) {
    // 上传签字信息并完成签署
    const params = { signImgKey: imgKey }
    await signPayslip(signDetailId, params);
    // 清空签署信息
    this.setData({
      imgInfo: {},
      signDetailId: '',
    })
    this.getData();
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
    this.setData({
      imgInfo: {},
      signDetailId: '',
    })
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