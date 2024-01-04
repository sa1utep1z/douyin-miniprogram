// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  // 启用插槽
  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    curIndex: 0 //tab栏选中标题的下标
  },


  ready: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(e) {
      const curIndex = parseInt(e.target.dataset.id);
      this.setData({
        curIndex
      });
      this.triggerEvent('TabHandle', curIndex);
    }
  }
});