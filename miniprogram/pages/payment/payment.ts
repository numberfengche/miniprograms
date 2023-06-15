import { request } from "../../utils/net";
Page({
    data: {
        noaddress: true,
        addressInfo: {} as any,
        list: [],
        godds: [],
        remark: "",
        priceInfo: {
            postage: Number,
            price: Number,
            points: Number,
        },
        tradeId: undefined,
        show: false,//遮罩层
    },
    onLoad() {
        var _this = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            console.log(data);
            const dataInfo = data.data
            _this.setData({ godds: dataInfo })
            _this.getTotal(dataInfo)
        })
    },
    //地址列表
    getaddress() {
        request({
            url: "/api/mini/address/list",
            success: ({ data }: any) => {
                const { list } = data
                console.log(list);
                if (list.length > 0) {
                    const item = list.filter((item: any) => item.is_default === 1)
                    if (item.length > 0) {
                        this.setData({
                            addressInfo: item[0],
                        })
                    } else {
                        this.setData({
                            addressInfo: list[0],
                        })
                    }
                    this.setData({
                        noaddress: false,
                    })
                } else {
                    this.setData({
                        noaddress: true
                    })
                }
            },
        });
    },
    goaddress() {
        wx.navigateTo({ url: "/pages/address/index" })
    },
    //预览
    getTotal(goods_list: any) {
        request({
            url: `/api/mini/trade/preview`,
            method: "POST",
            data: { goods_list },
            success: ({ data }: any) => {
                console.log(data);
                this.setData({
                    list: data.goods_list,
                    priceInfo: {
                        price: data.price_total_str,
                        postage: data.freight_str,
                        points: data.points_total
                    }

                })
            },
            fail: () => {
            },
        });
    },
    pay() {
        console.log(this.data.remark);
        if (this.data.addressInfo.address_id) {
            this.createOrder()
        }
        else {
            wx.showToast({
                title: "请先添加地址",
                icon: "none"
            })
        }
    },
    getvalue(e: any) {
        console.log(e.detail.value);
        this.setData({
            remark: e.detail.value
        })
    },
    onShow() {
        this.getaddress()
    },
    onPullDownRefresh() {

    },
    //订单创建
    createOrder() {
        var data = this.data
        request({
            url: `/api/mini/trade/create`,
            method: "POST",
            data: { address_id: data.addressInfo.address_id, remark: data.remark, goods_list: data.godds },
            success: ({ data }: any) => {
                console.log(data);
                this.tradepay(data.trade_id)
                this.setData({ tradeId: data.trade_id })
            },
            fail: () => {
            },
        });
    },
    //支付
    tradepay(trade_id: any) {
        var _x = this
        request({
            url: `/api/mini/trade/pay`,
            method: "POST",
            data: { trade_id },
            success: ({ data }: any) => {
                if (data.need_wechat_pay) {
                    const info = data.wechat_pay_params
                    wx.requestPayment({
                        timeStamp: info.timestamp.toString(),
                        nonceStr: info.nonce,
                        package: info.package,
                        signType: info.sign_type,
                        paySign: info.pay_sign,
                        success: function (res) {
                            _x.setData({
                                show: true
                            })
                            var timer = setInterval(() => {
                                request({
                                    url: `/api/mini/trade/detail?trade_id=${_x.data.tradeId}`,
                                    success: ({ data }: any) => {
                                        console.log(data);
                                        if (data.state === 1) {
                                            clearInterval(timer)
                                            _x.setData({
                                                show: false
                                            })
                                            _x.godetail(data)
                                        }
                                    },
                                    fail: () => {
                                    },
                                });
                            }, 2000)
                        },
                        fail: function (res) {
                            console.log(res);
                        }
                    })
                }

            },
            fail: () => {
            },
        });
    },
    godetail(item: any) {
        wx.navigateTo({
            url: "/pages/orderDetail/orderDetail",
            events: {
                acceptDataFromOpenedPage: function (item: any) {
                    console.log(item)
                },
            },
            success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
            }
        })
    }
})