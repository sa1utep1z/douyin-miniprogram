// pages/authDisplay/authDisplay.js
import { fetchBankUserName, submitBankCardInfo } from '../../api/userApi';
import { ocrBank } from '../../api/commonApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankAccount: '',
    bankName: '',
    bankUserName: '',
    bankCardTypeName: ''
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
    this.getBankUserNameInfo();
  },

  getBankUserNameInfo: async function (e) {
    const res = await fetchBankUserName();
    this.setData({
      bankUserName: res.data
    });
  },
  ocrClick: async function (e) {
    tt.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: (res) => {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            this.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            this.chooseWxImage('camera');
          }
        }
      }
    });
  },
  chooseWxImage: function (type) {
    tt.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: (res) => {
        console.info(res);
        this.uploadImg(res.tempFilePaths[0]);
      }
    });
  },
  uploadImg: async function (data) {
    console.info(data);
    const res = await ocrBank(data);
    if (res.code == 0) {
      const { bankAccount, bankName, bankCardTypeName } = res.data;
      this.setData({
        bankAccount,
        bankName,
        bankCardTypeName
      });
    }
  },
  submitData: function (e) {
    const { bankAccount, bankName, bankCardTypeName, bankUserName } = this.data;
    if (!/^[0-9]*$/.test(bankAccount)) {
      tt.showToast({
        title: '银行账号格式错误',
        icon: 'fail',
        duration: 3000
      });
      return;
    }
    if (!/^[\u4e00-\u9fa5]*$/.test(bankName)) {
      tt.showToast({
        title: '银行名称格式错误',
        icon: 'fail',
        duration: 3000
      });
      return;
    }
    const params = {
      bankAccount,
      bankName,
      bankCardTypeName,
      bankUserName
    };
    submitBankCardInfo(params).then((res) => {
      tt.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 2500
      });
      setTimeout(function () {
        tt.navigateBack({
          delta: 0
        });
      }, 2000);
    }).catch((err) => {
      if (err.code !== 0) {
        tt.showModal({
          title: '提示',
          content: err.msg,
          success: function (sm) {
            return;
          }
        });
        return;
      }
    });
  },
  onInputBankAccount: function (e) {
    this.setData({
      bankAccount: e.detail.value
    });
  },
  onInputBankName: function (e) {
    this.setData({
      bankName: e.detail.value
    });
  },
  onInputBankUserName: function (e) {
    this.setData({
      bankUserName: e.detail.value
    });
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

  }
});