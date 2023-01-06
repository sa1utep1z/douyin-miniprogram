// pages/resignApplyDetail/resignApplyDetail.js
import { fetchJobData, getResignApproveForm, submitApprove } from '../../api/applyApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitType: 'PREPARE_RESIGN',
    pageBean: {},
    expectResignDate: '',
    resignReasonOptions: [
      {value: '返乡就业', name: '返乡就业', checked: false},
      {value: '月收入低', name: '月收入低', checked: false},
      {value: '不适应上夜班', name: '不适应上夜班', checked: false},
      {value: '不适应流水线', name: '不适应流水线', checked: false},
      {value: '不想穿无尘服', name: '不想穿无尘服', checked: false},
      {value: '对伙食不满', name: '对伙食不满', checked: false},
      {value: '对住宿不满', name: '对住宿不满', checked: false},
      {value: '对车间管理不满', name: '对车间管理不满', checked: false},
      {value: '其他', name: '其他', checked: false},
    ],
    isShow: false,
    startDateLimit: new Date().setHours(0, 0, 0, 0),
    formFields: [],
    canSubmit: true,
    submitBtnName: '提交',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const pBean = options.pageBean;
    if (!pBean) {
      pBean = {};
    }
    const newBean = JSON.parse(decodeURIComponent(pBean));
    if (newBean.applyId) {
      const resignRs = newBean.resignReasons;
      const { resignReasonOptions } = this.data;
      const newROptions = resignReasonOptions.map((e) => {
        if (resignRs.indexOf(e.value) !== -1) {
          return {...e, checked: true}
        }
        return e;
      })
      resignRs.for
      this.setData({
        resignReasonOptions: newROptions,
        pageBean: newBean,
        isShow: true,
        expectResignDate: newBean.expectResignDate,
      })
    } else {
      // 说明是新增
      // 获取流程模板表单属性
      this.getApproveTempForm();
      // 获取在职信息
      this.getJobData();
    }
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
      })
    });
  },
  getJobData: async function() {
    await fetchJobData().then((res) => {
      const { data } = res;
      this.setData({
        pageBean: { ...data }
      })
    }).catch((err) => {
      this.setData({
        canSubmit: false,
        submitBtnName: err.msg,
      })
    });
  },
  bindExpectResignDateChange: function(e) {
    this.setData({
      expectResignDate: e.detail.value,
    })
  },
  bindFormSubmit: async function(e) {
    const { pageBean, expectResignDate, formFields, submitType } = this.data;
    if (!expectResignDate) {
      wx.showToast({
        title: '请选择预离职日期',
        icon:'none',
        duration: 3000
      });
      return;
    }
    if (formFields.length === 0) {
      wx.showToast({
        title: '不符合提交条件',
        icon:'none',
        duration: 3000
      });
      return;
    }
    const formData = e.detail.value;
    const submitData = {
      ...pageBean,
      ...formData,
      expectResignDate: new Date(expectResignDate).setHours(0, 0, 0, 0),
      submitDate: new Date().getTime(),
    }
    const submitList = formFields.map((e) => {
      let value = e.value;
      if (submitData[e.key]) {
        value = submitData[e.key];
      }
      const res = {
        ...e,
        value,
      };
      return res;
    })
    await submitApprove(submitType, submitList); // JSON.stringify(params)
    wx.showToast({
      title: '报备成功',
      icon:'none',
      duration: 3000
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2500);
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
})