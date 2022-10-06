// pages/payslip/payslip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{no: 'dfdfd', sign: false, detailItems: [{title: '应发工资', value: '2534.36'}]}, {no: 'dfdfd', sign: true}], // 薪资条数据
    imgInfo: {}, // 表示的是签字生成的图片对象信息，由签完字返回。
    signDetailId: {}, // 签署的薪资单id
    queryYear: '', // 筛选的年份，可能是消息跳转过来自动转化的
    queryMonth: '', // 筛选的月份，可能是消息跳转过来自动转化的
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const date = new Date();
    this.setData({
      queryYear: date.getFullYear(),
      queryMonth: date.getMonth() + 1,
    });

    // TODO：获取薪资条数据
    this.getData();
  }, 
  getData: async function() {

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
      this.setData({
        queryYear: arr[0],
        queryMonth: arr[1],
      })
    }
  },
  signClick: function (e) {
    // todo：需要赋值给signDetailId
    // this.setData({
    //   signDetailId: '4544545dfd'
    // })
    wx.navigateTo({
      url: '../../pages/sign/sign',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 监听签完字事件
    const { imgInfo, signDetailId } = this.data;
    if (imgInfo && signDetailId) {
      this.onSign(signDetailId, imgInfo.fileKey);
    }
  },
  onSign: async function(signDetailId, imgKey) {
    // todo：上传签字信息并完成签署
    // 清空签署信息
    this.setData({
      imgInfo: {},
      signDetailId: '',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      imgInfo: {},
      signDetailId: '',
    })
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