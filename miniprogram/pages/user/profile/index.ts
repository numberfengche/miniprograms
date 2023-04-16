import { request } from "../../../utils/net";

// pages/user/profile/index.ts
Page({
  data: {
    avatarUrl: "",
  },
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
  },
  onShowPop() {
    this.setData({
      showRes: true,
    });
  },
  onClosePop() {
    this.setData({
      showRes: false,
    });
  },
  onOverPop() {
    this.setData({
      showRes: false,
    });

    // todo 去我的合作
    wx.reLaunch({ url: "/pages/coopList/coopList" });
  },
  
  saveProfile(e: any) {

    const _this = this;
    const nickname = e.detail.value.nickname.trim();
    if (this.data.avatarUrl.trim() == "") {
      wx.showToast({ title: "请填写微信头像", icon: "none" });
      return;
    }
    if (nickname == "") {
      wx.showToast({ title: "请填写微信昵称", icon: "none" });
      return;
    }

    //上传头像
    wx.uploadFile({
      url: "https://apites.zhetuitui.com/api/starway/user/upload-any-file",  //http://apites.zhetuitui.com
      filePath: this.data.avatarUrl,
      name: "file",
      success(res: any) {
        if (res.statusCode != 200){
            wx.showToast({ title: "上传头像失败，请稍候尝试", icon: "none" });
            return
        }

        const data = JSON.parse(res.data)
        const avatar = data.data.url;
        request({
          url: "/api/weapp/user/set-profile",
          method: "POST",
          data: {
            avatar: avatar,
            nickname: nickname,
          },
          success: () => {
            //提交申样表单数据
            wx.getStorage({
              key: "sampletemp",
              success(res) {
                request({
                  url: "/api/weapp/spread/sample",
                  method: "POST",
                  data: res.data,
                  success: ({ data }: any) => {
                    _this.setData({
                      showRes: true,
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  },
});
