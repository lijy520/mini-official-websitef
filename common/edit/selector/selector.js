// common/edit/selector/selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedGroup: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelectGroup(e) {
      let group = Number(e.currentTarget.dataset.group);
      this.setData({ selectedGroup: group });
    }
  }
})
