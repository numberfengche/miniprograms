import { request } from "../../../utils/net";

// pages/square/trolley/trolley.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: [ ],
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
this.getGoodsNum()
    },
    onChange(event:any) {
        console.log(event);
        this.setData({
          result: event.detail,
        });
      },
      onStepperChange(e:any){
          console.log(e);
          const goods_id = e.currentTarget.dataset.id
          const cart_id = e.currentTarget.dataset.cartid
          console.log(e.detail);
          this.changeNum(cart_id,e.detail)
      },
      //修改数量
      changeNum(cart_id:any,num:any){
        request({
            url: `/api/mini/cart/set-num`,
            method:"POST",
            data:{
                cart_id,
                num
            },
            success: ({ data }: any) => {
                // this.setData({ list: data.list })
            },
            fail: () => {
            },
        });
      },
    getGoodsNum() {
        request({
            url: `/api/mini/cart/list`,
            success: ({ data }: any) => {
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