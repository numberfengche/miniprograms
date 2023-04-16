import { request } from "../../utils/net";

// pages/product/pruduct.ts

interface IProductInfo {
    image_url: string
    copy_url: string
    card_url: string
}

Page({
    data: {
        user_name: "",
        company_name: "",
        phone: "",
        wechat: "",
        product_id: -1,
        product_group_id: -1,
        show_card: false,
        card_file_path: "",
        show_contact: false,
        product_info: <IProductInfo>{},
    },

    onShowContact() {
        this.setData({ show_contact: true })
    },
    onCloseContact() {
        this.setData({ show_contact: false })
    },

    onCopyUrl() {
        wx.setClipboardData({
            data: this.data.product_info.copy_url,
            success() {
                wx.showToast({ 'title': '复制成功', 'icon': 'success' })
            },
            fail() {
                wx.showToast({ 'title': '复制失败', 'icon': 'error' })
            }
        })
    },

    onCallPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        })
    },

    onCopyWechat() {
        wx.setClipboardData({
            data: this.data.wechat,
            success() {
                wx.showToast({ 'title': '复制成功', 'icon': 'success' })
            },
            fail() {
                wx.showToast({ 'title': '复制失败', 'icon': 'error' })
            }
        })
    },

    onShowCard() {
        console.log("product::onShowCard")
        wx.downloadFile({
            url: this.data.product_info.card_url,
            success: (r: any) => {
                this.data.card_file_path = r.tempFilePath
            }
        })
        this.setData({ show_card: true })
    },

    onCloseCard() {
        console.log("product::onCloseCard")
        this.setData({ show_card: false })
    },

    onSaveCard() {
        console.log("product::onSaveCard", this.data.card_file_path)
        wx.saveImageToPhotosAlbum({
            filePath: this.data.card_file_path,
            success: () => {
                this.setData({ show_card: false })
                wx.showToast({ 'title': '保存成功', 'icon': 'success' })
            },
            fail: () => {
                wx.showToast({ 'title': '保存失败', 'icon': 'error' })
            }
        })
    },

    onLoad(options: any) {
        console.log("product::onLoad", options)

        request({
            url: `/api/weapp/spread/product?product_id=${options.product_id}`,
            success: (r: any) => {
                console.log("product::onLoad::请求商品详情", options.product_id, r)
                this.setData({ product_info: r.data })
            }
        })

        this.setData({
            product_id: options.product_id,
            product_group_id: options.product_group_id,
            user_name: options.user_name,
            company_name: options.company_name,
            phone: options.phone,
            wechat: options.wechat,
        })
    }
})