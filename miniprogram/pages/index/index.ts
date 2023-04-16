// // index.ts
// // 获取应用实例
// const app = getApp<IAppOption>()

// Page({
//     data: {
//         motto: 'Hello World',
//         avatarUrl: '',
//         nickName: '暂无昵称'
//     },

//     // 点击头像
//     onTapAvatar() {
//         wx.navigateTo({
//             url: '../logs/logs',
//         })
//     },

//     // 点击选择头像
//     onChooseavatar(r: any) {
//         console.log("index::选择头像", r.detail.avatarUrl)
//         this.setData({
//             avatarUrl: r.detail.avatarUrl
//         })
//     },

//     // 点击跳转详情
//     onTapProduct() {
//         console.log("index::跳转详情")
//         wx.navigateTo({
//             url: "/pages/product/pruduct?product_id=3600742488832390379&product_group_id=22&company_name=丰芽科技&user_name=王美丽同学&phone=18908009119&wechat=Wepp223322",
//         })
//     },

//     onTapCoop() {
//         wx.navigateTo({
//             url: "/pages/coopList/coopList",
//         })
//     },

//     onLoad(options: any) {

//         // wx.navigateTo({url:`/pages/productShare/index?scene=65`})
//         // return


//         // // wx.showToast({ title: "来啦，老铁", icon: "success", duration: 4000 })
//         // console.log("index::onLoad", options)
//         // this.setData({
//         //     scene: JSON.stringify(options)
//         // })
//     }
// })
