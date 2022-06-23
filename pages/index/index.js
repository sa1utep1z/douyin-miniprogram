import { fecthIndexTabList, fetchSignUpInfo } from '../../api/jobApi'
import { fetchPostArguments } from '../../api/userApi'
Page({
  data: {
    bannerList: [
      'https://labor-prod.oss-cn-shenzhen.aliyuncs.com/laborMgt/labor/miniProgram/banner%402x.png',
      'https://labor-prod.oss-cn-shenzhen.aliyuncs.com/laborMgt/labor/miniProgram/banner%402x.png',],
    listSearchType: 0,
    workType: [
      { title: '全部', subTitle: '高薪名企', value: 'ALL'},
      { title: '领日薪', subTitle: '天天领工资', value: 'DAILY_WORKER'},
      { title: '有奖励', subTitle: '推荐奖/入职奖', value: 'HAVE_REWARD' },
      { title: '正式工', subTitle: '高返费/高福利', value: 'FORMAL_WORKER' },
      { title: '小时工', subTitle: '高工价/发薪日', value: 'HOURLY_WORKER' },
    ],
    pageSize: 15,
    pageNumber: 0,
    jobList: [],
    loadingStatus: 0,
    showSuccess: false,
    statusNavBarHeight: 0,
    navBarHeight: 0,
    height: 0,
    top: 0,
    showSignDialog: false,
    jobId: '',
  },

  onLoad: function (options) {
    const { recommendId, scene } =  options;
    if (recommendId) {
      wx.setStorageSync('recommendId', recommendId);
    }
    console.log('options', options);
    if (scene) {
      this.parseScene(scene);
    }
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
        wx.setStorageSync('latitude', res.latitude);
        wx.setStorageSync('longitude', res.longitude);
        this.getData();
      },
      fail:(erro)=>{
       this.getData();
        console.log(erro);
      },
    });
  
  },
  onShow: function () {
    this.getStatusBarHeight();
  },

  getStatusBarHeight: function () {
    // 获取状态栏高度
    const { statusBarHeight } = wx.getSystemInfoSync();
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log(statusBarHeight);
    console.log(menuButtonObject);
    const { top, height } = menuButtonObject;
    // 计算导航栏的高度
    // 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    const navBarHeight = height + (top - statusBarHeight) * 3;
    // 计算状态栏与导航栏的总高度
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    this.setData({
      navBarHeight,
      statusNavBarHeight,
      height,
      top,
    });
  },
  getData: function () {
    this.setLoadingReady();
    this.setData({
      pageNumber: 0,
    });
    this.onLoadMore();
  },
  onBannerClick: function (e) {
   const { bean } = e.currentTarget.dataset;
  },
  onTabClicked: function (e) {
   const { index } = e.currentTarget.dataset;
   this.setData({
    listSearchType: index,
   });
   this.onRefresh();
  },
  onJobClicked: function (e) {
    const { bean } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../pages/jobDetail/jobDetail',
    })
  },
  onLoadMore: async function (e) {
    const { pageNumber, jobList, pageSize, listSearchType, workType, loadingStatus} = this.data;
    if ( loadingStatus!==0 ) {
      console.log('过滤无效请求');
      return;
    }
    this.setLoadingStart();
    const longitude = wx.getStorageSync('longitude');
    const latitude = wx.getStorageSync('latitude');
    const searchEnum = workType[listSearchType].value;
    let gps = null;
    if (longitude && latitude){
       gps = {
        longitude,
        latitude
      }
    }
    const params = {
      pageNumber,
      pageSize,
      searchEnum,
      gps: gps,
    };
      const res = await fecthIndexTabList(params);
      const totalPages = res.data.totalPages;
      if(pageNumber === 0) {
        this.setData({
          jobList: res.data.content,
        })
      } else {
        this.setData({
          jobList: jobList.concat(res.data.content),
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
  showSuccess: function () {
    this.setData({
      showSuccess: true,
    });
    wx.hideTabBar({
      animation: true
    });
    setTimeout(() => {
      this.setData({
        showSuccess: false,
      });
    }, 5000);
  },
  onClickHide: function () {
    this.setData({
      showSuccess: false,
    });
    wx.showTabBar({
      animation: true
    });
  },
  handleItemClick: function (e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/jobDetail/jobDetail?jobId=${item.id}`,
    });
  }, 
  handleSearch: function (e) {
    wx.navigateTo({
      url: '../../pages/search/search',
    });
  },
  onChangeDialog: function (e) {
    this.setData(({
      showSignDialog: e.detail,
    }))
  },
  onSignUp: async function (e) {
    const { id } = e.currentTarget.dataset;
    const { showSignDialog } = this.data;
    const res = await fetchSignUpInfo();
    if (res.data.enable) {
      if( !showSignDialog ) {
        this.setData({
          jobId: id,
          showSignDialog: true,
        });
      } 
    } else {
      wx.showToast({
        title: '您有正在报名中的岗位，暂时无法报名',
        icon: 'none',
        duration: 2500,
      })
    }  
  },

  parseScene: async  function (scene) {
    // 缓存分享参数id
    wx.setStorageSync('shareSceneId', scene);
    const res =  await  fetchPostArguments(scene);
    const {recommendId, jobId} = res.data;
    if (recommendId) {
      wx.setStorageSync('recommendId', recommendId);
    }
    if (jobId) {
      wx.setStorageSync('jobId', jobId);
    }
  },
   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //优化 如果弹框途中 切换了tab，则隐藏弹框
    const { showSignDialog } = this.data;
    if (showSignDialog) {
      this.setData(({
        showSignDialog: false,
      }))
    }
  },

})
