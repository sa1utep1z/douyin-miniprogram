Page({

  data: {
    url: ''
  },

  /** 初始打开实名认证页面 */
  onLoad(options) {
    console.log('---wevbiew onload', options);
    this.setData({
      url: decodeURIComponent(options.url).replace('https://realnameverify.fadada.com', 'https://realnameverify04.fadada.com').replace('https://textapi.fadada.com', 'https://textapi05.fadada.com')
    });
  },

  /** 刷脸完成后重新加载实名认证页面 */
  reloadPage(url) {
    console.log('---webview reloadPage', url);
    this.setData({
      url
    });
  }
});