// pages/expandPoster/expandPoster.js
import  urlConfig  from '../../utils/urlConfig';
const { baseUrl } = urlConfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { expandTempId } = options;
    console.info(expandTempId);
    if (expandTempId) {
      this.getSharePost(expandTempId);
    }
  },
  getSharePost: function (expandTempId) {
    wx.showLoading({
      title: '正在生成海报...',
      mask: true,
    })
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    wx.downloadFile({
      url: baseUrl + `/client/expand/posterTemplate/${expandTempId}/generate?longitude=${longitude}&latitude=${latitude}`,
      header: {
        'X-User-Token': wx.getStorageSync('token') || '',
        'userId':  wx.getStorageSync('userId') || '',
        'X-Device': 'mini_program',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})