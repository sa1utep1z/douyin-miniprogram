// pages/withdraw/withdraw.js
import { withdraw } from '../../api/bankApi' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amt: 100,
    inputValue: null,
    totalAmt: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { balance } = options;
    this.setData({
      totalAmt: balance,
    })
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

  onInputValue: function (e) {
    let price = e.detail.value;
    price = price.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    price = price.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    price = price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    if (price.indexOf(".") < 0 && price != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseFloat(price);
    }
    this.setData({
      inputValue: price,
    });
  },
  /**
   * 全部提现
   */
  handleWithdrawAll: function () {
    const { totalAmt } = this.data;
    this.setData({
      inputValue: totalAmt,
    });
  },

  /**
   * 调用接口 提现
   * @param {*} e 
   */
  handleWithdraw: async function (e) {
    const { inputValue } = this.data;
    const param = {
      'amount': inputValue,
   }
   try {
    const res = await withdraw(param);
    wx.showModal({
      title: '温馨提示',
      content: '您的提现申请已经提交，请以实际提现结果为准，可在余额明细列表查看提现状态',
      showCancel: false,
      confirmText: '知道啦',
      success: (res) => {
        wx.navigateBack({
          delta: 0,
        });
      }
    })
   } catch (error) {
   }
  }
})