Page({
  data: {
    // ******************** 认证回调信息 -- 开始 ********************
    /** 刷脸token */
    bizToken: '',
    /** 认证小程序appId */
    miniProgramAppId: '',
    /** 认证小程序跳转页地址 */
    miniProgramPath: '',
    /** 刷脸结束回调地址 */
    miniProgramCallBackUrl: '',
    /** 是否已跳转认证小程序 */
    goFaceDone: false,
    status: '-1',
    // ******************** 认证回调信息 -- 结束 ********************

    // ******************** 签署回调信息 -- 开始 ********************
    delay: 'no'
    // ******************** 签署回调信息 -- 结束 ********************
  },

  /** 点击前往认证 */
  onJump() {
    const { bizToken, miniProgramAppId, miniProgramPath } = this.data;
    tt.navigateToMiniProgram({
      appId: miniProgramAppId,
      path: miniProgramPath + '?bizToken=' + bizToken,
      success: (res) => {
        this.setData({
          goFaceDone: true
        });
      }
    });
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.info('--- middle onLoad', options);
    // 这一步变量
    const { bizToken = '', miniProgramAppId = '', miniProgramPath = '', miniProgramCallBackUrl = '', status = '-1', delay = 'no' } = options;
    this.setData({
      bizToken: decodeURIComponent(bizToken),
      miniProgramAppId: decodeURIComponent(miniProgramAppId),
      miniProgramPath: decodeURIComponent(miniProgramPath),
      miniProgramCallBackUrl: decodeURIComponent(miniProgramCallBackUrl),
      status,
      delay
    });
  },

  /** 生命周期函数--监听页面显示 */
  onShow: function () {
    const { goFaceDone, miniProgramCallBackUrl, status, delay } = this.data;
    // 签署完成 || 直接认证成功的（没有跳转公证处人脸识别）
    if ('yes' === delay) {
      setTimeout(() => {
        tt.reLaunch({
          url: '/pages/contract/contract'
        });
      }, 700);
      return;
    }
    if ('2' === status) {
      // 不会被返回上一层页面
      tt.redirectTo({
        url: '/pages/contract/contract'
      });
      return;
    }
    /** 防止从认证进入后直接返回 */
    if (!goFaceDone) return;

    /** 已跳转认证小程序，重置 */
    this.setData({
      goFaceDone: false
    });

    /** getEnterOptionsSync 基础库 2.9.4 开始支持，低版本需做兼容处理 */
    const options = tt.getEnterOptionsSync();

    /** 从认证小程序返回 */
    if (options.scene === 1038 && options.referrerInfo.extraData && options.referrerInfo.extraData.faceResult) {
      const pages = getCurrentPages();
      const previous = pages[pages.length - 2];
      /** 重新加载认证页面 */
      if (previous.reloadPage && typeof previous.reloadPage === 'function') {
        previous.reloadPage(miniProgramCallBackUrl.replace('https://realnameverify.fadada.com', 'https://realnameverify04.fadada.com'));
        tt.navigateBack({
          delta: 1
        });
      }
    }
  }

});