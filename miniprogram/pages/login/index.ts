import { request } from "../../utils/net";

// pages/login/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: getApp().globalData.navBarHeight,
        top: wx.getMenuButtonBoundingClientRect().top,
        jsCode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var _this = this
        wx.login({
            success(r) {
                console.log(r);
                _this.setData({
                    jsCode: r.code
                })
            },
            fail(r) {
                console.error("app::登录失败", r)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    getPhoneNumber(e: any) {
        var that = this
        if (!e.detail.code) {
            return;
        } else {
            console.log(e.detail.code);
            
            const { globalData } = getApp();
            wx.request({
                url: `${globalData.host}/api/mini/user/login`,
                method: "POST",
                header: { "content-type": "application/json" },
                data: { "login_code": that.data.jsCode, "phone_encrypted_data": e?.detail?.encryptedData, "phone_iv": e?.detail?.iv },
                success: (r) => {
                    console.log("app::登录成功", r)
                    globalData.token = (r.data as any)?.data?.token
                    wx.setStorageSync('token', (r.data as any)?.data?.token)
                    getApp().globalData.showLogin = false
                    console.log("app::设置Token", globalData.token),
                    setTimeout(() => {
                        console.log("asdadadsada");
                        that.getUserInfo();
                    }, 100);
                    wx.showToast({ title: "登录成功", icon: "success" })
                    wx.switchTab({
                        url:"/pages/index/index"
                    })
                },
                fail: (r) => {
                    console.log("app::登录失败", r)
                    wx.showToast({ title: "登录失败", icon: "error" })
                }
            })

        }
    },
    getUserInfo() {
        request({
            url: "/api/mini/user/session",
            // data: this.data.searchInformation,
            success: ({ data }: any) => {
                console.log(data);
                getApp().globalData.name = data.nickName;
                getApp().globalData.phone = data.mobile;
                getApp().globalData.avatar = data.avatar_url;
            },
            fail: () => {
                this.setData({ cardLoading: true });
                // this.setData({ loading: false });
            },
        });
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