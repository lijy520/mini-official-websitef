// common/edit/toolbar/toolbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
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
    }
  }
})
