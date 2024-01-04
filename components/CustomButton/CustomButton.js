const app = getApp();
Component({
  properties: {
    text: {
      type: String,
      value: 'Button'
    },
    disabled: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    // 处理click事件        
    handleClick: function () {
      this.triggerEvent('click', {});
    }
  }
});