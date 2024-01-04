// app.js
import { wxCodeAutoLogin } from './api/loginApi';
import { fetchPostArguments } from './api/userApi';
App({
  onLaunch() {
    // 展示本地存储能力
    const options = tt.getLaunchOptionsSync();
    const { recommendId } = options.query;
    tt.setStorageSync('recommendId', recommendId);
    if (options.query.scene) {
      this.parseScene(options.query.scene);
    }
    this.userLogin();
    this.checkNewVersion(); // 版本更新
  },
  globalData: {
    userInfo: null
  },

  parseScene: async function (scene) {
    tt.setStorageSync('shareSceneId', scene);
    const res = await fetchPostArguments(scene);
    const { recommendId, jobId } = res.data;
    if (recommendId) {
      tt.setStorageSync('recommendId', recommendId);
    }
    if (jobId) {
      tt.setStorageSync('jobId', jobId);
    }
  },


  // 用户登录
  userLogin: function () {
    return new Promise((resolve, reject) => {
      tt.login({
        success: async (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          const result = await wxCodeAutoLogin(res.code);
          if (result.code === 0) {
            const token = result.data.jwt;
            if (!token) {
              // 这里说明是新用户，需要注册
              tt.navigateTo({
                url: '../login/login'
              });
            } else {
              tt.setStorageSync('openId', result.data.openId);
              tt.setStorageSync('unionId', result.data.unionId);
              tt.setStorageSync('mobile', result.data.mobile);
              tt.setStorageSync('userId', result.data.userId);
              tt.setStorageSync('token', result.data.jwt);
              console.log("token", result.data.jwt);
              // this.getGenerateId(result.data.openId);
            }
            resolve(result);
          }
        }
      });
    });
  },

  checkNewVersion: function () {
    if (tt.canIUse('getUpdateManager')) {
      const updateManager = tt.getUpdateManager();
      if (!updateManager) {
        return;
      }
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            tt.showModal({
              title: '更新提示',
              content: '检测到新版本，是否重启应用新功能？',
              complete: () => {
                updateManager.applyUpdate();
              }
            });
          });
          updateManager.onUpdateFailed(() => {
            tt.showModal({
              title: '发现新版本',
              content: '新版本已经上线啦！请您删除当前小程序，重新搜索打开哟~'
            });
          });
        }
      });
    } else {
      tt.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  }
});