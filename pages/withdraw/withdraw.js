// pages/withdraw/withdraw.js
import { fetchWithdraw, submitWithdraw } from '../../api/bankApi';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    showTip: false,
    withdrawInfo: {},
    canSubmit: false,
    submitMess: '提交申请'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getWithdrawInfo();
  },

  getWithdrawInfo: async function () {
    await fetchWithdraw().then((res) => {
      if (res.code === 0) {
        this.setData({
          withdrawInfo: res.data,
          showTip: true,
          canSubmit: true
        });
      } else if (res.code === 2) {
        this.setData({
          withdrawInfo: res.data,
          showTip: true,
          canSubmit: false,
          submitMess: res.msg
        });
      }
    }).catch((err) => {
      this.setData({
        canSubmit: false,
        submitMess: err.msg
      });
    });
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
    price = price.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    price = price.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    price = price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    if (price.indexOf(".") < 0 && price != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      price = parseFloat(price);
    }
    this.setData({
      inputValue: price
    });
  },
  /**
   * 全部提现
   */
  handleWithdrawAll: function () {
    const { totalAmt } = this.data;
    this.setData({
      inputValue: totalAmt
    });
  },

  /**
   * 调用接口 提现
   * @param {*} e 
   */
  handleWithdraw: async function (e) {
    const { inputValue } = this.data;
    const amout = {
      'key': 'withdrawAmount',
      'value': inputValue
    };
    const param = [amout];
    await submitWithdraw(param);
    this.setData({
      canSubmit: false
    });
    tt.showToast({
      title: '提交成功',
      icon: 'none'
    });
    setTimeout(function () {
      tt.navigateBack({
        delta: 0
      });
    }, 2000);
  }
});