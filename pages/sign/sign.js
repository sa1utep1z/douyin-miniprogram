import { uploadCommonImage } from '../../api/commonApi';
Page({
  data: {
    context1: null,
    hasDraw: false //默认没有画
  },
  onLoad: function () {
    const context1 = tt.createCanvasContext('handWriting1');
    context1.setStrokeStyle("#000000");
    context1.setLineWidth(3);
    this.setData({
      context1: context1
    });
  },
  touchstart1: function (e) {
    const context1 = this.data.context1;
    context1.moveTo(e.touches[0].x, e.touches[0].y);
    this.setData({
      context1: context1,
      hasDraw: true //要签字了
    });
  },
  touchmove1: function (e) {
    const x = e.touches[0].x;
    const y = e.touches[0].y;
    const context1 = this.data.context1;
    context1.setLineWidth(3);
    context1.lineTo(x, y);
    context1.stroke();
    context1.setLineCap('round');
    context1.draw(true);
    context1.moveTo(x, y);
  },
  reSign1: function () {//重新画
    const that = this;
    const context1 = that.data.context1;
    context1.draw(); //清空画布
    that.setData({
      hasDraw: false //没有画
    });
  },
  sign1ok: function () {
    const that = this;
    if (!that.data.hasDraw) {
      tt.showToast({
        title: '未进行签字',
        icon: 'error',
        duration: 2000
      });
      return;
    }
    const context1 = that.data.context1;
    context1.draw(true, tt.canvasToTempFilePath({
      canvasId: 'handWriting1',
      success(res) {
        that.uploadCommonImg(res.tempFilePath);
      },
      fail(res) {
        tt.showToast({
          title: '生成图片失败',
          icon: 'error',
          duration: 2000
        });
      }
    }));
  },
  uploadCommonImg: async function (data) {
    const res = await uploadCommonImage(data);
    if (res.code == 0) {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        imgInfo: res.data
      });
      tt.navigateBack({ //返回
        delta: 1
      });
    }
  }
});