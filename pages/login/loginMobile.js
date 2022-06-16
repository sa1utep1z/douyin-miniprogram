import { wxCustomPhoneLogin, getSmsLoginCode, getCodeByImage } from '../../api/loginApi';
import  urlConfig  from '../../utils/urlConfig';
const baseUrl = urlConfig().authUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendBtnText: '获取验证码',
    smsCode: '',
    phone: '',
    showDelete: false,
    showImageCode: false,
    requestId:'',
    grapgCodeUrl:'',
    validationCode:'',
    verify(action) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (action === 'confirm') {
           this.getCodeByImagePromise()
           .then(()=>{
            resolve(true);
           }).catch((err)=>{
            resolve(false);
           });
          } else {
            resolve(true);//关闭弹窗
          }
        }, 20);
      });
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      requestId:new Date().getTime(),
      verify: this.data.verify.bind(this),
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
  onSmsInput: function (e) {
    const { value } = e.detail;
    this.setData({
      smsCode: value,
    });
  },
  onMobileInput: function (e) {
    const { value } = e.detail;
    let showDelete = value && value.length > 0;
    this.setData({
      showDelete,
      phone: value,
    });
  },
  onSendCode: function () {
    const { sendBtnText } = this.data;
    if(sendBtnText !== '获取验证码') {
      return;
    }
    const { phone } = this.data;
    if(phone.length !== 11){
      wx.showToast({
        title: '请完善手机号',
        duration: 2000,
        icon: 'none',
      });
      return;
    }
    this.getLoginCode();
  },
  onLogin: function () {
    const { smsCode, phone } = this.data;
    if(phone.length !== 11){
      wx.showToast({ title: '请完善下手机号', duration: 2000, icon: 'none', });
      return;
    }
    if(smsCode.length !== 6){
      wx.showToast({ title: '请输入完整的验证码', duration: 200,});
      return;
    }
    const channelCode = wx.getStorageSync('channelCode') || null;
    wx.showLoading({ title: '加载中', mask: true, });
    wx.login({
      success: (res) => {
        const recommendId = wx.getStorageSync('recommendId')||'';
        const params = { phone, smsCode, code: res.code, channelCode, recommendId };
        this.appLogin(params);
      },
      fail: (err) => {
        console.log('登录失败',err);
        wx.hideLoading();
      }
    });  
  },
  onSendCodeSuccess: function () {
    let time = 60;
    let timer = setInterval(() => {
      time--;
      this.setData({
        sendBtnText: `${time}s`,
      });
      if(time <=0) {
        clearInterval(timer);
        this.setData({
          sendBtnText: '获取验证码',
        });
      }
    }, 1000);
  },
  appLogin: async function(params) {
    const res = await wxCustomPhoneLogin(params)
    wx.setStorageSync('openId', res.data.openId)
    wx.setStorageSync('unionId', res.data.unionId)
    wx.setStorageSync('mobile', res.data.mobile)
    wx.setStorageSync('userId', res.data.userId)
    wx.setStorageSync('token', res.data.jwt)
    // app.getGenerateId(res.data.openId)
    wx.redirectTo({
      url: '../index/index',
    });
  },
  getLoginCode: async function() {
    try {
      const { phone } = this.data;
      await getSmsLoginCode(phone);
      this.onSendCodeSuccess();
    } catch(err) {
      if (err.errorCode === 'verification_code_required') { // 表示需要图形验证码
        this.getGrapgCode();
      } else if (err.errorCode == 'sms_hourly_limit_reached') {
        this.setData({
          tip: '为保证您的账户安全，请一个小时后再试'
        });
        this._showPopup();
      } else if (err.errorCode == 'sms_daily_limit_reached') {
        this.setData({
          tip: '为保障您的账户安全，请一天后再试'
        })
      }
    }
  },
  /**
   * handleDelete 清空手机号输入框
   */
  handleDelete: function() {
    this.setData({
      phone: '',
    });
  },

  //获取图形验证码
   getGrapgCode: async function () {
    const{ phone, requestId } = this.data;
    let mobile  = '15061932767';
    const url =  baseUrl+`/smsAuth/validationCode/${mobile}/${requestId}`;
    console.log(url);
    wx.request({
      url,
      method:'GET',
      responseType:'arraybuffer',
      success:res=>{
       let url ='data:image/png;base64,'+wx.arrayBufferToBase64(res.data)
       this.setData({
         grapgCodeUrl:url
       })
      }
    });
    this.setData({
      showImageCode: true,
    });
   },
   getSmsCodeByImage: async function () { //提交图形验证码发送短信验证码
    const { phone, requestId, validationCode } = this.data
    const params ={
      phone, requestId, validationCode
    }
    try {
      await getCodeByImage(params)
      this.onSendCodeSuccess();
    } catch (err) {
      this.getGrapgCode();
    } 
  },

  getCodeByImagePromise:  function () { //提交图形验证码发送短信验证码
    return new Promise(function (resolve, reject) {
      const { phone, requestId, validationCode } = this.data
      const params ={
        phone, requestId, validationCode
      }
      getCodeByImage(params).then((res)=>{
        resolve(true);
        this.onSendCodeSuccess();
      }).catch((err) => {
        reject();
        this.getGrapgCode();
      });
   });
  },
  inputChange(e){
    this.setData({
      [e.target.dataset.value]:e.detail.value
    })
  },
  onDialogComfirm: function () {
    const { validationCode, showImageCode } = this.data;
    console.log(showImageCode);
    if( validationCode.length !== 4 ) {
      wx.showToast({ title: '请输入图形验证码', duration: 2000, icon: 'none', });
      return;
    }
    this.setData({
      showImageCode: false,
    });
    this.getSmsCodeByImage();
  },
  onDialogClose: function (e) {
    this.setData({
      showImageCode: false,
    })
  },
})