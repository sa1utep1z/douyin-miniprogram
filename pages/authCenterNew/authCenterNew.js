// pages/authCenter/AuthCenter.js
import { fetchAuthInfo, twoFactorAuthentication, updateMobile, sendCode, fetchCertificationInfo } from '../../api/userApi';
import { idCardNoCheck } from '../../utils/util';
import { ocrIdNo } from '../../api/commonApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    oldName: '',
    mobile: '',
    oldMobile: '',
    idCard: '',
    oldIdCard: '',
    hometown: '',
    validation: false,
    smsCode: '',
    timer: null,
    sendBtnText: '获取验证码',
    agreePact: false
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
      oldName: res.data.name,
      idCard: res.data.idNo,
      oldIdCard: res.data.idNo,
      mobile: res.data.mobile,
      oldMobile: res.data.mobile,
      validation: res.data.validation,
      hometown: res.data.hometown
    });
  },

  onInputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  onInputHometown: function (e) {
    this.setData({
      hometown: e.detail.value
    });
  },
  onInputIDCard: function (e) {
    this.setData({
      idCard: e.detail.value
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
  switch2Change: function (e) {
    const { value } = e.detail;
    this.setData({
      agreePact: value
    });
  },

  /**
   * 提交实名
   * @param {*} e 
   */
  handleConfirm: async function (e) {
    const { name, mobile, smsCode, idCard, agreePact, oldIdCard, hometown } = this.data;
    if (name === null || name.length === 0) {
      tt.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    if (idCard === null || idCard.length === 0 || !idCardNoCheck(idCard)) {
      tt.showToast({
        title: '请输入有效身份证号',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    if (hometown === null || hometown.length === 0) {
      tt.showToast({
        title: '请输入籍贯地址',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(mobile)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    if (smsCode === null || smsCode.length !== 6) {
      tt.showToast({
        title: '请输入有效验证码',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    if (!agreePact) {
      tt.showToast({
        title: '请勾选同意协议',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    // 接口
    const res = await twoFactorAuthentication({
      name,
      idNo: idCard,
      mobile,
      smsCode,
      hometown
    });
    if (res.code !== 0) {
      tt.showToast({
        title: res.msg,
        icon: 'error',
        duration: 1500
      });
    } else {
      tt.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      });
      tt.navigateBack({
        delta: 0
      });
    }
  },
  handleSendCode: async function () {
    const { name, mobile, idCard, oldName, oldMobile, oldIdCard } = this.data;
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(mobile)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1800
      });
      return;
    }
    const res = await sendCode(mobile);
    if (res.code === 0) {
      this.onSendCodeSuccess();
    } else {
      tt.showToast({
        title: res.msg
      });
    }
  },
  onSendCodeSuccess: function () {
    tt.showToast({
      title: '验证码已发送',
      icon: 'success'
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
          sendBtnText: '获取验证码'
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
    const res = await ocrIdNo(data);
    if (res.code == 0) {
      const { name, idNo, address } = res.data;
      this.setData({
        name,
        idCard: idNo,
        hometown: address
      });
    }
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

  }
});