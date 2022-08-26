// pages/registration/registrationItem/registrationItem.js
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
        url: '/pages/resignApplyDetail/resignApplyDetail?pageBean=' + encodeURIComponent(JSON.stringify(item)),
      })
      console.info(item);
    },
    onCancelApply: function(e) {
      const { item } = this.data;
      // await userCancelSignUp(item.id);
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
