// pages/article/article.ts
import { request } from "../../utils/net";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
        omnibus: [],
        list: [],
        searchInformation: {
            page_no: 0,
            page_size: 20,
            category_id: 1,
        },
        isRefresh: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getomnibus()
        this.setData({
            searchInformation: {
                ...this.data.searchInformation,
                page_no: 1,
                category_id: 1
            },
        });
        this.getList();
    },
    bindDownLoad() {
        if (this.data.isRefresh) {
            return;
        } else {
            this.setData({
                searchInformation: {
                    ...this.data.searchInformation,
                    page_no: this.data.searchInformation.page_no + 1,
                },
            });

            this.getList();
        }
    },
    getList() {
        request({
            url: `/api/mini/article/search?page_no=1&page_size=10`,
            method: "GET",
            data: this.data.searchInformation,
            success: ({ data: { list } }: any) => {
                console.log(list);
                if (list.length > 0) {
                    this.setData({
                        isRefresh: false,
                        list: this.data.list.concat(list),
                    });
                } else {
                    this.setData({
                        isRefresh: true,
                    });
                    wx.showToast({
                        title: '暂无更多',
                        icon: 'none',
                        duration: 1000
                    })
                }
            },
            fail: () => {
            },
        });
    },
    getomnibus() {
        request({
            url: "/api/mini/article/star",
            success: ({ data }: any) => {
                console.log(data);
                this.setData({ omnibus: data.list })
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
        if (typeof this.getTabBar === 'function' &&
              this.getTabBar()) {
              this.getTabBar().setData({
                selected: 3
              })
            }
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
    goDetail(e: any) {
        const type = e.currentTarget.dataset.id
        console.log(type);
        wx.navigateTo({ url: `/pages/detail/detail?article_id=${type}` })
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