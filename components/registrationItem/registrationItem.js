// pages/registration/registrationItem/registrationItem.js
import { userConfirmSignUp, userCancelSignUp } from '../../api/jobApi'
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
    onItemClick: function (e) {
      const { item } = this.data;
      wx.navigateTo({
        url: `../../pages/jobDetail/jobDetail?jobId=${item.positionOrderId}`,
      })
    },
    onConfirmSignUp: async function (e) {
      const { item } = this.data;
      await userConfirmSignUp(item.id);
      item.status = 'SIGN_UP_CONFIRM';
      this.setData({
        item,
      });
      wx.showToast({
        title: '报名成功',
        icon: 'none',
        duration: 2000,
      });
    },
    onCancelSignUp: async function (e) {
      const { item } = this.data;
      await userCancelSignUp(item.id);
      item.canCancelSignUp = false;
      this.setData({
        item,
      });
      wx.showToast({
        title: '已取消',
        icon: 'none',
        duration: 2000,
      });
    },
  },
})
