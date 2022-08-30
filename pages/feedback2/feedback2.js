// pages/resignApplyDetail/resignApplyDetail.js
import { uploadImage } from '../../api/commonApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    imageSubList:[],
    pageBean: {},
    typeIndex: '',
    typeOptions: ["薪资问题", "借支问题"],
    companyOptions: [
      {
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },{
        id: '1',
        name: "张三"
      }, {
        id: '2',
        name: "李四"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  chooseImage:function(){
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
  bindPickerType: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindFormSubmit: async function(e) {
    console.info(e);
  },
  selectChange: function(e) {
    console.info('selectChange', e);
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