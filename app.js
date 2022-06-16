// app.js
import {wxCodeAutoLogin} from './api/loginApi'
import { fetchPostArguments } from './api/userApi'
App({
  onLaunch() {
    // 展示本地存储能力
    const options = wx.getLaunchOptionsSync();
    const  { recommendId } = options.query;
    wx.setStorageSync('recommendId', recommendId)
    if (options.query.scene ){
     this.parseScene(options.query.scene);
    }
    this.userLogin();
    this.checkNewVersion(); // 版本更新
  },
  globalData: {
    userInfo: null
  },

  parseScene: async  function (scene) {
    const res =  await  fetchPostArguments(scene);
    wx.setStorageSync('recommendId', res.data.recommendId);
    wx.setStorageSync('jobId', res.data.jobId);
   },


  // 用户登录
  userLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          const recommendId = wx.getStorageSync('recommendId');
          let params = { };
          if (recommendId) {
            params = {
              recommendId,
            }
          }
          const result = await wxCodeAutoLogin(res.code,params)
          if (result.code === 0) {
            wx.setStorageSync('openId', result.data.openId)
            wx.setStorageSync('unionId', result.data.unionId)
            wx.setStorageSync('mobile', result.data.mobile)
            wx.setStorageSync('userId', result.data.userId)
            wx.setStorageSync('token', result.data.jwt)
            console.log("token",result.data.jwt);
            // this.getGenerateId(result.data.openId);
            resolve(result)
          }
        }
      })
    })
  },

  checkNewVersion: function() {
    if(wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '检测到新版本，是否重启应用新功能？',
              complete: () => {
                updateManager.applyUpdate();
              }
            });
          });
          updateManager.onUpdateFailed(() => {
            wx.showModal({
              title: '发现新版本',
              content: '新版本已经上线啦！请您删除当前小程序，重新搜索打开哟~'
            });
          });
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  }
})