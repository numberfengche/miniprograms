import { request } from "../../utils/net";
Component({
    /**
     * 组件的属性列表
     */

    properties: {
        source: {} as any,
    },

    observers: {
        'source': function (val) {
            console.log(val);
            this.setData({ show: val.is_digg, num: val.share_count });
        },
    },
    data: {
        show: false,
        num: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        ontransmit(e: any) {
            console.log(e.currentTarget.dataset.id);
            request({
                url: "/api/mini/article/interact",
                method: 'POST',
                data: { type: 2, article_id: e.currentTarget.dataset.id },
                success: ({ data }: any) => {
                    console.log(data);
                    this.setData({ num: this.data.num + 1 });
                    wx.showToast({
                        title: data.tips,
                        icon: "none"
                    })
                },
                fail: () => {
                    this.setData({ cardLoading: true });
                    // this.setData({ loading: false });
                },
            });
        },
        onlike(e: any) {
            request({
                url: "/api/mini/article/interact",
                method: 'POST',
                data: { type: 1, article_id: e.currentTarget.dataset.id },
                success: ({ data }: any) => {
                    console.log(this.data.source);

                    console.log(data);
                    this.setData({ show: true });
                    wx.showToast({
                        title: data.tips,
                        icon: "none"
                    })
                },
                fail: () => {
                    this.setData({ cardLoading: true });
                    // this.setData({ loading: false });
                },
            });
        },
        goDetail(e: any) {

            const type = e.currentTarget.dataset.id
            console.log(type);
            wx.navigateTo({ url: `/pages/detail/detail?article_id=${type}&show=${this.data.show}` })
        }
    }
})
