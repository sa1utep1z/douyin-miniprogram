import { fetchSignUrl, fetchAuthUrl, fetchViewUrl } from '../../api/contract'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewContract: async function(e) {
      const {contractid} = e.currentTarget.dataset;
      if (contractid) {
        const viewRes = await fetchViewUrl(contractid)
        wx.navigateTo({
          url: '/pagesFace/pages/webview/webview?url=' + encodeURIComponent(viewRes.data),
        });
      }
    },
    viewContract2: function(e) {
      const {url} = e.currentTarget.dataset;
      if (url) {
        wx.downloadFile({
          url: url,
          success: function (res) {
            wx.openDocument({
              showMenu: true,
              filePath: res.tempFilePath,
              fail: function () {
                console.log('打开文档失败')
              }
            })
          }
        })
      }
    },
    signContract: async function(e) {
      const {contractid} = e.currentTarget.dataset;
      if (contractid) {
        const params = {contractId: contractid};
        await fetchSignUrl(params).then((res) => {
          if (res.code === 2) {
            wx.showModal({
              title: '温馨提示',
              content: '请先实名认证',
              confirmText: '去认证',
              success: (res)=> {
                if (res.confirm) {
                  fetchAuthUrl().then((authRes) => {
                    wx.navigateTo({
                      url: '/pagesFace/pages/webview/webview?url=' + encodeURIComponent(authRes.data),
                    });
                  })
                } 
              }
            })
          } else {
            wx.navigateTo({
              url: '/pagesFace/pages/webview/webview?url=' + encodeURIComponent(res.data),
            });
          }
        });
      }
      
    }
  },
})
