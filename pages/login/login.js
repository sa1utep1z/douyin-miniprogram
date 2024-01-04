import { wxBindPhoneLogin } from '../../api/loginApi';
const app = getApp();

Page({
  data: {
    imageBg: '',
    loading: false,
    code: '',
    time: new Date().getTime(),
    agreePact: false
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
    if (distance > 2 * 60 * 1000) {
      this.wxLogin();
    }
  },
  /**
   * wx.login获取code
   */
  wxLogin: function () {
    tt.showLoading({
      title: '加载中',
      mask: true
    });
    tt.login({
      success: async (res) => {
        let time = new Date().getTime();
        tt.hideLoading();
        this.setData({
          time,
          code: res.code
        });
      },
      fail: (err) => {
        tt.hideLoading();
      }
    });
  },

  async getPhoneNumber(e) {
    this.setData({ loading: true });
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      tt.showLoading({
        title: '加载中',
        mask: true
      });
      const { iv, encryptedData } = e.detail;
      const { code } = this.data;
      const channelCode = tt.getStorageSync('channelCode') || null;
      const recommendId = tt.getStorageSync('recommendId') || null;
      const shareSceneId = tt.getStorageSync('shareSceneId') || null;
      const longitude = tt.getStorageSync('longitude');
      const latitude = tt.getStorageSync('latitude');
      let gps = null;
      if (longitude && latitude) {
        gps = {
          longitude,
          latitude
        };
      }
      const params = { code, encryptedData, iv, channelCode, recommendId, shareSceneId, gps };
      try {
        const result = await wxBindPhoneLogin(params);
        tt.hideLoading();
        tt.setStorageSync('openId', result.data.openId);
        tt.setStorageSync('unionId', result.data.unionId);
        tt.setStorageSync('mobile', result.data.mobile);
        tt.setStorageSync('userId', result.data.userId);
        tt.setStorageSync('token', result.data.jwt);
        // app.getGenerateId(result.data.openId)
        console.log(result.data);
        this.handleLogin();
      } catch (err) {
        tt.hideLoading();
        console.log('err', err);
        //如果报错 重新获取code
        this.wxLogin();
        if (err.code !== 0) {
          tt.showToast({
            title: err.msg,
            icon: 'error',
            duration: 3000,
            icon: 'none'
          });
        }
      } finally {
        this.setData({ loading: false });
      }
    } else {
      this.setData({ loading: false });
    }
  },

  register: async function () {
    const { agreePact } = this.data;
    if (!agreePact) {
      tt.showToast({
        title: '请勾选协议',
        icon: 'error',
        duration: 3000,
        icon: 'none'
      });
      return;
    }
    this.setData({ loading: true });
    const { code } = this.data;
    const channelCode = tt.getStorageSync('channelCode') || null;
    const recommendId = tt.getStorageSync('recommendId') || null;
    const shareSceneId = tt.getStorageSync('shareSceneId') || null;
    const longitude = tt.getStorageSync('longitude');
    const latitude = tt.getStorageSync('latitude');
    let gps = null;
    if (longitude && latitude) {
      gps = {
        longitude,
        latitude
      };
    }
    const params = { code, channelCode, recommendId, shareSceneId, gps };
    try {
      const result = await wxBindPhoneLogin(params);
      tt.hideLoading();
      tt.setStorageSync('openId', result.data.openId);
      tt.setStorageSync('unionId', result.data.unionId);
      tt.setStorageSync('mobile', result.data.mobile);
      tt.setStorageSync('userId', result.data.userId);
      tt.setStorageSync('token', result.data.jwt);
      // app.getGenerateId(result.data.openId)
      console.log(result.data);
      this.handleLogin();
    } catch (err) {
      tt.hideLoading();
      console.log('err', err);
      //如果报错 重新获取code
      this.wxLogin();
      if (err.code !== 0) {
        tt.showToast({
          title: err.msg,
          icon: 'error',
          duration: 3000,
          icon: 'none'
        });
      }
    } finally {
      this.setData({ loading: false });
    }
  },

  onMobileLogin: function () {
    tt.navigateTo({
      url: '../../pages/login/loginMobile'
    });
  },
  handleLogin: function () {
    console.log('登录成功');
    //判断是不是岗位分享进来的，如果是回岗位详情
    const isShare = tt.getStorageSync('isShare');
    if (isShare) {
      tt.navigateBack({
        delta: 0
      });
      tt.setStorageSync('isShare', false);
    } else {
      tt.switchTab({
        url: '../../pages/index/index'
      });
    }
  },
  jumpPrivacy() {
    tt.navigateTo({
      url: '../privacyProtocol/privacyProtocol'
    });
  },
  switchAgreePact: function (e) {
    const { value } = e.detail;
    this.setData({
      agreePact: value
    });
  }
});