import { fetchSignUrl, fetchAuthUrl, fetchViewUrl, fetchDownUrl } from '../../api/contract'

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
    downloadContract: async function(e) {
      const {contractid} = e.currentTarget.dataset;
      if (contractid) {
        const downRes = await fetchDownUrl(contractid)
        wx.showLoading({
          title: '下载中...',
          mask: true,
        })
        wx.downloadFile({
          url: downRes.data,
          success: function (res) {
            wx.hideLoading(); // 隐藏loading
            wx.openDocument({
              showMenu: true,
              filePath: res.tempFilePath
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
