Component({
  data: {
    flagMove:false,//默认未签名
    context:null,

  },
  created: function (options) {
    let context = wx.createCanvasContext('canvasId')
    console.info('context', context);
    this.setData({
      context: context
    })
    context.draw();
  },
  methods: {
    bindtouchstart(e) {
      console.log("bindtouchstart", e);
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
    },
    // 触摸移动
    bindtouchmove(e) {
      console.log("bindtouchstart", e);
      this.setData({
        flagMove:true,
      })
      this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
      this.data.context.stroke();
      this.data.context.draw(true);
      this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },
    /**清空画布 */
    clear() {
      this.data.context.clearRect(0, 0, 600, 700);//清空画布
      this.data.context.draw();
      this.setData({
        flagMove:false
      })
    },
    /**导出图片 */
   export() {
      const that = this;
      if(!that.data.flagMove){
        console.log('签名获取失败，请稍后重试');
        return;
      }
      that.data.context.draw(true, wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        fileType: 'jpg',
        canvasId: 'canvasId',
        success(res) {
          const { tempFilePath } = res;
          console.log('手写签名，签字图片',tempFilePath)
        },
        fail() {
          showToast('签名提交失败');
        }
      }))
    },
  },
})