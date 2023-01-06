// pages/registration/registrationItem/registrationItem.js
import { cancelApprove } from '../../api/applyApi'
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
      
    },
    onCancelApply: async function(e) {
      const { item } = this.data;
      await cancelApprove(item.applyId);
      item.status = 'CANCEL';
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
