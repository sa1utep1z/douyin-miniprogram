// pages/scanCar/scanCar.js
import { submitRiding } from '../../api/place';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { carId } = options;
    if (carId) {
      this.onScan(carId);
    } else {
      tt.showToast({
        title: '车辆信息缺失',
        icon: 'error',
        duration: 3000
      });
      setTimeout(function () {
        tt.navigateBack({
          delta: 0
        });
      }, 3000);
      return;
    }
  },
  onScan: async function (carId) {
    const params = { carId };
    await submitRiding(params).then((res) => {
      tt.showToast({
        title: '登记成功',
        icon: 'success',
        duration: 3000
      });
      setTimeout(function () {
        tt.navigateBack({
          delta: 0
        });
      }, 3000);
      return;
    }).catch((err) => {
      tt.showToast({
        title: err.msg,
        icon: 'none',
        duration: 3000
      });
      setTimeout(function () {
        tt.navigateBack({
          delta: 0
        });
      }, 3000);
      return;
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});