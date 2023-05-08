// app.ts
App<IAppOption>({
    globalData: {
        host: "",
        token: "",
    },
    onLaunch() {
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 环境判断
        const { envVersion } = wx.getAccountInfoSync().miniProgram;
        switch (envVersion) {
            case "release":
                this.globalData.host = "https://wuliang.1meigong.com/"
                break
            case "develop":
                // this.globalData.host = "http://127.0.0.1:20209"
                this.globalData.host = "https://wuliang.1meigong.com/"
                break
            case "trial":
            default:
                this.globalData.host = "https://wuliang.1meigong.com/"
        }
        console.log("app::envVersion", envVersion, this.globalData.host)

        // 登录
        wx.login({
            success(r) {
                console.log("app::正在登录", r)
                const { globalData } = getApp();
                wx.request({
                    url: `${globalData.host}/api/mini/user/login`,
                    method: "POST",
                    header: { "content-type": "application/json" },
                    data: { "code": r.code },
                    success: (r) => {
                        console.log("app::登录成功", r)
                        globalData.token = (r.data as any).data.token
                        console.log("app::设置Token", globalData.token)
                    },
                    fail: (r) => {
                        console.log("app::登录失败", r)
                        wx.showToast({ title: "登录失败", icon: "error" })
                    }
                })
            },
            fail(r) {
                console.error("app::登录失败", r)
            }
        })
    },
})