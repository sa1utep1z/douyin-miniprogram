// components/LoadMore/LoadMore.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type: String
    }, // 设置scroll-view的高度
    status: {
      type: Number,
      value: 1, // 0数据加载中， 1数据加载完成， 2没有更多数据了, 3刷新currentPage。对外仅接收1，2, 3
      observer: 'statusChange'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentPage: 0, // 当前是多少页
    showTip: false, // 控制是否提示信息
    timer: null, // 定时器用于自动隐藏“没有更多数据”
  },

  /**
   * 组件的方法列表
   */
  methods: {
    statusChange: function(newStatus) {
      if (newStatus === 3) {
        this.setData({currentPage: 0});
        return;
      }
      const showTip = newStatus !== 1;
      let timer = null;
      if (this.data.timer !== null) {
        clearTimeout(this.data.timer);
        this.setData({ timer: null });
      }
      if (newStatus === 2) {
        timer = setTimeout(() => {
          this.setData({ showTip: false, timer: null })
        }, 2000);
      }
      const data = {
        showTip,
        timer,
      }
      this.setData(data);
    },
    scrollToLower: function() {
      if (this.data.status === 0) {
        return;
      }
      if (this.data.status === 1) {
        const currPage = this.data.currentPage + 1;
        this.setData({
          currentPage: currPage,
          status: 0,
        });
        // 对外暴露一个getMoreData事件，用户获取下一页数据
        this.triggerEvent('getMoreData', {currentPage: currPage});
      } 
      if (this.data.status === 2) {
        if (this.data.timer) {
          clearTimeout(this.data.timer);
          this.setData({ timer: null });
        }
        const timer = setTimeout(() => {
          this.setData({ showTip: false, timer: null })
        }, 2000);
        this.setData({ status: 2, showTip: true, timer });
      }   
    },
  }
})
