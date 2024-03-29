// pages/entryData/entryData.js
import { uploadImage } from '../../api/commonApi';
import { fetchEntryDataInfo, submitEntryDataInfo } from '../../api/entryData';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitDisabled: false,
    qqNumber: '',
    urgentName: '',
    urgentMobile: '',
    urgentRelation: '',
    entryImgs: [],
    entryInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getEntryDataInfo();
  },
  jumpAuthCenterNew: function () {
    tt.navigateTo({
      url: '/pages/authCenterNew/authCenterNew'
    });
  },
  jumpBankCard: function () {
    tt.navigateTo({
      url: '/pages/bankCard/bankCard'
    });
  },
  getEntryDataInfo: async function () {
    const res = await fetchEntryDataInfo();
    const { qqNumber, urgentName, urgentMobile, urgentRelation } = res.data;
    this.setData({
      qqNumber,
      urgentName,
      urgentMobile,
      urgentRelation,
      entryInfo: res.data
    });
  },
  submitData: async function () {
    const { qqNumber, urgentName, urgentMobile, urgentRelation, entryImgs, entryInfo } = this.data;
    const { userName, idNo, mobile, bankName, bankAccount } = entryInfo;
    if (!userName || !idNo || !mobile) {
      tt.showToast({
        title: '实名信息未完整，请点击去实名',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    this.setData({ submitDisabled: true });
    const params = {
      qqNumber,
      urgentName,
      urgentMobile,
      urgentRelation,
      otherEntryMaterials: entryImgs.map((e) => ({ fileKey: e.ossKey }))
    };
    await submitEntryDataInfo(params).then((res) => {
      if (res.code === 0) {
        tt.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 3000
        });
        setTimeout(() => {
          tt.navigateBack({
            delta: 0
          });
        }, 2500);
      }
    }).catch((err) => {
      tt.showToast({
        title: err.msg,
        icon: 'none',
        duration: 3000
      });
      this.setData({ submitDisabled: false });
    });
  },
  afterRead: function (event) {
    const { file } = event.detail;
    file.forEach((f) => this.uploadImgFile(f));
  },
  uploadImgFile: async function (f) {
    const res = await uploadImage(f.url);
    if (res.code == 0) {
      const { entryImgs = [] } = this.data;
      entryImgs.push({ ...f, ossKey: res.data.fileKey });
      this.setData({ entryImgs });
    }
  },
  deleteImg: function (event) {
    const { index } = event.detail;
    const { entryImgs } = this.data;
    entryImgs.splice(index, 1);
    this.setData({ entryImgs });
  },
  uploadImg: async function (data) {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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