import { request } from "../../utils/net";

// pages/activity/activity.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        request({
            url: "/api/mini/activity/list",
            success: ({ data }: any) => {
                console.log(data);
                this.setData({ list: data.list })
            },
            fail: () => {
            },
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    back(){
  wx.switchTab({
      url:"/pages/index/index"
  })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },
    goview(){
  wx.navigateTo({
      url:"/pages/webview/index"
  })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})