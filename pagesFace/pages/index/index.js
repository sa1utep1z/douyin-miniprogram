const app = getApp();

Page({
  data: {
    url: 'https://realnameverify-test.fadada.com/fddAuthenticationService/v1/api/synsAuthentication.action?transaction_no=0B6189D503CB1E5F808AFE38ECAD513777101A0AA7A84C0A857FCF20A6A6E1A96BB9F0A30DF7BB59&sign=QTk5ODM0RjA3MTJCM0E3QUQ1NUMxQUVDMDFBNTREOUI3NjQxQzE3MQ==&app_id=404269&timestamp=1686195379152'
  },

  inputUrl(e) {
    this.setData({
      url: e.detail.value,
    })
  },

  goScanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success: ({result = ''}) => {
        if(!result) {
          wx.showToast({
            title: '扫码失败',
            icon: 'error'
          })
        }
        this.setData({
          url: result
        }, this.goUrl)
      }
    })
  },

  goUrl() {
    const url = this.data.url
    wx.navigateTo({
      url: '/pagesFace/pages/webview/webview?url=' + encodeURIComponent(url),
    })
  },

  clearUrl() {
    this.setData({
      url: '',
    })
  }
})
