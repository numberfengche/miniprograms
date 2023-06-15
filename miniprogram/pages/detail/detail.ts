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
        show:false,
        id:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(data:any) {
        console.log(data);
        const { article_id,show } = data;
        console.log(show);
        this.setData({
            show:show,
            id:article_id
        })
        this.getSource(article_id)
    },
    goback(){
        wx.switchTab({
            url: "/pages/index/index",
        })
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
    dianzan() {
        request({
            url: "/api/mini/article/interact",
            method: 'POST',
            data: { type: 1, article_id:Number(this.data.id)  },
            success: ({ data }: any) => {

                console.log(data);
                this.setData({ show: true });
                wx.showToast({
                    title: data.tips,
                    icon: "none"
                })
            },
            fail: () => {
            },
        });
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
        return {
            path: `/pages/detail/detail?article_id=${this.data.id}`,
          };
    }
})