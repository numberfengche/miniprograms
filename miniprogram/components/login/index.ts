// components/login/login.ts
import { request } from "../../utils/net";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean, value: false },
    },

    /**
     * 组件的初始数据
     */
    data: {
        jsCode: ''
    },
    lifetimes: {
        created: function () {
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

        // attached: function () {
        //   // 在组件实例进入页面节点树时执行
        //   this.setData({ role: getApp().globalData.role || 0 });
        // },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close() {
            this.setData({
                show: false
            })
            getApp().globalData.showLogin = false
            console.log(getApp().globalData.showLogin);

        },
        onClose() {
            this.setData({
                show: false
            })
            getApp().globalData.showLogin = false
        },
        getPhoneNumber(e: any) {
            var that = this
            if (!e.detail.code) {
                return;
            } else {
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
                            that.setData({
                                show: false
                            })
                        setTimeout(() => {
                            that.getUserInfo();
                        }, 100);
                        wx.showToast({ title: "登录成功", icon: "success" })
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
        }
    }
})
