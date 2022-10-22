// pages/authDisplay/authDisplay.js
import { fetchAdvanceMemberInfo, getResignApproveForm, submitApprove } from '../../api/applyApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitType: 'ADVANCE',
    pageBean: {},
    formFields: [],
    amountIndex: 0,
    amountOptions: [
      {"title": "100元", "value": "100"},
      {"title": "200元", "value": "200"},
      {"title": "300元", "value": "300"},
      {"title": "400元", "value": "400"},
      {"title": "500元", "value": "500"},
    ],
    canSubmit: false,
    submitBtnName: '提交申请',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApproveTempForm();
    this.getAdvanceMemberInfo();
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
    
  },
  clickList: function(e) {
    wx.navigateTo({
      url: '../../pages/advance/advance',
    });
  },
  bindPickerAmount: function(e) {
    this.setData({
      amountIndex: e.detail.value
    })
  },
  getApproveTempForm: async function() {
    const { submitType } = this.data;
    await getResignApproveForm(submitType).then((res) => {
      this.setData({
        formFields: res.data,
      })
    }).catch((err) => {
      this.setData({
        canSubmit: false,
        submitBtnName: '获取模板失败',
      })
    });
  },
  getAdvanceMemberInfo: async function (e) {
    await fetchAdvanceMemberInfo().then((res) => {
      const { data } = res;
      this.setData({
        canSubmit: true,
        pageBean: { ...data }
      })
    }).catch((err) => {
      this.setData({
        canSubmit: false,
        submitBtnName: err.msg,
      })
    });
  },
  submitData: async function(e) {
    const { pageBean, formFields, amountIndex, amountOptions, submitType } = this.data;
    if (formFields.length === 0) {
      wx.showToast({
        title: '不符合提交条件',
        icon:'none',
        duration: 3000
      });
      return;
    }
    const paramsObj = {
      ...pageBean,
      advanceAmount: amountOptions[amountIndex].value,
    };
    const submitList = formFields.map((e) => {
      let value = e.value;
      if (paramsObj[e.key]) {
        value = paramsObj[e.key];
      }
      const res = {
        ...e,
        value,
      };
      return res;
    })
    await submitApprove(submitType, submitList); // JSON.stringify(params)
    this.setData({
      canSubmit: false,
    })
    wx.showToast({
      title: '提交成功',
      icon:'none',
    });
    setTimeout(function() {
      wx.navigateTo({
        url: '../../pages/advance/advance',
      });
    }, 2000);
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

  },
})