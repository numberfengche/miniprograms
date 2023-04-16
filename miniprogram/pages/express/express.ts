// pages/express/express.ts


Page({
    data: {
        name: "",
        steps: [],
        num: ""
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

    onLoad(options: any) {
        console.log("express:onLoad", options)
        let info = JSON.parse(decodeURIComponent(options.info))
        console.log("express:onLoad", options.name, options.num, info)

        this.setData({
            name: options.name,
            steps: info.map((row: any) => ({
                text: row.context,
                desc: row.time,
            })),
            num: options.num,
        })
    },
})