// pages/authDisplay/authDisplay.js
import { fetchBankCardInfo, submitBankCardInfo } from '../../api/userApi'
import { ocrBank } from '../../api/commonApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankAccount: '',
    bankName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getBankCardInfo();
  },

  getBankCardInfo: async function (e) {
    const res = await fetchBankCardInfo();
    const { bankAccount, bankName } = res.data;
    this.setData({
      bankAccount,
      bankName,
    });
  },
  ocrClick: async function(e) {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: (res)=> {
       if (!res.cancel) {
        if (res.tapIndex == 0) {
         this.chooseWxImage('album')
        } else if (res.tapIndex == 1) {
          this.chooseWxImage('camera')
        }
       }
      }
    })
  },
  chooseWxImage:function(type){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success:  (res) =>{
        console.info(res);
       this.uploadImg(res.tempFilePaths[0])
      }
     }) 
  },
  uploadImg:async function(data){
    console.info(data);
    const res = await ocrBank(data);
    if (res.code == 0) { 
      const { bankAccount, bankName } = res.data;
      this.setData({
        bankAccount,
        bankName,
      });
    }
  },
  submitData: async function (e) {
    const { bankAccount, bankName } = this.data;
    const params = { 
      bankAccount, 
      bankName
    };
    await submitBankCardInfo(params);
    wx.showToast({
      title: '提交成功',
      icon:'none',
      duration: 2500
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2000);


  },
  onInputBankAccount: function (e) {
    this.setData({
      bankAccount: e.detail.value,
    })
  },
  onInputBankName: function (e) {
    this.setData({
      bankName: e.detail.value,
    })
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
})