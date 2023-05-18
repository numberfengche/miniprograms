// components/nav/index.ts
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
        navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
