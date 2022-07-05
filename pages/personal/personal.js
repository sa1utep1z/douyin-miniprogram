// pages/personal/personal.js
import { fetchWalletBalance, fetchSharePostPersoanl, updateNickName } from '../../api/userApi' 
import { withdraw } from '../../api/bankApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showAmt: false,
    applyCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //是否展示金额明文
    const showAmt = wx.getStorageSync('showAmt');
    this.setData({
      showAmt,
    })
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
    this.getBanlanceInfo();
  },

  showUserInfoModel: function (params) {
    this.setData({
      applyCount: 1,
    })
    wx.showModal({
     title: '温馨提示',
     content: '我们将申请您的微信昵称和头像，用于完善会员资料',
     showCancel: false,
     success: (res)=>{
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const param = {
            weChatName: res.userInfo.nickName,
            weChatIconUrl: res.userInfo.avatarUrl,
          }
          const { userInfo } = this.data;
          userInfo.weChatIconUrl = res.userInfo.avatarUrl;
          userInfo.weChatName = res.userInfo.nickName;
          this.setData({
            userInfo,
          });
          updateNickName(param);
        }
      });
     }
    });
  },


  handelMenuClick: function (e) {
    const { tag } = e.currentTarget.dataset;
    switch(tag) {
      case 'registration':
        wx.showToast({
          title: '系统升级中，请稍后提现，给您造成不便，请见谅！',
          duration: 3000,
          icon: 'none',
        });
        // wx.navigateTo({
        //   url: '../../pages/registration/registration',
        // })
        break;
      case 'member':
        wx.navigateTo({
          url: '../../pages/member/member',
        })
        break;
      case 'feedback':
        wx.navigateTo({
          url: '../../pages/feedback/feedback',
        })
        break;
    case 'share':
      wx.navigateTo({
        url: '../../pages/sharePost/sharePost',
      })
      break;
      case 'auth':
        wx.navigateTo({
          url: '../../pages/authDisplayNew/authDisplayNew',
        });
        break;
      case 'staff':
        wx.navigateTo({
          url: '../../pages/staffList/staffList',
        });
        break;
      case 'balance':
        wx.navigateTo({
          url: '../../pages/balanceRecord/blanceRecord',
        });
        break;
      case 'recruiter-verify':
        wx.navigateTo({
          url: '../../pages/recruiterVerify/recruiterVerify',
        });
        break;
      default:
        wx.showToast({
          title: '此功能暂未开放',
          icon: 'none',
        });
    }
  },

  handelPhoneCall: function (e) {
    const { userInfo } = this.data;
    if (!userInfo.recruiterMobile) { 
      wx.showToast({
        title: '未获取到手机号',
        icon: 'none'
      });
      return;
     }
    wx.makePhoneCall({
      phoneNumber: userInfo.recruiterMobile,
    });
  },
  handelCopyWechat: function (e) {
    const { userInfo } = this.data;
    if (!userInfo.recruiterWeChat) { 
     wx.showToast({
       title: '未获取到微信号',
       icon: 'none'
     });
     return;
    }
    wx.setClipboardData({
      data: userInfo.recruiterWeChat,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '微信号已复制',
              icon: 'success',
            });
          }
        })
      }
    })
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
    const { showAmt } = this.data;
    wx.setStorageSync('showAmt', showAmt);

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

  getBanlanceInfo: async function (params) {
    try {
      const res = await fetchWalletBalance();
      const userInfo = res.data;
      const { applyCount } = this.data;
      if (applyCount === 0 && userInfo.fetchWeChat === false) {
        this.showUserInfoModel();
      }
      this.setData({
        userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleEye: async function (e) {
    const { showAmt } = this.data;
    this.setData({
      showAmt: !showAmt,
    });
  },
  handleWithdraw: function (e) {
    wx.showToast({
      title: '系统升级中，请稍后提现，给您造成不便，请见谅！',
      duration: 3000,
      icon: 'none',
    });
    // const  { userInfo } = this.data;
    // if (userInfo.authRealName === true) {
    //   //如果已经实名 进入提现页面
    //   wx.navigateTo({
    //     url: `../../pages/withdraw/withdraw?balance=${userInfo.balance}`,
    //   });
    // } else if (userInfo.authRealName === false)  {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '请先进行实名认证，实名认证时请填写真实信息，若与微信认证信息不一致，将无法成功提现',
    //     confirmText: '去实名',
    //     success: (res)=> {
    //       if (res.confirm) {
    //         //未实名 进入实名页面
    //         wx.navigateTo({
    //           url: '../../pages/authCenter/authCenter',
    //         });
    //       } 
    //     }
    //   })
     
    // }
  },
})