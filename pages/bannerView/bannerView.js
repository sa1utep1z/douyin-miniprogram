Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageBean: {}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { pageBean } = options;
    this.setData({
      pageBean: JSON.parse(decodeURIComponent(pageBean)),
    })
  },
})