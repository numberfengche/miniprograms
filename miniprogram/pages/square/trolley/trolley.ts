import { request } from "../../../utils/net";
Page({
    data: {
        result: [] as any,//选中商品
        list: [],
        checked: false,//全选
        goods_list: [] as any,
        arry: [] as any, //预览参数-选中 goods-id num; //
        price: {} as { points_total: Number, price_total: Number },
    },
    onLoad() {
        this.getGoodsNum()
    },
    //全选
    onChangeCheck(e: any) {
        const arry = this.data.list.map((item: any) => item.goods_id.toString())
        if (e.detail) {
            this.setData({
                checked: e.detail,
                result: arry
            });
            //全选预览
            this.setData({
                arry: this.data.goods_list
            })
            this.getTotal(this.data.goods_list)
        } else {
            this.setData({
                checked: e.detail,
                result: []
            });
            this.getTotal([])
        }
    },
    //选中
    onChange(event: any) {
        const list = this.data.goods_list.filter((item: any) => {
            return event.detail.find((i: any) => {
                return item.goods_id.toString() === i
            })
        })
        this.getTotal(list)
        this.setData({
            arry: list
        })
        if (event.detail.length === this.data.list.length) {
            this.setData({
                checked: true,
            });
        } else {
            this.setData({
                checked: false,
            });
        }
        this.setData({
            result: event.detail
        })
    },
    //步进器
    onStepperChange(e: any) {
        const index = e.currentTarget.dataset.id
        const cart_id = e.currentTarget.dataset.cartid
        var newList = this.data.goods_list
        newList[index].num = e.detail
        this.setData({
            goods_list: newList
        })
        this.changeNum(cart_id, e.detail)
        //选中请求预览
        if (this.data.arry.length > 0) {
            this.getTotal(this.data.arry)
        }
    },
    //修改数量
    changeNum(cart_id: any, num: any) {
        request({
            url: `/api/mini/cart/set-num`,
            method: "POST",
            data: {
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
    //支付
    buy() {
        console.log(this.data.goods_list);//全选
        console.log(this.data.arry);
        const item = this.data.goods_list
        const list = this.data.arry
        if (list.length > 0) {
            if (this.data.checked) {
                wx.navigateTo({
                    url: "/pages/payment/payment",
                    events: {
                        acceptDataFromOpenedPage: function (item: any) {
                            console.log(item)
                        },
                    },
                    success: function (res) {
                        res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
                    }
                })
            } else {
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
            }
        } else {
            wx.showToast({
                title: "请先选择商品~",
                icon: "none"
            })
        }




    },
    //预览
    getTotal(goods_list: any) {
        request({
            url: `/api/mini/trade/preview`,
            method: "POST",
            data: { goods_list },
            success: ({ data }: any) => {
                console.log(data);
                this.setData({ price: data })
            },
            fail: () => {
            },
        });
    },
    //列表
    getGoodsNum() {
        request({
            url: `/api/mini/cart/list`,
            success: ({ data }: any) => {
                this.setData({ list: data.list })
                const finelList = this.data.list.map((item: any) => {
                    return {
                        goods_id: item.goods_id,
                        num: item.num,
                    }
                })
                this.setData({
                    goods_list: finelList
                })
            },
            fail: () => {
            },
        });
    },
    deleteGoods(e: any) {
        const cart_id = e.currentTarget.dataset.id
        const goods_id = e.currentTarget.dataset.goodsid
        const goods = this.data.arry.filter((item: any) => item.goods_id !== goods_id)
        console.log(goods);
        this.setData({
            arry: goods
        })
        if (goods.length === 0) {
            this.setData({
                checked: false
            })
        }

        this.getTotal(goods)
        request({
            url: `/api/mini/cart/delete`,
            method: "POST",
            data: { cart_id },
            success: ({ data }: any) => {
                this.getGoodsNum()
                wx.showToast({ title: "删除成功", icon: "none" })
                // this.setData({ list: data.list })
            },
            fail: () => {
            },
        });
    }
})