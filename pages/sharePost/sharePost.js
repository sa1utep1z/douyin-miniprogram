// pages/sharePost/sharePost.js
import  urlConfig  from '../../utils/urlConfig';
const { baseUrl } = urlConfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postUrl: '',
    jobId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { jobId } = options;
    if (jobId) {
      this.setData({
        jobId,
      })
    } 
    this.getSharePost(jobId);
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  downloadPost: function () {
    const { postUrl } = this.data;
    wx.saveImageToPhotosAlbum({
      filePath: postUrl,
      success: ( res) =>{
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
      },
      fail: ( res) =>{
        console.log(res);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    })
  },
  getSharePost: function  (jobId) {
    wx.showLoading({
      title: '正在生成海报...',
    })
    let api;
    if (jobId) {
      api = `/client/member/invite/qrcode/${jobId}`;
    } else {
      api = '/client/member/invite/qrcode';
    }
    const url =  baseUrl+ api;
    wx.downloadFile({
      url:  url,
      header: {
        'X-User-Token': wx.getStorageSync('token') || '',
      },
      success: (res)=> {
        console.log(res);
        if(res.statusCode ===200){
          this.setData({
            postUrl: res.tempFilePath,
          }); 
        }
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail: (res) => {
        console.log(res);
        wx.hideLoading({
          success: (res) => {},
        })
      }
    });
  } 
})