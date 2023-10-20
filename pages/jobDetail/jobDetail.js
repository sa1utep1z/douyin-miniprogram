// pages/index/jobDetail/jobDetail.js
import { fetchJobDetail, signUpClick } from '../../api/jobApi'
import urlConfig from '../../utils/urlConfig';
import { fetchShareUrlParam ,fetchShareImgCode, fetchPostArguments} from '../../api/userApi'
import GPS from '../../utils/map';
import { parseWorkerType, parseWorkEvnConstants, parseEmployRequiredConstants } from './constants'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jobId: '',
      showShareDialog: false,
      detailBean: null,
      isHide: false,
      workerType: '',
      workEvnInfo: [],
      employRequired: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { jobId, recommendId, shareSceneId } = options;
    if (recommendId) {
      wx.setStorageSync('recommendId', recommendId);
      wx.setStorageSync('isShare', true);
    }
    // 这个是分享参数id
    if (shareSceneId) {
      wx.setStorageSync('isShare', true);
      wx.setStorageSync('shareSceneId', shareSceneId);
    }
    if(jobId){
      this.setData({
        jobId,
      });
    }
    // 这个是分享海报携带的分享参数id
    if (options.scene){
      wx.setStorageSync('isShare', true);
      this.parseScene(options.scene);
    } else {
      this.getLocation();
    }
    // this.getData();
  },
  getData: async function () {

    const { jobId } = this.data;
    // const longitude = wx.getStorageSync('longitude');
    // const latitude = wx.getStorageSync('latitude');
    // let gps = null;
    // if (longitude && latitude){
    //    gps = {
    //     longitude,
    //     latitude
    //   }
    // }
    // const params =  {
    //   gps,
    // }
    const res = await fetchJobDetail( jobId );
    const resData = res.data;
    this.setData({
      detailBean: resData,
      workerType: parseWorkerType(resData),
      workEvnInfo: parseWorkEvnConstants(resData),
      employRequired: parseEmployRequiredConstants(resData)
    });
  },
  getLocation: function () { 
    this.getData();
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     wx.setStorageSync('latitude', res.latitude)
    //     wx.setStorageSync('longitude', res.longitude)
    //     this.getData();
    //   },
    //   fail:(res) => {
    //     this.getData();
    //   }
    // });
  },
  //如果获取位置失败，应当去列表授权
  // retryLocation: function (e) {
  //   wx.getSetting({
  //     success: (res) => {
  //       if (!res.authSetting['scope.userLocation']) {
  //         wx.showModal({
  //           title: '提示',
  //           content: '为方便精准推荐附近工作岗位，请先授权允许使用定位服务',
  //           confirmText: '去开启',
  //           confirmColor: '#018EFF',
  //           success: (res) => {
  //             if (res.confirm) {
  //               wx.openSetting({
  //                 success: () => {
  //                   wx.getLocation({
  //                     type: 'wgs84',
  //                     success: (res) => {
  //                       wx.setStorageSync('latitude', res.latitude)
  //                       wx.setStorageSync('longitude', res.longitude)
  //                       this.getData();
  //                     }
  //                   })
  //                 },
  //                 fail: () => {
  //                   wx.showToast({
  //                     title: '您未授予权限，部分功能将无法使用',
  //                     icon: 'none',
  //                   });
  //                   this.getData();
  //                 }
  //               })
  //             } else if (res.cancel) {
  //               this.getData();
  //             }
  //           },
  //         })
  //       } else {
  //         this.getData();
  //       }
  //     },
  //   })  
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //从其他页面回来之后刷新
    const { isHide } = this.data;
    if (isHide) {
      this.setData({
        isHide: false,
      });
      this.getData();
    }
  },
  onBannerClick: function (e) {
    const { detailBean } = this.data; 
    if (!detailBean) {
      return;
    }
    const { bean } = e.currentTarget.dataset;
    wx.previewImage({
      current: bean,
      urls: detailBean.companyImages,
    })
   },
   handelPhoneCall: function (e) {
    const { detailBean } = this.data;
    wx.makePhoneCall({
      phoneNumber: detailBean.recruiterInfo.mobile,
    });
  },
  handelCopyWechat: function (e) {
    const { detailBean } = this.data;
    wx.setClipboardData({
      data: detailBean.recruiterInfo.weChat,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '微信号已复制',
              icon: 'none',
            });
          }
        })
      }
    })
  },
  handleNav: function (e) {
    const { detailBean } = this.data; 
    if (detailBean.gpsAddress.latitude) {
     const gcj02 =GPS.gcj_encrypt(detailBean.gpsAddress.latitude,detailBean.gpsAddress.longitude);  
      wx.openLocation({
        name: detailBean.companyName,
        address: detailBean.addressDetail,
        latitude: gcj02.lat,
        longitude: gcj02.lon,
      });
    } else {
      wx.showToast({
        title: '未获取到位置信息',
        icon:'none'
      });
    }
  
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success (res) {
        wx.showToast({
          title: '复制成功',
          icon:'none',
          duration: 1800
        });
      }
    })
  },
  handleRegister: async function (e) {
    const { jobId } = this.data;
    const params = {orderId: jobId};
    const res = await signUpClick(params);
    if (res.code !== 0) {
      wx.showToast({
        title: res.msg,
        icon: 'error',
      }); 
    }
    wx.showToast({
      title: '报名成功',
      icon: 'success',
    }); 
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isHide: true,
    });
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
  onShareAppMessage: async function () {
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    let gps = null;
    if (longitude && latitude){
       gps = {
        longitude,
        latitude
      }
    }
    const res = await fetchShareUrlParam(gps);
    const {shareSceneId, memberId} = res.data;
    const { jobId, detailBean } = this.data;
    this.setData({
      showShareDialog: false,
    })
    return  {
      imageUrl: detailBean.companyImages[0],
      title: `${detailBean.jobName},众鼎日薪 天天发薪`,
      path: `/pages/jobDetail/jobDetail?jobId=${jobId}&recommendId=${memberId}&shareSceneId=${shareSceneId}`, 
    }
  },
  
  onShare: function (e) {
    // wx.showToast({
    //   title: '暂不支持岗位分享！敬请谅解',
    //   duration: 3000,
    //   icon: 'none',
    // });
    this.setData({
      showShareDialog: true,
    })
  },
  onClose: function (e) {
    this.setData({
      showShareDialog: false,
    })
  },
  onCreateCode: async function (e) {
      const { jobId } = this.data;
      wx.navigateTo({
        url: `../../pages/sharePost/sharePost?jobId=${jobId}`,
      });
    this.setData({
      showShareDialog: false,
    });
  },
  parseScene: async  function (scene) {
    try {
      const res =  await fetchPostArguments(scene);
      const {recommendId, jobId} = res.data;
      if (recommendId) {
        wx.setStorageSync('recommendId', recommendId);
      }
      if (jobId) {
        wx.setStorageSync('jobId', jobId);
      }
      console.log("获取到海报参数");
      console.log("res.data.jobId");
      this.setData({
        jobId: res.data.jobId,
      });
      this.getLocation();
    } catch (error) {
      console.log('未获取到岗位id');
    }
   },
   handleQuestion: function (e) {
     //todo 处理电话咨询
      const { detailBean } = this.data;
      if(detailBean.recruiterInfo===null){
        return;
      }
      wx.makePhoneCall({
        phoneNumber: detailBean.recruiterInfo.mobile,
      });
   }
})