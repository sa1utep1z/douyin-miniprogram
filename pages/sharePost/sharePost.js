// pages/sharePost/sharePost.js
import urlConfig from '../../utils/urlConfig';
import { fetchPosterKeyList } from '../../api/share';
const { baseUrl } = urlConfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postUrl: '',
    jobId: '',
    posterIdList: [],
    posterKeyIndex: 0 // posterIdList下标。默认查看第一张海报，可以在posterIdList切换
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { jobId } = options;
    if (jobId) {
      this.setData({
        jobId
      });
      this.getPosterKeyList().then((e) => {
        if (e) {
          this.getSharePost(jobId);
        }
      });
    } else {
      this.getSharePost('');
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
  posterTap: function () {
    const { posterIdList, posterKeyIndex, jobId } = this.data;
    if (posterIdList.length === 1) {
      tt.showToast({
        title: '只有该海报，无法切换',
        icon: 'none'
      });
      return;
    }
    if (posterKeyIndex >= posterIdList.length - 1) {
      this.setData({ posterKeyIndex: 0 });
    } else {
      this.setData({ posterKeyIndex: posterKeyIndex + 1 });
    }
    this.getSharePost(jobId);
  },
  downloadPost: function () {
    const { postUrl } = this.data;
    tt.saveImageToPhotosAlbum({
      filePath: postUrl,
      success: (res) => {
        tt.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      fail: (res) => {
        console.log(res);
        tt.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  },
  getPosterKeyList: async function () {
    return await fetchPosterKeyList().then((res) => {
      this.setData({
        posterIdList: res.data
      });
      return true;
    }).catch((err) => {
      tt.showToast({
        title: '获取模板失败',
        icon: 'none'
      });
      return false;
    });
  },
  getSharePost: function (jobId) {
    tt.showLoading({
      title: '正在生成海报...',
      mask: true
    });
    let api;
    if (jobId) {
      const { posterIdList, posterKeyIndex } = this.data;
      api = `/client/member/invite/qrcode/${jobId}/${posterIdList[posterKeyIndex]}`;
    } else {
      api = '/client/member/invite/qrcode';
    }
    const url = baseUrl + api;
    const longitude = tt.getStorageSync('longitude');
    const latitude = tt.getStorageSync('latitude');
    tt.downloadFile({
      url: `${url}`, // ?longitude=${longitude}&latitude=${latitude}
      header: {
        'X-User-Token': tt.getStorageSync('token') || '',
        'userId': tt.getStorageSync('userId') || '',
        'X-Device': 'mini_program'
      },
      success: (res) => {
        console.log('success', res);
        if (res.statusCode === 200) {
          this.setData({
            postUrl: res.tempFilePath
          });
        }
        tt.hideLoading({
          success: (res) => {}
        });
      },
      fail: (res) => {
        console.log('fail', res);
        tt.hideLoading({
          success: (res) => {}
        });
      }
    });
  }
});