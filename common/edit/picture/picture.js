// common/edit/picture/picture.js
import ApiUrl from '../../../api-url';
import * as Tool from '../../../tool';

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: 3
    },
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMoveDown() {
      this.triggerEvent('movedown');
    },
    handleMoveUp() {
      this.triggerEvent('moveup');
    },
    handleDel() {
      this.triggerEvent('del');
    },
    handleUpload() {
      let token = app.globalData.nowToken;
      let unionId = app.globalData.unionId;

      Tool.wx.chooseImage({ count: 1 })
        .then(img => {
          return Tool.wx.uploadFile({
            url: ApiUrl.file,
            filePath: img.tempFilePaths[0],
            name: 'file'
          });
        })
        .then(file => {
          let res = JSON.parse(file.data);
          if (res.code > 0) {
            // throw res.msg;
            return; // TODO
          }
          this.triggerEvent('upload');
        });
    }
  }
})
