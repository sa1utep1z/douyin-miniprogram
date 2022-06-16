
import { fetchMessageList, readMessage} from '../../../api/messageApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showEmptyView: false,
    messageList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
    messageType: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { messageType } = options;
    this.setData({
      messageType,
    });
    this.onRefresh();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleItemTab: async function (e) {
    const { index } = e.currentTarget.dataset;
    const { messageList } = this.data;
    if (!messageList[index].hasRead) {
      messageList[index].hasRead = true;
      this.setData({
       messageList,
      })
     await readMessage(messageList[index].messageId);
    }
 },
  onLoadMore: async function (e) {
    const { pageNumber, pageSize, loadingStatus, messageType, messageList} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
      messageType,
    };
      const res = await fetchMessageList(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          messageList: res.data.content,
          showEmptyView: res.data.content.length <= 0,
        })
      } else {
        this.setData({
          messageList: messageList.concat(res.data.content),
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
  onRefresh: function (e) {
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,   
    });
    this.onLoadMore();
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
})