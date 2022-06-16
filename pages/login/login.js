import { wxBindPhoneLogin } from '../../api/loginApi';
const app = getApp();

Page({
  data: {
    imageBg: '',
    loading: false,
    code: '',
    time: new Date().getTime(),
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxLogin();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('login onShow');
    const { time } = this.data;
    let currentTime = new Date().getTime();
    let distance = currentTime - time;
    //如果离开超过两分钟 重新获取code
    if (distance > 2*60*1000) {
      this.wxLogin();
    }
  },
  /**
   * wx.login获取code
   */
  wxLogin: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    wx.login({
      success: async (res) => {
        let time = new Date().getTime();
        wx.hideLoading();
        this.setData({
          time,
          code: res.code,
        });
      },
      fail: (err) => {
        wx.hideLoading();  
      }
    });
  },

  async getPhoneNumber(e){
    this.setData({ loading: true });
    if(e.detail.errMsg === 'getPhoneNumber:ok'){
      wx.showLoading({
        title: '加载中',
        mask: true,
      });
      const { iv, encryptedData } = e.detail;
      const { code } = this.data;
      const channelCode = wx.getStorageSync('channelCode') || null;
      const recommendId = wx.getStorageSync('recommendId')||null;
      const longitude = wx.getStorageSync('longitude');
      const latitude = wx.getStorageSync('latitude');
      let gps = null;
      if (longitude && latitude){
        gps = {
          longitude,
          latitude
        }
      }
      console.log("recommendId:",recommendId);
      const params = { code, encryptedData, iv, channelCode, recommendId, gps };
      try {
        const result = await wxBindPhoneLogin(params);
        wx.hideLoading();
        wx.setStorageSync('openId', result.data.openId)
        wx.setStorageSync('unionId', result.data.unionId)
        wx.setStorageSync('mobile', result.data.mobile)
        wx.setStorageSync('userId', result.data.userId)
        wx.setStorageSync('token', result.data.jwt)
        // app.getGenerateId(result.data.openId)
        console.log(result.data);
        this.handleLogin();
      } catch (err) {
        wx.hideLoading();
        console.log('err', err)
        //如果报错 重新获取code
        this.wxLogin();
      } finally {
        this.setData({ loading: false });
      }
    }else {
      this.setData({ loading: false });
    }
  },

  getUserInfo : function  (params) {
    // wx.getUserProfile({
    //   desc: '用于完善会员信息',
    //   success: (res) => {
    //     console.log(res.userInfo);
    //   }
    // });
  },

  onMobileLogin: function () {
    wx.navigateTo({
      url: '../../pages/login/loginMobile',
    })
  },
  handleLogin: function () {
    console.log('登录成功');
    //判断是不是岗位分享进来的，如果是回岗位详情
    const isSharePosition = wx.getStorageSync('isSharePosition');
    if (isSharePosition) {
      wx.navigateBack({
        delta: 0,
      });
      wx.setStorageSync('isSharePosition', false);
    } else {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }
  },
  jumpPrivacy(){
    wx.navigateTo({
      url: '../privacyProtocol/privacyProtocol',
    })
  },
})