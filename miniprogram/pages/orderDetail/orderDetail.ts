import { request } from "../../utils/net";

// pages/orderDetail/orderDetail.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        source: {} as any
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var _this = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            console.log(data);
            const dataInfo = data.data
            _this.setData({
                source: dataInfo
            });
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    back() {
        wx.switchTab({
            url: "/pages/index/index",
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    goOrder() {
        wx.navigateTo({
            url:`/pages/order/order?id=-1`
        })
    },
    onShow() {
        // request({
        //     url: `/api/mini/trade/detail?trade_id=2QKtVeuClnnfUKDRkiWLTXPxkkt`,
        //     success: ({ data }: any) => {
        //         console.log(data);
        //     },
        //     fail: () => {
        //     },
        // });
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