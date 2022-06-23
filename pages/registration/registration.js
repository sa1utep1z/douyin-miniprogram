// pages/registration/registration.js
import { fetchUserSignUpList } from '../../api/jobApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signUpList: [],
    pageSize: 15,
    pageNumber: 0,
    loadingStatus: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setLoadingReady();
    // this.setData({
    //   pageNumber: 0,
    // });
    // this.onLoadMore();
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
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,
    });
    this.onLoadMore();
  },

  onLoadMore: async function () {
    const { pageNumber, signUpList, pageSize, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const params = {
      pageNumber,
      pageSize,
    }
      const res = await fetchUserSignUpList(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          signUpList: res.data.content,
        })
      } else {
        this.setData({
          signUpList: signUpList.concat(res.data.content),
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
})