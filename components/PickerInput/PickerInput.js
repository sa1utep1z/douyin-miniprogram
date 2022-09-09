// components/hui-picker-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {//下拉框数据来源
      type: Array,
      value: [],
      observer: function (dataList) {
        this.setData({
          listOptions: dataList,
          initListOptions: dataList,
        })
      },
    },
    showField: { // 显示属性
      type: String,
      value: "name",
      observer: function(showField) {
        this.setData({
          showField: showField
        })
      },
    },
    scrollShow: { // 组件是否显示
      type: Boolean,
      value: false,
      observer: function(scrollShow) {
        this.setData({
          scrollShow: scrollShow
        })
      }
    }
  },
  // observers: {
  //   'dataList': function(dataList) {
  //     this.setData({
  //       listOptions: dataList,
  //       initListOptions: dataList,
  //     })
  //   },
  //   'showField': function(showField) {
  //     this.setData({
  //       showField: showField
  //     })
  //   },
  //   'scrollShow': function(scrollShow) {
  //     this.setData({
  //       scrollShow: scrollShow
  //     })
  //   }
  // },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,//下拉框下标
    listOptions: [],//下拉框数据,
    initListOptions: [], // 初始数据，为了回显搜索空字符展示初始下拉选项
    showField: '',
    scrollShow: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancelSelect: function(e) {
      this.setData({
        scrollShow: false,
      });
      this.triggerEvent('cancel', {});
    },
    //文本框输入事件
    bindInput(e) {
      const { listOptions, initListOptions, showField } = this.data;
      const _value = e.detail.value;
      if (!_value || _value === '') {
        this.setData({
          listOptions: initListOptions,
        })
        return;
      }
      const array = listOptions.filter(item => item[showField].indexOf(_value) !== -1);
      this.setData({
        listOptions: array
      })
    },
    //下拉框选择事件
    bindScrollChange(e) {
      const { showField } = this.data;
      const { item } = e.currentTarget.dataset;
      this.setData({
        scrollShow: false,
      });
      this.triggerEvent('fetch', item);
    },
  }
})