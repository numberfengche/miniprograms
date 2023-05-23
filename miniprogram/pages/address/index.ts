import { request } from "../../utils/net";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        show:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },
    add() {
        if (this.data.list.length === 20) {
            wx.showToast({ title: "地址最多添加20条", icon: "none" });
        } else {
            wx.navigateTo({ url: "/pages/address/new/index" })
        }
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
      this.setData({ show:true});
        request({
            url: "/api/mini/address/list",
            success: ({ data }: any) => {
                const { list } = data
                console.log(data);
                this.setData({ list: list,show:false});
            },
        });
    },
    //修改地址
    modifyAddress(e: any) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/address/new/index`,
            events: {
                acceptDataFromOpenedPage: function (item: any) {
                    console.log(item)
                },
            },
            success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
            }
        })
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