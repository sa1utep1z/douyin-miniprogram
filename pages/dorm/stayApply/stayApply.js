// pages/dorm/stayApply/stayApply.js
import { routineFreeRoomHierarchy, fetchDormLiveInfo, submitDormLive, fetchRandomDorm } from '../../../api/dorm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signImgKey: '',
    returnInfo: {}, // 回显的对象信息
    freeBuildData: [], // 空闲楼栋的层级数组(后台返回的，不可变动)
    freeFloorData: [], // 对应楼栋的楼层
    freeRoomData: [], // 对应楼层的房间
    freeBedData: [], // 对应房间的床位
    buildIndex: '', // 选择的楼栋下拉下标
    floorIndex: '', // 选择的楼层下拉下标
    roomIndex: '', // 选择的房间下拉下标
    bedIndex: '', // 选择的床位下拉下标
    agreePact: false,
    canSubmit: false,
    submitBtnName: '提交',
    editHometown: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { signImgKey } = options;
    if (signImgKey) {
      this.setData({
        signImgKey,
      })
      this.getDormLiveInfo().then(e => {
        if (e) {
          this.getRoutineFreeRoomHierarchy().then(r => {
            if (r) {
              this.getRandomDorm();
            }
          })
        }
      })
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
  getDormLiveInfo: async function() {
    return await fetchDormLiveInfo().then((res) => {
      this.setData({
        canSubmit: true,
        returnInfo: res.data,
        editHometown: res.data.hometown,
      })
      return true;
    }).catch((err) => {
      this.setData({
        canSubmit: false,
        submitBtnName: err.msg,
      })
      return false;
    });
  },
  getRoutineFreeRoomHierarchy: async function() {
    return await routineFreeRoomHierarchy().then((res) => {
      this.setData({
        freeBuildData: res.data,
      })
      return true;
    }).catch((err) => {
      return false;
    });
    
  },
  getRandomDorm: async function() {
    const res = await fetchRandomDorm();
    const { freeBuildData } = this.data;
    const { roomBuildingId, roomFloorId, roomId, roomBedId } = res.data;
      if (roomBuildingId && roomFloorId && roomId && roomBedId) {
        const buildIndex = freeBuildData.findIndex((v) => v.id === roomBuildingId);
        const freeFloorData = freeBuildData[buildIndex].floors;
        const floorIndex = freeFloorData.findIndex((v) => v.id === roomFloorId);
        const freeRoomData = freeFloorData[floorIndex].rooms;
        const roomIndex = freeRoomData.findIndex((v) => v.id === roomId);
        const freeBedData = freeRoomData[roomIndex].beds;
        const bedIndex = freeBedData.findIndex((v) => v.id === roomBedId);
        this.setData({
          freeFloorData,
          freeRoomData,
          freeBedData,
          buildIndex,
          floorIndex,
          roomIndex,
          bedIndex
        })
      }
  },
  switch2Change: function(e) {
    const { value } = e.detail;
    this.setData({
      agreePact: value,
      canSign: value,
    })
  },
  rediectPact: function(e) {
    wx.navigateTo({
      url: '../pactSign/pactSign?onlyView=true',
    });
  },
  bindPickerBuild: function(e) {
    const { freeBuildData } = this.data;
    this.setData({
      buildIndex: e.detail.value,
      floorIndex: '',
      roomIndex: '',
      bedIndex: '',
      freeFloorData: freeBuildData[e.detail.value].floors,
      freeRoomData: [],
      freeBedData: [],
    })
  },
  bindPickerFloor: function(e) {
    const { freeFloorData } = this.data;
    this.setData({
      floorIndex: e.detail.value,
      roomIndex: '',
      bedIndex: '',
      freeRoomData: freeFloorData[e.detail.value].rooms,
      freeBedData: [],
    })
  },
  bindPickerRoom: function(e) {
    const { freeRoomData } = this.data;
    this.setData({
      roomIndex: e.detail.value,
      bedIndex: '',
      freeBedData: freeRoomData[e.detail.value].beds,
    })
  },
  bindPickerBed: function(e) {
    this.setData({
      bedIndex: e.detail.value,
    })
  },
  bindHometown: function(e) {
    this.setData({
      editHometown: e.detail.value,
    })
  },
  submitData: async function() {
    const { agreePact, returnInfo, editHometown, bedIndex, freeBedData, signImgKey } = this.data;
    if (!agreePact) {
      wx.showToast({
        title: '请先勾选阅读条款',
        icon: 'none',
      });
      return;
    }
    if (!editHometown) {
      wx.showToast({
        title: '请输入籍贯',
        icon: 'none',
      });
      return;
    }
    if (bedIndex !== 0 && !bedIndex) {
      wx.showToast({
        title: '请选择床位',
        icon: 'none',
      });
      return;
    }
    const params = {
      recruitFlowId: returnInfo.recruitFlowId,
      hometown: editHometown,
      roomBedId: freeBedData[bedIndex].id,
      signImgKey,
    }
    await submitDormLive(params);
    this.setData({
      canSubmit: false,
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(function() {
      wx.navigateBack({
        delta: 0,
      })
    }, 2000)
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