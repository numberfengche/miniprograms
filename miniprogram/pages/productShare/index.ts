// pages/productShare/index.ts

import { request } from "../../utils/net";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        shareID: 0,

        shareInfo: {
            company_name: "",
            user_name: "",
            product_total: 0,
            share_time: "",
            creator_phone: "",
            products: [],
        },
    },

    onLoad: function (query: any) {
        // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        const scene = decodeURIComponent(query.scene)
        this.setData({
            shareID: scene == undefined || scene == "undefined" ? 0 : parseInt(scene)
        })

        //等待登录后请求数据
        const _this = this;
        const interval = setInterval(function () {
            const { token } = getApp().globalData;
            if (token == "") {
                return;
            }

            //先请求最近的商品组
            if (_this.data.shareID == 0) {
                _this.latestGroup()
            } else {
                _this.getData(_this.data.shareID)
            }

            clearInterval(interval);
        }, 500);
    },

    latestGroup: function () {
        const _this = this
        //拿数据 加载
        request({
            url: "/api/weapp/spread/latest-view",
            method: "POST",
            success: ({ data }: any) => {
                if (data.id > 0) {
                    this.setData({
                        shareID: data.id,
                    });
                    _this.getData(data.id)
                }
            },
        });
    },

    getData: function (shareID: any) {
        if (shareID == 0) {
            return
        }

        //拿数据 加载
        request({
            url: "/api/weapp/spread/info?id=" + shareID,
            method: "GET",
            success: ({ data }: any) => {
                this.setData({
                    shareInfo: {
                        company_name: data.company_name,
                        user_name: data.user_name,
                        product_total: data.product_total,
                        share_time: data.share_time,
                        creator_phone: data.creator_phone,
                        products: data.product_list,
                    },
                });
            },
        });
    },

    callUser: function () {
        if (this.data.shareInfo.creator_phone == "") {
            wx.showToast({ title: "无电话信息", icon: "none" });
            return;
        }

        wx.makePhoneCall({
            phoneNumber: this.data.shareInfo.creator_phone,
        });
    },

    tocoop() {
        wx.navigateTo({ url: "/pages/coopList/coopList" })
    },

    onShareAppMessage() {
        return this.shareData()
    },

    onShareTimeline() {
        return this.shareData()
    },

    shareData() {
        if (this.data.shareInfo.products.length == 0) {
            return {}
        }

        const product: any = this.data.shareInfo.products[0]
        return {
            title: product.title,
            path: '/pages/productShare/index?scene=' + this.data.shareID,
            imageUrl: product.image,
        }
    }

});
