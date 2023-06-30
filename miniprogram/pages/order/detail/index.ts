import { request } from "../../../utils/net";

// pages/order/detail/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:{},
        priceInfo: {  },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad({trade_id}:any) {
    console.log(trade_id);
    request({
        url: `/api/mini/trade/detail?trade_id=${trade_id}`,
        success: ({ data }: any) => {
            console.log(data);
            
            // const { list } = data;
            this.setData({ info: data,
                priceInfo: {
                    price: data.goods_price_total,
                    points: data.goods_points_total,
                    postage: data.freight_str,
                    goods_price_total_str: data.goods_price_total_str,
                    price_total_str:data.price_total_str,
                    price_total: data.price_total,
                    points_total: data.price_total,
                } 
            })
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