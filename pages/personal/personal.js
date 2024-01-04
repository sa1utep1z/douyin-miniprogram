// pages/personal/personal.js
import { fetchWalletBalance, fetchSharePostPersoanl, updateNickName } from '../../api/userApi';
import { withdraw } from '../../api/bankApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showAmt: false,
    applyCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //是否展示金额明文
    const showAmt = tt.getStorageSync('showAmt');
    this.setData({
      showAmt
    });
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
      applyCount: 1
    });
    tt.showModal({
      title: '温馨提示',
      content: '我们将申请您的微信昵称和头像，用于完善会员资料',
      showCancel: false,
      success: (res) => {
        tt.getUserProfile({
          desc: '用于完善会员资料',
          success: (res) => {
            const param = {
              weChatName: res.userInfo.nickName,
              weChatIconUrl: res.userInfo.avatarUrl
            };
            const { userInfo } = this.data;
            userInfo.weChatIconUrl = res.userInfo.avatarUrl;
            userInfo.weChatName = res.userInfo.nickName;
            this.setData({
              userInfo
            });
            updateNickName(param);
          }
        });
      }
    });
  },


  handelMenuClick: function (e) {
    const { tag } = e.currentTarget.dataset;
    const { userInfo } = this.data;
    switch (tag) {
      case 'entryData':
        tt.navigateTo({
          url: '/pages/entryData/entryData'
        });
        break;
      case 'contract':
        tt.navigateTo({
          url: '../../pages/contract/contract'
        });
        break;
      case 'lottery':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          tt.navigateTo({
            url: '/pages/lottery/lottery'
          });
        }
        break;
      case 'registration':
        // wx.showToast({
        //   title: '系统升级中，请稍后提现，给您造成不便，请见谅！',
        //   duration: 3000,
        //   icon: 'none',
        // });
        tt.navigateTo({
          url: '../../pages/registration/registration'
        });
        break;
      case 'member':
        tt.navigateTo({
          url: '../../pages/member/member'
        });
        break;
      case 'expandPoster':
        tt.navigateTo({
          url: '../../pages/expandPosterView/expandPosterView'
        });
        break;
      case 'resignApply':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          if (userInfo.memberStatus !== 'PREPARE_JOB_RESIGN' && userInfo.memberStatus !== 'JOB_ON') {
            tt.showToast({
              title: '您还未入职',
              icon: 'none'
            });
            return;
          }
          tt.navigateTo({
            url: '../../pages/resignApply/resignApply'
          });
        }
        break;
      case 'feedback':
        tt.navigateTo({
          url: '../../pages/feedback2/feedback2'
        });
        break;
      case 'share':
        tt.navigateTo({
          url: '../../pages/sharePost/sharePost'
        });
        break;
      case 'auth':
        tt.navigateTo({
          url: '../../pages/authDisplayNew/authDisplayNew'
        });
        break;
      case 'contacts':
        tt.navigateTo({
          url: '../../pages/contacts/contacts'
        });
        break;
      case 'bankCard':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          tt.navigateTo({
            url: '../../pages/bankCardView/bankCardView'
          });
        }
        break;
      case 'payslip':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          tt.navigateTo({
            url: '../../pages/payslip/payslip'
          });
        }
        break;
      case 'advance':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          tt.navigateTo({
            url: '../../pages/advanceDetail/advanceDetail'
          });
        }
        break;
      case 'dorm':
        if (!userInfo.validation) {
          this.noVerifyRediect();
        } else {
          tt.navigateTo({
            url: '../../pages/dorm/dorm'
          });
        }
        break;
      case 'staff':
        tt.navigateTo({
          url: '../../pages/staffList/staffList'
        });
        break;
      case 'balance':
        tt.navigateTo({
          url: '../../pages/balanceRecord/blanceRecord'
        });
        break;
      case 'recruiter-verify':
        tt.navigateTo({
          url: '../../pages/recruiterVerify/recruiterVerify'
        });
        break;
      default:
        tt.showToast({
          title: '此功能暂未开放',
          icon: 'none'
        });}

  },
  noVerifyRediect: function () {
    tt.showModal({
      title: '温馨提示',
      content: '请先进行实名认证',
      confirmText: '去实名',
      success: (res) => {
        if (res.confirm) {
          //未实名 进入实名页面
          tt.navigateTo({
            url: '../../pages/authCenterNew/authCenterNew'
          });
        }
      }
    });
  },
  handelPhoneCall: function (e) {
    const { userInfo } = this.data;
    if (!userInfo.recruiterMobile) {
      tt.showToast({
        title: '未获取到手机号',
        icon: 'none'
      });
      return;
    }
    tt.makePhoneCall({
      phoneNumber: userInfo.recruiterMobile
    });
  },
  handelCopyWechat: function (e) {
    const { userInfo } = this.data;
    if (!userInfo.recruiterWeChat) {
      tt.showToast({
        title: '未获取到微信号',
        icon: 'none'
      });
      return;
    }
    tt.setClipboardData({
      data: userInfo.recruiterWeChat,
      success(res) {
        tt.getClipboardData({
          success(res) {
            tt.showToast({
              title: '微信号已复制',
              icon: 'success'
            });
          }
        });
      }
    });
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
    tt.setStorageSync('showAmt', showAmt);

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
        userInfo
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleEye: async function (e) {
    const { showAmt } = this.data;
    this.setData({
      showAmt: !showAmt
    });
  },
  handleWithdraw: function (e) {
    tt.navigateTo({
      url: '../../pages/withdraw/withdraw'
    });
  },
  qrCodeScan: function (e) {
    tt.scanCode({
      success(res) {
        const { scanType, result } = res;
        if (scanType !== 'QR_CODE') {
          tt.showModal({
            title: '提示',
            showCancel: false,
            content: '不支持该二维码'
          });
          return;
        }
        const arr = result.split('&');
        const obj = {};
        arr.forEach((e) => {
          const e_arr = e.split('=');
          if (e_arr.length == 2) {
            obj[e_arr[0]] = e_arr[1];
          }
        });
        const { type, id } = obj;
        if (!result || !type || !id) {
          tt.showModal({
            title: '提示',
            showCancel: false,
            content: '二维码信息缺失'
          });
          return;
        }
        // 根绝类型做页面跳转
        switch (type) {
          case "roomBed":
            tt.navigateTo({
              url: '../../pages/dorm/scanBed/scanBed?bedId=' + id
            });
            break;
          case "roomBuilding":
            tt.navigateTo({
              url: '../../pages/dorm/stayApply/stayApply?scanBuilding=true&roomBuildingId=' + id
            });
            break;
          case "car":
            tt.navigateTo({
              url: '../../pages/scanCar/scanCar?carId=' + id
            });
            break;
          case "giftActivity":
            tt.navigateTo({
              url: '/pages/giftScanReceive/giftScanReceive?giftActivityId=' + id
            });
            break;
          default:
            tt.showModal({
              title: '提示',
              showCancel: false,
              content: '类型错误'
            });
            break;}

      }
    });
  }
});