import { listContractData } from '../../api/contract'

// pages/contract/contract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractList: []
    // contractList: [
    //   {
    //     contractId: '6482d2bb67896f71417c73fb',
    //     title: '地方撒旦你设计费快点解封',
    //     salaryStart: 1000,
    //     salaryEnd: 2000,
    //     companyName: '灯笼花CN',
    //     typeOfWork: 'FORMAL_WORKER',
    //     signUpTime: 1686214900258,
    //     jobDate: 1686214900258,
    //     contractStatus: 'PENDING',
    //     viewUrl: 'https://labor-dev.oss-cn-shenzhen.aliyuncs.com/laborMgt/labor/20230606852dfee943f34dbb97db6dc0.pdf?Expires=1686281335&OSSAccessKeyId=LTAI5tMBEPU2B5rv3XfYcC7m&Signature=CRYjrq3aqJSNvN8oGAIq4svxXhk%3D'
    //   },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  getContractData: async function() {
    const res = await listContractData()
    this.setData({
      contractList: res.data,
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
    this.getContractData();
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