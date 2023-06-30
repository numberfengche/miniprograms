// components/obligation/obligation.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      item:{type:{} as any,value:{}}
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        godetail(){
            wx.navigateTo({
                url:`/pages/order/detail/index?trade_id=${this.data.item.trade_id}`
            })
        }
    }
})
