// pages/feedBack/feedBack.js
import { uploadImage, submitSuggestion, fetchFeedbackCategories } from '../../api/commonApi';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imageSubList: [],
    content: '',
    tipList: [],
    categoryId: ''
  },
  selectTip: function (e) {
    const _value = e.currentTarget.dataset.value;
    this.setData({
      categoryId: _value
    });
  },

  inputChange: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  chooseImage: function () {
    tt.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: (res) => {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            this.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            this.chooseWxImage('camera');
          }
        }
      }
    });
  },
  chooseWxImage: function (type) {
    tt.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: (res) => {
        this.uploadImg(res.tempFilePaths[0]);
      }
    });
  },
  uploadImg: async function (data) {
    const { imageList, imageSubList } = this.data;
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
  deleteImg: function (e) {
    const { imageList, imageSubList } = this.data;
    const _index = e.target.dataset.index;
    imageList.splice(_index, 1);
    imageSubList.splice(_index, 1);
    this.setData({
      imageList: imageList,
      imageSubList: imageSubList
    });
  },
  getTagList: async function () {
    const res = await fetchFeedbackCategories();
    if (res.code === 0) {
      this.setData({
        tipList: res.data,
        categoryId: res.data[0].categoryId
      });
    }
  },
  feedbackSub: async function () {
    this.submit();
  },
  submit: async function () {
    const { content, imageSubList, categoryId } = this.data;
    const params = {
      content,
      categoryId,
      imgKeys: imageSubList
    };
    const res = await submitSuggestion(params);
    if (res.code === 0) {
      tt.showToast({
        title: '反馈成功',
        icon: 'success',
        success: (res) => {
          setTimeout(() => {
            tt.navigateBack({
              delta: 0
            });
          }, 1000);
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTagList();
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

  }
});