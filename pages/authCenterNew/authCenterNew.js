// pages/authCenter/AuthCenter.js
import { fetchAuthInfo, twoFactorAuthentication, sendCode, fetchCertificationInfo } from '../../api/userApi'
import {idCardNoCheck} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    idCard: '',
    smsCode: '',
    validation: false,
    timer: null,
    sendBtnText: '获取验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAuthInfo();
  },

  getUserAuthInfo: async function (e) {
    const res = await fetchCertificationInfo();
    this.setData({
      name: res.data.name,
      idCard: res.data.idNo,
      mobile: res.data.mobile,
      validation: res.data.validation,
    });
  },

  onInputName: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },

  onInputIDCard: function (e) {
    this.setData({
      idCard: e.detail.value,
    })
  },
  onInputPhone: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  onInputSmsCode: function (e) {
    this.setData({
      smsCode: e.detail.value,
    })
  },

  /**
   * 提交实名
   * @param {*} e 
   */
  handleConfirm: async function (e) {
    const { name, mobile, smsCode, idCard } = this.data;
    if(name===null||name.length===0){
      wx.showToast({
        title: '请输入真实姓名',
        icon:'none',
        duration: 1800
      });
      return;
    }
    if(idCard===null || idCard.length===0 || !idCardNoCheck(idCard)){
      wx.showToast({
        title: '请输入有效身份证号',
        icon:'none',
        duration: 1800
      });
      return;
    }
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none',
        duration: 1800
      });
      return;
    }
    if(smsCode===null || smsCode.length!==6){
      wx.showToast({
        title: '请输入有效验证码',
        icon:'none',
        duration: 1800
      });
      return;
    }
    const res = await twoFactorAuthentication({
      name,
      idNo: idCard,
      mobile,
      smsCode
    });
    if (res.code !== 0) {
      wx.showToast({
        title: res.msg,
        icon: 'error',
        duration: 1500
      });
    } else {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      });
      wx.navigateBack({
        delta: 0,
      })
    }
  },
  handleSendCode: async function () {
    const {  mobile, sendBtnText } = this.data;
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
     if (!reg_tel.test(mobile)) {
       wx.showToast({
         title: '请输入正确的手机号',
         icon:'none',
         duration: 1800
       });
       return;
     }
     const res = await sendCode(mobile);
     if (res.code === 0) {
       this.onSendCodeSuccess();
     } else {
      wx.showToast({
        title: res.msg
      });
     }
   },
   onSendCodeSuccess: function () {
     wx.showToast({
       title: '验证码已发送',
       icon: 'success'
     });
    let  time = 60;
    let  timer = setInterval(() => {
       time--;
       this.setData({
         sendBtnText: `${time}s`,
       });
       if(time <= 0) {
         clearInterval(timer);
         this.setData({
           sendBtnText: '获取验证码',
         });
       }
     }, 1000);
     this.setData({
       timer,
     });
   },
   resetTimer: function () {
     const { timer } = this.data;
     clearInterval(timer);
     this.setData({
       sendBtnText: '获取验证码',
     });
   },
   jumpPrivacy(){
    wx.navigateTo({
      url: '../privacyProtocol/privacyProtocol',
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
    const { timer } = this.data;
    clearInterval(timer);
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