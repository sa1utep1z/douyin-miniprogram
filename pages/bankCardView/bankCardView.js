// pages/authDisplay/authDisplay.js
import { fetchBankCardInfo } from '../../api/userApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankAccount: '',
    bankCardTypeName: '',
    bankName: '',
    backImageUrl: '',
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
    const { bankName, bankAccount, bankCardTypeName } = res.data;
    console.info(res.data);
    const backImageUrl = this.getBackImageByBankName(bankName);
    let bankAccount_ = '';
    if (bankAccount) {
      bankAccount_ = bankAccount.substring(bankAccount.length - 4, bankAccount.length)
    }
    this.setData({
      backImageUrl,
      bankCardTypeName: bankCardTypeName || '',
      bankAccount: bankAccount_,
      bankName: bankName || '',
    });
  },

  getBackImageByBankName(bankName) {
    if (!bankName) {
      return '';
    }
    switch (bankName) {
      case "中国银行":
        return '../../assets/images/bankCard/china_yh.png';
      case "工商银行":
        return '../../assets/images/bankCard/gs_yh.png';
      case "建设银行":
        return '../../assets/images/bankCard/js_yh.png';
      case "招商银行":
        return '../../assets/images/bankCard/zs_yh.png';
      case "平安银行":
        return '../../assets/images/bankCard/pa_yh.png';
      case "交通银行":
        return '../../assets/images/bankCard/jt_yh.png';
      case "农业银行":
        return '../../assets/images/bankCard/ny_yh.png';
      case "邮政储蓄银行":
        return '../../assets/images/bankCard/yz_yh.png';
      case "浦发银行":
        return '../../assets/images/bankCard/pf_yh.png';
      case "华夏银行":
        return '../../assets/images/bankCard/hx_yh.png';
      case "中信银行":
        return '../../assets/images/bankCard/zx_yh.png';
      case "广发银行":
        return '../../assets/images/bankCard/gf_yh.png';
      case "光大银行":
        return '../../assets/images/bankCard/gd_yh.png';
      default:
        return '';
    }
  },
  targetClick() {
    const { bankAccount } = this.data;
    if (bankAccount) {
      wx.showModal({
        title: '提示',
        content: '尊敬的用户您好！每个用户在系统中只有唯一的发薪卡，您再次提交后就会替换您当前的发薪卡，您确定要继续操作！',
        success: function (sm) {
          if (sm.confirm) {
            wx.navigateTo({
              url: '../../pages/bankCard/bankCard',
            });
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '../../pages/bankCard/bankCard',
      });
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
})