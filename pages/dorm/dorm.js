// pages/dorm/dorm.js
import { listDormLiveData, fetchButtonCheck, fetchCurrDormLiveInfo, submitDormLiveOutApply, submitRepair } from '../../api/dorm'
import { uploadImage } from '../../api/commonApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
    liveOutButton: false,
    liveFixButton: false,
    liveApplyButton: false,
    rentButton: false,
    currDormLiveData: {},
    showStayDialog: false,
    showLiveOutDialog: false,
    startDateLimit: new Date().setHours(0, 0, 0, 0),
    outApplyReasonIndex: '', // 退宿原因index
    outApplyReasonOptions: [
      {"title": "离职退宿", "value": "DORM_LIVE_OUT_RESIGN"},
      {"title": "违纪取消退宿", "value": "DORM_LIVE_OUT_VIOLATE"},
      {"title": "个人外租退宿", "value": "DORM_LIVE_OUT_PERSONAL"},
      {"title": "调迁宿舍", "value": "DORM_LIVE_OUT_TRANSFER"},
    ],
    liveOutDate: '',
    showRepairDialog: false,
    repairApplyTypeIndex: '', // 报修原因index
    repairApplyTypeOptions: [
      {"title": "灯管类", "value": "DORM_REPAIR_LAMP"},
      {"title": "门锁类", "value": "DORM_REPAIR_DOOR"},
      {"title": "床类", "value": "DORM_REPAIR_BED"},
      {"title": "管道堵塞", "value": "DORM_REPAIR_PIPE_BLOCKAGE"},
      {"title": "马桶", "value": "DORM_REPAIR_CLOSESTOOL"},
      {"title": "水龙头", "value": "DORM_REPAIR_TAP"},
      {"title": "沐浴喷头", "value": "DORM_REPAIR_SHOWER_NOZZLE"},
      {"title": "空调器", "value": "DORM_REPAIR_AIRCONDITION"},
      {"title": "热水器", "value": "DORM_REPAIR_HEATER"},
      {"title": "插座线路", "value": "DORM_REPAIR_SOCKET_LINE"},
      {"title": "其他", "value": "DORM_REPAIR_OTHER"},
    ],
    repairApplyContent: '',
    imageList:[],
    imageSubList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,
    });
    this.getDormLiveData();
    this.getButtonCheck();
  },
  bindPickerOutReason: function(e) {
    this.setData({
      outApplyReasonIndex: e.detail.value,
    })
  },
  bindPickerRepairType: function(e) {
    this.setData({
      repairApplyTypeIndex: e.detail.value,
    })
  },
  bindRepairApplyContent: function(e) {
    this.setData({
      repairApplyContent: e.detail.value,
    })
  },
  bindLiveOutDateChange: function(e) {
    this.setData({
      liveOutDate: e.detail.value,
    })
  },
  handelClick: function(e) {
    const { tag } = e.currentTarget.dataset;
    switch(tag) {
      case 'stayDialog':
        this.setData({
          showStayDialog: true,
        })
        break;
      case 'dropOut':
        this.getCurrDormLiveInfo();
        this.setData({
          showLiveOutDialog: true,
        })
        break;
      case 'repair':
        this.getCurrDormLiveInfo();
        this.setData({
          showRepairDialog: true,
        })
        break;
      case 'stay':
        this.setData({
          showStayDialog: false,
        })
        wx.navigateTo({
          url: './pactSign/pactSign',
        }); 
        break;
      case 'rent':
        this.setData({
          showStayDialog: false,
        })
        wx.navigateTo({
          url: './rentSign/rentSign',
        });
        break;
      default:
        wx.showToast({
          title: '此功能暂未开放',
          icon: 'none',
        });
        break;
    }
  },
  closeStayDialog: function() {
    this.setData({
      showStayDialog: false,
    })
  },
  chooseImage: function(){
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
       this.uploadImg(res.tempFilePaths[0])
      }
     }) 
  },
  uploadImg:async function(data){
    const { imageList,imageSubList }=this.data;
    const res = await uploadImage(data);
    if (res.code == 0) { 
      imageSubList.push(res.data.fileKey)
      imageList.push(data)
      this.setData({
        imageSubList:imageSubList,
        imageList:imageList
      })
    }
  },
  deleteImg:function(e){
    const { imageList, imageSubList } =this.data
    const _index = e.target.dataset.index
    imageList.splice(_index,1)
    imageSubList.splice(_index,1)
    this.setData({
      imageList:imageList,
      imageSubList:imageSubList
     })
  },
  getCurrDormLiveInfo: async function() {
    const res = await fetchCurrDormLiveInfo();
    this.setData({
      currDormLiveData: res.data,
    })
  },
  getDormLiveData: async function() {
    const res = await listDormLiveData();
    this.setData({
      dataList: res.data,
    })
  },
  getButtonCheck: async function() {
    const res = await fetchButtonCheck();
    const { liveOutButton, liveFixButton, liveApplyButton, rentButton } = res.data;
    this.setData({
      liveOutButton,
      liveFixButton,
      liveApplyButton,
      rentButton
    })
  },
  handleLiveOutCancel: function() {
    this.setData({
      showLiveOutDialog: false,
      currDormLiveData: {},
      outApplyReasonIndex: '',
      liveOutDate: '',
    })
  },
  handleLiveOutConfirm: async function() {
    const { currDormLiveData, outApplyReasonIndex, outApplyReasonOptions, liveOutDate } = this.data;
    const { id } = currDormLiveData;
    if (outApplyReasonIndex === '' || liveOutDate === '') {
      wx.showToast({
        title: '请填写信息',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    if (!id) {
      wx.showToast({
        title: '提交失败',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    const params = {
      liveOutDate,
      liveOutReasonType: outApplyReasonOptions[outApplyReasonIndex].value,
    };
    await submitDormLiveOutApply(id, params);
    wx.showToast({
      title: '退宿申请成功',
      icon: 'success',
      duration: 2000
    });
    this.setData({
      liveOutButton: false,
      showLiveOutDialog: false,
      currDormLiveData: {},
      outApplyReasonIndex: '',
      liveOutDate: '',
    })
    this.getDormLiveData();
  },
  handleRepairCancel: function() {
    this.setData({
      showRepairDialog: false,
      currDormLiveData: {},
      repairApplyTypeIndex: '',
      repairApplyContent: '',
      imageList:[],
      imageSubList:[],
    })
  },
  handleRepairConfirm: async function() {
    const { repairApplyTypeIndex, repairApplyTypeOptions, repairApplyContent, imageSubList } = this.data;
    if (repairApplyTypeIndex === '' || repairApplyContent === '') {
      wx.showToast({
        title: '报修事项和故障描述不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const params = {
      repairContent: repairApplyContent,
      type: repairApplyTypeOptions[repairApplyTypeIndex].value,
      faultImgs: imageSubList,
    };
    await submitRepair(params);
    wx.showToast({
      title: '维修申请成功',
      icon: 'success',
      duration: 2000
    });
    this.setData({
      showRepairDialog: false,
      currDormLiveData: {},
      repairApplyTypeIndex: '',
      repairApplyContent: '',
      imageList:[],
      imageSubList:[],
    })
    this.getDormLiveData();
  },
  onLoadMore: async function () {
    const { pageNumber, dataList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    }
      const res = await listResignApply(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          dataList: res.data.content,
        })
      } else {
        this.setData({
          dataList: dataList.concat(res.data.content),
        })
      }
      if(pageNumber < totalPages-1){
        this.setLoadingReady();
        this.setData({
          pageNumber: pageNumber + 1,
        });
      } else {
        this.setLoadingNoMore();
      }
  },
  setLoadingStart: function () {
    this.setData({
      loadingStatus: 1,
    }) 
  },
  setLoadingReady: function () {
    this.setData({
      loadingStatus: 0,
    }) 
  },
  setLoadingNoMore: function () {
    this.setData({
      loadingStatus: 2,
    }) 
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