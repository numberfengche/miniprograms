import { request } from "../../../utils/net";
Page({
    data: {
        source: {} as any,
        add_loading: false,
        num: 0 //购物车数量
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
    //  购物车列表
    getGoodsNum() {
        request({
            url: `/api/mini/cart/list`,
            success: ({ data }: any) => {
                this.setData({ num: data.total })
            },
            fail: () => {
            },
        });
    },
    addtocart() {
        this.setData({ add_loading: true });
        const goods_id = this.data.source?.goods_id
        request({
            url: `/api/mini/cart/add`,
            method: "POST",
            data: {
                goods_id
            },
            success: ({ data }: any) => {
                console.log(data);
                this.setData({ add_loading: false });
                wx.showToast({ title: "添加成功,快去付款吧~", icon: "none" });
                this.getGoodsNum()
            },
            fail: () => {
            },
        });
    },
    gotrolley() {
        wx.navigateTo({ url: "/pages/square/trolley/trolley" })
    },
 buy(){
     const list = [{goods_id:this.data.source.goods_id,num:1}]
    if (list.length > 0) {
        wx.navigateTo({
            url: "/pages/payment/payment",
            events: {
                acceptDataFromOpenedPage: function (item: any) {
                    console.log(item)
                },
            },
            success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: list })
            }
        })
    } else {
        wx.showToast({
            title: "请先选择商品~",
            icon: "none"
        })
    }
 },
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getGoodsNum()
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