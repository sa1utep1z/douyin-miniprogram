// pages/sharePost/sharePost.js
import  urlConfig  from '../../utils/urlConfig';
import { fetchPosterKeyList } from '../../api/share'
const { baseUrl } = urlConfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postUrl: '',
    jobId: '',
    posterKeyList: [],
    posterKeyIndex: 0, // posterKeyList下标。默认查看第一张海报，可以在posterKeyList切换
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { jobId } = options;
    if (jobId) {
      this.setData({
        jobId,
      });
      this.getPosterKeyList().then(e => {
        if (e) {
          this.getSharePost(jobId);
        }
      }) 
    }
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
  posterTap: function() {
    const { posterKeyList, posterKeyIndex, jobId } = this.data;
    if (posterKeyList.length === 1) {
      wx.showToast({
        title: '只有该海报，无法切换',
        icon: 'none'
      })
      return;
    }
    if (posterKeyIndex >= posterKeyList.length - 1) {
      this.setData({posterKeyIndex: 0});
    } else {
      this.setData({posterKeyIndex: posterKeyIndex + 1});
    }
    this.getSharePost(jobId);
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
  getPosterKeyList: async function() {
    return await fetchPosterKeyList().then((res) => {
      this.setData({
        posterKeyList: res.data,
      })
      return true;
    }).catch((err) => {
      wx.showToast({
        title: '获取模板失败',
        icon: 'none'
      })
      return false;
    });
  },
  getSharePost: function (jobId) {
    wx.showLoading({
      title: '正在生成海报...',
      mask: true,
    })
    let api;
    if (jobId) {
      const { posterKeyList, posterKeyIndex } = this.data;
      console.info(posterKeyIndex)
      console.info(posterKeyList)
      api = `/client/member/invite/qrcode/${jobId}/${posterKeyList[posterKeyIndex]}`;
    } else {
      api = '/client/member/invite/qrcode';
    }
    const url =  baseUrl+ api;
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    wx.downloadFile({
      url: `${url}?longitude=${longitude}&latitude=${latitude}`,
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
  } 
})