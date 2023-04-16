// pages/coopList/coopList.ts
import { request } from "../../utils/net";

interface CoopInfo {
    image_url: string
    title: string
    price: number
    price_tag: string
    cos_ratio: number
    shop_name: string
    company_name: string
    user_name: string
    create_time: string
    coop_id: string
    express_name: string
    express_num: string
    last_express: string
    last_express_time: string
    express_info: ExpressInfo[]
}

interface ExpressInfo {
    time: string
    ftime: string
    context: string
}

interface IRefreshPage {
    success?: Function
    fail?: Function
}

Page({
    data: {
        coop_list: <CoopInfo[]>{},
        cursor: "",
        show_contact: false,
        show_item: {},
        flag_refresh: false,
        flag_loadmore: false,
        loading_tips: "上拉加载更多",
    },

    onShowContact(e: any) {
        const coopId = e.currentTarget.dataset.item
        const item = this.data.coop_list.find((it: any) => it.coop_id == coopId)
        this.setData({ show_contact: true, show_item: item })
    },
    onCloseContact() {
        this.setData({ show_contact: false })
    },
    onCallPhone(e: any) {
        console.log("coopList::onCallPhone", e.currentTarget.dataset.phone)
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        })
    },
    onCopyValue(e: any) {
        console.log("coopList::onCopyValue", e.currentTarget.dataset.value)
        wx.setClipboardData({
            data: e.currentTarget.dataset.value,
            success() {
                wx.showToast({ 'title': '复制成功', 'icon': 'success' })
            },
            fail() {
                wx.showToast({ 'title': '复制失败', 'icon': 'error' })
            }
        })
    },
    onExpress(e: any) {
        console.log("index::跳转快递单", e.currentTarget.dataset.item)
        const { express_name, express_info, express_num } = e.currentTarget.dataset.item
        let info = encodeURIComponent(JSON.stringify(express_info))
        wx.navigateTo({
            url: `/pages/express/express?name=${express_name}&info=${info}&num=${express_num}`,
        })
    },


    refreshPage({ success, fail }: IRefreshPage) {
        console.log("coopList::onLoad::刷新页面数据", this.data.cursor)
        request({
            url: `/api/weapp/spread/coop-list?cursor=${this.data.cursor}`,
            success: (r: any) => {
                console.log("coopList::onLoad::请求我的合作", r)
                this.setData({ coop_list: r.data.list, cursor: r.data.cursor })
                success && success()
            },
            fail: () => {
                fail && fail()
            }
        })
    },

    onLoad(options) {
        console.log("coopList::onLoad", options)
        this.refreshPage({})
    },

    onScrollRefresh(e: any) {
        console.log("coopList::onScrollRefresh::触发下拉刷新", e)
        let that = this;
        that.setData({ cursor: "" })
        this.refreshPage({
            success: () => {
                that.setData({ flag_refresh: false })
                wx.showToast({ 'title': '刷新成功', 'icon': 'success', duration: 1000 })
            },
            fail: () => that.setData({ flag_refresh: false })
        })
    },

    onScrollToLower() {
        if (this.data.flag_loadmore) {
            return
        }
        let that = this;

        console.log("coopList::onScrollRefresh::触发加载更多", that.data.cursor)
        that.setData({ flag_loadmore: true })

        setTimeout(() => {
            request({
                url: `/api/weapp/spread/coop-list?cursor=${that.data.cursor}`,
                success: (r: any) => {
                    console.log("coopList::onScrollRefresh::加载成功", r)
                    if (r.data.list.length == 0) {
                        that.setData({ flag_loadmore: false, loading_tips: "已经到底了" })
                        return
                    }
                    that.setData({ coop_list: that.data.coop_list.concat(r.data.list), cursor: r.data.cursor })
                    that.setData({ flag_loadmore: false })
                },
                fail: () => {
                    that.setData({ flag_loadmore: false })
                }
            })
        }, 500)
    },
})