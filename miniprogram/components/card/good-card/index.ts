// components/card/good-card/index.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      item:{
          type:Object,value:{}
      }
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
            var _this=this;
            wx.navigateTo({
                url: `/pages/square/goods-detail/goods-detail`,
                events: {
                    acceptDataFromOpenedPage: function (item: any) {
                        console.log(item)
                    },
                },
                success: function (res) {
                    res.eventChannel.emit('acceptDataFromOpenerPage', { data:_this.data.item})
                }
            })
        }
    }
})
