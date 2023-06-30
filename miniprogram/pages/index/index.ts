// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()

import { request } from "../../utils/net";

Page({

data: {
    navBarHeight: getApp().globalData.navBarHeight,//导航栏高度
        top: wx.getMenuButtonBoundingClientRect().top,
        show:false,//导航栏背景
        meta:{},
    currentIndex: 0,
    posterList: [
      {
        id: '1', 
        image: 'https://p9-aio.ecombdimg.com/obj/ecom-shop-material/hpQxGgrj_m_ccaaf88d71b463c31a4d96a564f9b5a3_sx_469862_www800-800'
      },
      {
        id: '2', 
        image: 'https://p3-aio.ecombdimg.com/obj/ecom-shop-material/hpQxGgrj_m_a016c22639169025ced58b48d267108a_sx_440147_www800-800'
      },
      {
        id: '3', 
        image: 'https://p3-aio.ecombdimg.com/obj/ecom-shop-material/hpQxGgrj_m_a016c22639169025ced58b48d267108a_sx_440147_www800-800'
      },
      {
        id: '4', 
        image: 'https://p3-aio.ecombdimg.com/obj/ecom-shop-material/hpQxGgrj_m_a016c22639169025ced58b48d267108a_sx_440147_www800-800'
      },
    ]
  },
//函数
swiperChange(event:any){
    let {current} = event.detail;
    this.setData({
      currentIndex: current
    })
  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }
  },

  onLoad(){

    request({
        url: "/api/mini/index/meta",
        success: ({ data }: any) => {
            console.log(data);
            this.setData({ meta: data })
        },
        fail: () => {
        },
    });
  },
  onPageScroll (e:any) { 
      if(e.detail.scrollTop>50){
          this.setData({
              show:true
          })
      }else{
        this.setData({
            show:false
        })
      }
    },
    onchange(e:any){
        console.log(e.currentTarget.dataset.item);
        const item =e.currentTarget.dataset.item
        if(item.jump_type==="article"){
            wx.navigateTo({ url: `/pages/detail/detail?article_id=${item.id}` })
        }else{
            wx.navigateTo({
                url: `/pages/square/goods-detail/goods-detail`,
                events: {
                    acceptDataFromOpenedPage: function (item: any) {
                        console.log(item)
                    },
                },
                success: function (res) {
                    res.eventChannel.emit('acceptDataFromOpenerPage', { data:item})
                }
            })
        }
    },
    goactivity(){
          wx.switchTab({
              url:"/pages/activity/activity"
          })
    },
    gosquare(){
        wx.switchTab({
            url:"/pages/square/square"
        })
    }
})
