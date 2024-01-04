// pages/authCenter/AuthCenter.js
import { fetchRecruiterAuthInfo, updateRecruiterAuthInfo, sendCode } from '../../api/userApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    oldMobile: '',
    smsCode: '',
    sendBtnText: '获取验证码',
    timer: null,
    authCodeSent: false,
    counting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAuthInfo();
  },

  getUserAuthInfo: async function (e) {
    const res = await fetchRecruiterAuthInfo();
    this.setData({
      mobile: res.data.recruiterMobile,
      oldMobile: res.data.recruiterMobile
    });
  },

  onInputPhone: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  onInputSmsCode: function (e) {
    this.setData({
      smsCode: e.detail.value
    });
  },

  /**
   * 提交实名
   * @param {*} e 
   */
  handleConfirm: async function (e) {
    const { name, mobile, smsCode, authCodeSent } = this.data;
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(mobile)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (!authCodeSent) {
      tt.showToast({
        title: '请先获取验证码',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (mobile && smsCode && smsCode.length === 6) {
      const params = {
        recruiterMobile: mobile,
        validCode: smsCode
      };
      await updateRecruiterAuthInfo(params);
      tt.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      });
      this.setData({
        smsCode: ''
      });
      this.resetTimer();
      tt.navigateBack({
        delta: 0
      });
    } else {
      tt.showToast({
        title: '请完善信息',
        icon: 'none'
      });
    }
  },

  handleSendCode: async function () {
    const { mobile, oldMobile, sendBtnText } = this.data;
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(mobile)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    if (oldMobile && oldMobile === mobile) {
      tt.showToast({
        title: '手机号一致，无法获取',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    const res = await sendCode(mobile);
    if (res.code === 0) {
      this.onSendCodeSuccess();
    }
  },
  onSendCodeSuccess: function () {
    tt.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
    this.setData({
      authCodeSent: true,
      counting: true
    });
    let time = 60;
    let timer = setInterval(() => {
      time--;
      this.setData({
        sendBtnText: `${time}s`
      });
      if (time <= 0) {
        clearInterval(timer);
        this.setData({
          sendBtnText: '重新获取',
          counting: false
        });
      }
    }, 1000);
    this.setData({
      timer
    });
  },
  resetTimer: function () {
    const { timer } = this.data;
    clearInterval(timer);
    this.setData({
      sendBtnText: '获取验证码'
    });
  },
  jumpPrivacy() {
    tt.navigateTo({
      url: '../privacyProtocol/privacyProtocol'
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

  }
});