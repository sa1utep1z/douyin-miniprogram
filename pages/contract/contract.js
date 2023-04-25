// pages/contract/contract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    base64: "",
    baidutoken: "",
    msg: null
  },

  //拍照并编码
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
          src: res.tempImagePath
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: that.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调          
            that.setData({
              base64: res.data
            })
            that.checkPhoto();
          }
        })
      }
    })
  },
  checkPhoto() {
    var that = this;
    that.validPhoto();
  },
  validPhoto() {
    var that = this;
    //上传人脸进行 比对
    
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