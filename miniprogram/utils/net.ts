
interface IParams {
    url: string;
    method?: "POST" | "GET";
    data?: any;
    success?: Function;
    fail?: Function;
    showMessage?: boolean;
}

export const request = async ({ url, method, data, success, fail, showMessage = true }: IParams) => {
    // const { token: Authorization } = await login();
    // console.log(Authorization);
    // const role = getApp().globalData.role;
    // const { token} = getApp().globalData;
 const token= wx.getStorageSync('token')
console.log(token);

    wx.request({
        url: url.startsWith("http") ? url : `https://wuliang.1meigong.com/${url}`,
        method: method === "POST" ? "POST" : "GET",
        data,
        header: { "content-type": "application/json", "Authorization": token },
        success: (res: any) => {
            const {
                statusCode,
                data: { code, data, msg },
            } = res;
            if (statusCode === 401 || code === 401 || code === 2010) {
                wx.showToast({ title: "请登录", icon: "none" });
                // if (getApp().env != "develop") {
                // }
                // setTimeout(() => {
                //     wx.redirectTo({ url: "/pages/index/index" });
                // }, 1000);

                if (fail) {
                    fail(msg);
                }
            } else if ((code === 0 || code === 200) && success) {
                success({ code, data, msg });
            } else {
                if (msg) {
                    if (showMessage) {
                        wx.showToast({ title: msg, icon: "none" });
                    }
                } else {
                    if (showMessage) {
                        console.log("net::操作失败::success", res)
                        wx.showToast({ title: "操作失败，请稍后尝试", icon: "none" });
                    }
                }

                if (fail) {
                    fail(msg);
                }
            }
        },
        fail: (error) => {
            console.log("net::操作失败::fail", error)
            if (showMessage) {
                wx.showToast({ title: "操作失败，请稍后尝试", icon: "none" });
            }

            if (fail) {
                fail(error.errMsg);
            }
        },
    });
};


interface PParams {
    url: string;
    method?: "POST" | "GET";
    data?: any;
}
// promise风格的request
export const requestPromise = ({ url, method, data }: PParams) => {
    return new Promise((resolve, reject) => {
        request({
            url,
            method,
            data,
            success: (res: { code: number; data: any; msg: string }) => {
                resolve(res);
            },
            fail: (reason: string) => {
                reject(reason);
            },
        });
    });
};