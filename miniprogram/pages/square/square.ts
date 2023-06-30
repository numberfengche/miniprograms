import { request } from "../../utils/net";

Page({
    data: {
        active: undefined,
        navList: [],
        goods: []
    },
    onLoad: function () {
        request({
            url: "api/mini/goods/category/list",
            success: ({ data }: any) => {
                const { list } = data;
                this.setData({ navList: list, active: list[0].category_id })
                request({
                    url: `/api/mini/goods/search?category_id=${list[0].category_id}`,
                    success: ({ data }: any) => {
                        const { list } = data;
                        this.setData({ goods: list })

                        // this.setData({navList:list,active:list[0].category_id})
                    },
                    fail: () => {
                    },
                });
            },
            fail: () => {
            },
        });

    },
   onShow(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
   },
    // 切换
    activeNav(e: any) {
        var index = e.currentTarget.dataset.index
        this.setData({
            active: index,
        })
        request({
            url: `/api/mini/goods/search?category_id=${index}`,
            success: ({ data }: any) => {
                const { list } = data;
                this.setData({ goods: list })
            },
            fail: () => {
            },
        });



    },
})