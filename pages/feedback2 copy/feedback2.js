// pages/resignApplyDetail/resignApplyDetail.js
import { uploadImage, submitSuggestion } from '../../api/commonApi';
import { companySelectDatas } from '../../api/selectData';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companySelectedName: '',
    companySelectedId: '',
    companyScrollShow: false, // 企业下拉选择显示隐藏
    imageList: [],
    imageSubList: [],
    content: '', // 反馈内容
    userName: '', // 姓名
    mobile: '', // 手机号
    pageBean: {},
    typeIndex: '',
    typeOptions: [
    { "title": "薪资问题", "value": "SALARY" },
    { "title": "借支问题", "value": "BORROW" },
    { "title": "驻厂问题", "value": "RESIDENTIAL" },
    { "title": "投诉问题", "value": "COMPLAINT" },
    { "title": "宿舍问题", "value": "DORMITORY" }],

    companyOptions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchCompanyList();
  },
  fetchCompanyList: async function () {
    const companyListRes = await companySelectDatas();
    this.setData({
      companyOptions: companyListRes.data
    });
  },
  chooseImage: function () {
    tt.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: (res) => {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            this.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            this.chooseWxImage('camera');
          }
        }
      }
    });
  },
  chooseWxImage: function (type) {
    tt.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: (res) => {
        this.uploadImg(res.tempFilePaths[0]);
      }
    });
  },
  uploadImg: async function (data) {
    const { imageList, imageSubList } = this.data;
    const res = await uploadImage(data);
    if (res.code == 0) {
      imageSubList.push(res.data.fileKey);
      imageList.push(data);
      this.setData({
        imageSubList: imageSubList,
        imageList: imageList
      });
    }
  },
  deleteImg: function (e) {
    const { imageList, imageSubList } = this.data;
    const _index = e.target.dataset.index;
    imageList.splice(_index, 1);
    imageSubList.splice(_index, 1);
    this.setData({
      imageList: imageList,
      imageSubList: imageSubList
    });
  },
  clickShow: function () {
    this.setData({
      companyScrollShow: true
    });
  },
  bindPickerType: function (e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },
  bindContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  bindUserName: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },
  bindMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  selectCallBack: function (e) {
    console.info(e);
    const { label, value } = e.detail;
    this.setData({
      companyScrollShow: false,
      companySelectedName: label,
      companySelectedId: value
    });
  },
  cancelSelect: function (e) {
    this.setData({
      companyScrollShow: false
    });
  },
  feedbackSub: async function (e) {
    const { typeIndex, typeOptions, imageSubList, content, userName, mobile, companySelectedId } = this.data;
    if (typeIndex === '' || content === '' || userName === '' || mobile === '' || companySelectedId === '') {
      tt.showToast({
        title: '信息未补充完整',
        icon: 'error',
        duration: 3000
      });
      return;
    }
    const params = {
      type: typeOptions[typeIndex].value,
      imgKeys: imageSubList,
      content, userName, mobile,
      companyId: companySelectedId
    };
    await submitSuggestion(params);
    tt.showToast({
      title: '反馈成功',
      icon: 'success',
      duration: 2500
    });
    setTimeout(function () {
      tt.navigateBack({
        delta: 0
      });
    }, 2000);
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