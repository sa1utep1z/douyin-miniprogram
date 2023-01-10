// pages/prepareSignUp/prepareSignUp.js
import { listPreSignUpMode, fetchPreSignUpMode, submitPreSignUp, fetchRecruiter } from '../../api/prepareSignUp'
import { ocrIdNo } from '../../api/commonApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preSignUpModeOptions: [],
    preSignUpModeIndex: '',
    desc: '', // 预约/推荐奖励
    companyOptions: [],
    companyIndex: '',
    preDate: '',
    preDateStart: '',
    preDateEnd: '',
    userName: '',
    idNo: '',
    mobile: '',
    nation: null,
    address: null,
    authority: null,
    timeLimit: null,
    arrivalMode: 'STORE',
    isSubmit: true,
    recruiterId: '',
    recruiterName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListPreSignUpMode();
  },
  getListPreSignUpMode: async function() {
    const res = await listPreSignUpMode();
    this.setData({preSignUpModeOptions:  res.data})
  },
  changePreSignUpMode: async function(e) {
    const { preSignUpModeOptions } = this.data;
    const res = await fetchPreSignUpMode(preSignUpModeOptions[e.detail.value]['key']);
    const {data} = res;
    this.setData({
      preSignUpModeIndex: e.detail.value,
      desc: data.desc,
      companyOptions: data.companyOptions,
      companyIndex: '',
      preDate: '',
      preDateStart: data.startDate,
      preDateEnd: data.endDate,
    })
  },
  changeCompany: function(e) {
    this.setData({
      companyIndex: e.detail.value
    })
  },
  changePreDate: function(e) {
    this.setData({
      preDate: e.detail.value,
    })
  },
  bindUserName: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindIdNo: function(e) {
    const idNo_input = e.detail.value;
    this.setData({
      idNo: idNo_input
    })
    if (idNo_input.length === 18) {
      fetchRecruiter(idNo_input).then((res) => {
        this.setData({
          recruiterId: res.data.id,
          recruiterName: res.data.name,
        });
      });
    }
  },
  bindMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindNation: function(e) {
    this.setData({
      nation: e.detail.value
    })
  },
  bindAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindAuthority: function(e) {
    this.setData({
      authority: e.detail.value
    })
  },
  bindTimeLimit: function(e) {
    this.setData({
      timeLimit: e.detail.value
    })
  },
  changeArrivalMode: function(e) {
    this.setData({
      arrivalMode: e.detail.value
    })
  },
  submitData: async function() {
    const { preSignUpModeOptions, preSignUpModeIndex, companyOptions, companyIndex, preDate, userName, idNo, mobile, nation, address, authority, timeLimit, arrivalMode, recruiterId } = this.data;
    if (preSignUpModeIndex === '' || companyIndex === '' || preDate === '' || userName === '' || idNo === '' || mobile === '' || arrivalMode === '') {
      wx.showToast({
        title: '请完善信息',
        icon: 'error'
      });
      return;
    }
    if (recruiterId === '' || recruiterId === null) {
      wx.showToast({
        title: '专属招聘员不能为空',
        icon: 'none'
      });
      return;
    }
    this.setData({isSubmit: false})
    const params = {
      preSignUpModeId: preSignUpModeOptions[preSignUpModeIndex]['key'],
      companyId: companyOptions[companyIndex]['companyId'],
      preDate,
      userName,
      idNo,
      mobile,
      nation,
      address,
      authority,
      timeLimit,
      arrivalMode,
      recruiterId
    };
    await submitPreSignUp(params);
    wx.showToast({
      title: '提交成功',
      icon:'none',
      duration: 3000
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2500);
  },
  ocrClick: async function(e) {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: (res)=> {
       if (!res.cancel) {
        if (res.tapIndex == 0) {
         this.chooseWxImage('album')
        } else if (res.tapIndex == 1) {
          this.chooseWxImage('camera')
        }
       }
      }
    })
  },
  chooseWxImage:function(type){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success:  (res) =>{
        console.info(res);
       this.uploadImg(res.tempFilePaths[0])
      }
     }) 
  },
  uploadImg: async function(imgData){
    const res = await ocrIdNo(imgData);
    if (res.code == 0) {
      const { data } = res;
      const { userName, idNo, nation, address, authority, timeLimit } = this.data;
      this.setData({
        userName: data.name ? data.name : userName,
        idNo: data.idNo ? data.idNo : idNo,
        nation: data.nation ? data.nation : nation,
        address: data.address ? data.address : address,
        authority: data.authority ? data.authority : authority,
        timeLimit: data.timeLimit ? data.timeLimit : timeLimit,
      })
      if (data.idNo) {
        const idNoRes = await fetchRecruiter(data.idNo);
        this.setData({
          recruiterId: idNoRes.data.id,
          recruiterName: idNoRes.data.name,
        });
      }
    }
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