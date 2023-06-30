Component({
    data: {
      selected: 0,
     color: "#BBBBBB",
   selectedColor: "#1A1A1A",
      list: [
        {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "/assets/images/index.png",
            "selectedIconPath": "/assets/images/index_select.png"
        },
        {
            "pagePath": "pages/activity/activity",
            "text": "活动",
            "iconPath": "/assets/images/hd.png",
            "selectedIconPath": "/assets/images/hd_select.png"
        },
        {
            "pagePath": "pages/square/square",
            "text": "文创市集",
            "iconPath": "/assets/images/sj_new.png",
            "selectedIconPath": "/assets/images/sj_new.png"
        },
        {
            "pagePath": "pages/article/article",
            "text": "文章",
            "iconPath": "/assets/images/wz.png",
            "selectedIconPath": "/assets/images/wz_select.png"
        },
     
        {
            "pagePath": "pages/mine/mine",
            "text": "我的",
            "iconPath": "/assets/images/mine1.png",
            "selectedIconPath": "/assets/images/mine1_select.png"
        }
      ]
    },
    attached() {
    },
    methods: {
      switchTab(e:any) {
        const data = e.currentTarget.dataset
        const url = data.path
        console.log(url);
        
        wx.switchTab({
            url:`/${url}`
        })
        this.setData({
          selected: data.index
        })
      }
    }
  })