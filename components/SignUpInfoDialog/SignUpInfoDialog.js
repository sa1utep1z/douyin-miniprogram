// components/SignUpInfoDialog/SignUpInfoDialog.js
import { fetchSignUpInfo, sendValidCode, userSignUp} from '../../api/jobApi'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position: {
      type: String,
      value: '',
      observer: 'onIdChange'
    },
    show: {
      type: Boolean,
      value: false,
      observer: 'onShowChange',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    signUpInfo: {},
    timer: null,
    showDialog: false,
    name: '',
    phone: '',
    idCard: '',
    smsCode: '',
    sendBtnText: '获取验证码',
    timer: null,
  },
  lifetimes: {
    ready: function () {
      // this.fetchSignInfo();
      const recommendId = wx.getStorageSync('recommendId')||'';
      console.log('获取推荐码',recommendId);
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchSignInfo: async function () {
      // try {
      //   const res = await fetchSignUpInfo();
      //   if (res.data.enable) {
      //     wx.showToast({
      //       title: '您有正在报名中的岗位，暂时无法报名',
      //       icon: 'none',
      //     })
      //     this.triggerEvent('showSignInfo',false);
      //   }
      // } catch (error) {

      // }
    },
    onShowChange: function(value) {
      if(value){
        this.fetchSignInfo();
      }
    },
    onIdChange: function(value) {
    },
    handleCancel: function (e) {
      this.setData({
        smsCode: '',
      })
      this.triggerEvent('showSignInfo',false);
    },
    handleConfirm: async function (e) {
      const { name, phone, smsCode, idCard, position } = this.data;
      const  reg_user = /^[\u4e00-\u9fa5]{2,30}$/;
      if (!reg_user.test(name)) {
        wx.showToast({
          title: '请输入正确的姓名',
          icon:'none',
          duration: 1800
        });
        return;
      }
      const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon:'none',
          duration: 1800
        });
        return;
      }
      const recommendId = wx.getStorageSync('recommendId')||'';
      console.log('recommendId',recommendId);
      if (name && phone && smsCode && phone.length === 11 && smsCode.length === 6) {
         const params = {
           realName: name,
           idNo: idCard,
           mobile: phone,
           validCode: smsCode,
           recommendId
         }
         await userSignUp(position,params);
         this.triggerEvent('showSignInfo',false);
         wx.showToast({
           title: '报名成功',
           icon: 'success',
         });
         wx.removeStorageSync('recommendId');
         this.setData({
          smsCode: '',
        });
        this.resetTimer();
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'none'
        });
      }
    },
    onInputName: function (e) {
      this.setData({
        name: e.detail.value,
      })
    },
    onInputPhone: function (e) {
      this.setData({
        phone: e.detail.value,
      })
    },
    onInputIDCard: function (e) {
      this.setData({
        idCard: e.detail.value,
      })
    },
    onInputSmsCode: function (e) {
      this.setData({
        smsCode: e.detail.value,
      })
    },
    handleSendCode: async function () {
     const {  phone, sendBtnText } = this.data;
     const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon:'none',
          duration: 1800
        });
        return;
      }
      const res = await sendValidCode(phone);
      if (res.code === 0) {
        this.onSendCodeSuccess();
      }
    },
    onSendCodeSuccess: function () {
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
     let  time = 60;
     let  timer = setInterval(() => {
        time--;
        this.setData({
          sendBtnText: `${time}s`,
        });
        if(time <= 0) {
          clearInterval(timer);
          this.setData({
            sendBtnText: '获取验证码',
          });
        }
      }, 1000);
      this.setData({
        timer,
      });
    },
    resetTimer: function () {
      const { timer } = this.data;
      clearInterval(timer);
      this.setData({
        sendBtnText: '获取验证码',
      });
    }
  },
  
})
