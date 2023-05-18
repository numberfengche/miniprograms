// pages/detail/detail.ts
import { formatRichText } from "../../utils/util";
import { request } from "../../utils/net";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        html:{},
        navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(data:any) {
        console.log(data);
        const { article_id } = data;
        this.getSource(article_id)
    },
    getSource(article_id:any){
        request({
           url: `api/mini/article/detail?article_id=${article_id}`,
           method: "GET",
           success: ({ data}: any) => {
             console.log(data);
             data.html=formatRichText(data.html)
             this.setData({html:data})
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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