import { fecthIndexTabList, signUpClick } from '../../api/jobApi'
import { fetchPostArguments } from '../../api/userApi'
import { listBanners } from '../../api/commonApi'
var startPoint;
Page({
  data: {
    bannerList: [],
    listSearchType: 0,
    workType: [
      { title: '全部', value: 'ALL'},
      { title: '领日薪', value: 'DAILY_WORKER'},
      { title: '正式工', value: 'FORMAL_WORKER' },
      { title: '小时工', value: 'HOURLY_WORKER' },
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
    jobId: '',
    keyWord: '',
    oldKeyWord: '', // 用于防止重复提交相同筛选条件
    //按钮位置参数
    buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: '',
  },

  onLoad: function (options) {
    this.getBannerList();
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
    // 获取购物车控件适配参数
    var that =this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        // 高度,宽度 单位为px
        that.setData({
          windowHeight:  res.windowHeight,
          windowWidth:  res.windowWidth,
          buttonTop:res.windowHeight*0.90,//这里定义按钮的初始位置
          buttonLeft:res.windowWidth*0.80,//这里定义按钮的初始位置
        })
      }
    })
  },
  //可拖动悬浮按钮点击事件
  btn_Suspension_click:function(){
    wx.navigateTo({
      url: '/pages/prepareSignUp/prepareSignUp',
    })
  },
  //以下是按钮拖动事件
  buttonStart: function (e) {
    startPoint = e.touches[0]//获取拖动开始点
  },
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
    //计算在X轴上拖动的距离和在Y轴上拖动的距离
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint//重置开始位置
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX
    //判断是移动否超出屏幕
    if (buttonLeft+50 >= this.data.windowWidth){
      buttonLeft = this.data.windowWidth-50;
    }
    if (buttonLeft<=0){
      buttonLeft=0;
    }
    if (buttonTop<=0){
      buttonTop=0
    }
    if (buttonTop + 50 >= this.data.windowHeight){
      buttonTop = this.data.windowHeight-50;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function (e) {
  },
  onShow: function () {
    this.getStatusBarHeight();
  },
  getBannerList: async function () {
    const res = await listBanners();
    if (res && res.code === 0) {
      this.setData({
        bannerList: res.data
      })
    }
  },
  getStatusBarHeight: function () {
    // 获取状态栏高度
    const { statusBarHeight } = wx.getSystemInfoSync();
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
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
    if (bean && bean.jumpType) {
      if (bean.jumpType === 'mini_page') {
        wx.navigateTo({
          url: bean.url,
        })
      } else {
        wx.navigateTo({
          url: '/pages/bannerView/bannerView?pageBean=' + encodeURIComponent(JSON.stringify(bean)),
        })
      }
    }
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
    const { pageNumber, jobList, pageSize, listSearchType, workType, loadingStatus, keyWord} = this.data;
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
      keyWord,
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
  //处理输入
  handleSearchInput: function (e) {
    const { value } = e.detail;
    this.setData({
      keyWord: value,
    });
  },
  handleSearchConfirm: async function (e) {
    const { oldKeyWord } = this.data;
    const { value } = e.detail
    console.info(e.detail)
    if (value && oldKeyWord !== value) {
      this.setLoadingReady();
      this.setData({
        pageNumber: 0,
        oldKeyWord: value,
      });
      this.onLoadMore();
    }
  },
  //重置输入框内容
  handleRest: function (e) {
    console.log(e);
    this.setData({
      keyWord: '',
    });
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
  onSignUp: async function (e) {
    const { id } = e.currentTarget.dataset;
    const params = {orderId: id};
    const res = await signUpClick(params);
    if (res.code !== 0) {
      wx.showToast({
        title: res.msg,
        icon: 'error',
      }); 
    }
    wx.showToast({
      title: '报名成功',
      icon: 'success',
    }); 
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
    
  },

})
