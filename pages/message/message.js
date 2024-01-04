// pages/message/message.js
import { fetchMessageType, readAllUnReadMessage } from '../../api/messageApi';
import { setTabBarText } from '../../utils/tabBar';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTypeList: [],
    statusNavBarHeight: 0,
    navBarHeight: 0,
    height: 0,
    top: 0
  },
  getStatusBarHeight: function () {
    // 获取状态栏高度
    const { statusBarHeight } = tt.getSystemInfoSync();
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = tt.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonObject;
    // 计算导航栏的高度
    // 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    const navBarHeight = height + (top - statusBarHeight) * 3;
    // 计算状态栏与导航栏的总高度
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    this.setData({
      navBarHeight,
      statusNavBarHeight,
      height,
      top
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getStatusBarHeight();
    this.getMessageType();
  },
  cleanUnRead: async function (e) {
    await readAllUnReadMessage();
    this.getMessageType();
  },
  handelWorkMessage: function (e) {
    const { bean } = e.currentTarget.dataset;
    tt.navigateTo({
      url: `../../pages/message/workMessage/workMessage?messageType=${bean.code}`
    });
  },
  handelSystemMessage: function (e) {
    const { bean } = e.currentTarget.dataset;
    tt.navigateTo({
      url: `../../pages/message/systemMessage/systemMessage?messageType=${bean.code}`
    });
  },
  handelAccountMessage: function () {
    tt.navigateTo({
      url: '../../pages/message/accountMessage/accountMessage'
    });
  },

  getMessageType: async function (e) {
    const res = await fetchMessageType();
    this.setData({
      messageTypeList: res.data
    });
    const unTotal = res.data.reduce(function (total, currentValue, currentIndex, arr) {
      return total + currentValue.unReadMessageCount;
    }, 0);
    setTabBarText(2, unTotal + '');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
});