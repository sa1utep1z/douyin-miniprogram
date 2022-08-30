// components/hui-picker-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {//下拉框数据来源
      type: Array,
      value: [],
    },
    _width: {//组件宽度
      type: String,
      value: "100%"
    },
    actualField: { // 实际属性
      type: String,
      value: "id"
    },
    showField: { // 显示属性
      type: String,
      value: "name"
    }
  },
  observers: {
    'dataList': function(dataList) {
      // const newList = dataList.map((e) => e[showvalue]);
      // console.info(newList);
      this.setData({
        listOptions: dataList,
        initListOptions: dataList,
      })
    },
    'showField': function(showField) {
      this.setData({
        showField: showField
      })
    },
    'actualField': function(actualField) {
      this.setData({
        actualField: actualField
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedName: '',//输入框值
    index: 0,//下拉框下标
    listOptions: [],//下拉框数据,
    initListOptions: [], // 初始数据，为了回显搜索空字符展示初始下拉选项
    showField: '',
    actualField: '',
    scrollShow: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickShow(e) {
      this.setData({
        scrollShow: true,
      });
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
      this.setData({
        scrollShow: false,
      });
      const { item } = e.currentTarget.dataset;
      console.info(item);
      this.triggerEvent('fetch', {}, {bubbles: true});
    },
  }
})