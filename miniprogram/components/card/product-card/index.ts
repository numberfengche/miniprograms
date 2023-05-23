import { request } from "../../../utils/net";

Component({
  properties: {
    item: { type: Object, value: {} },
    // groupID: { type: Number, value: 0 },
  },
  observers: {
    'item':function(val) {
        console.log(val);
      this.setData({ source: val });
    },
  },

  data: {
  source:{}
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
  },

  methods: {
      godetail(){
          const item  = this.data.source
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
    // copyText(e: any) {
    //   const _this = this;
    //   //拿数据 加载
    //   request({
    //     url: "/api/starway/product/product-convert-group",
    //     method: "POST",
    //     data: {
    //       group_id: _this.data._groupID,
    //       product_id: e.currentTarget.dataset.text,
    //     },
    //     success: ({ data }: any) => {
    //       wx.setClipboardData({
    //         data: data.product_url,
    //         success: function (res) {
    //           wx.getClipboardData({
    //             success: function (res) {
    //               wx.showToast({
    //                 title: "复制成功",
    //                 icon: "none",
    //               });
    //             },
    //           });
    //         },
    //       });
    //     },
    //   });
    // },
    // tosample() {
    //   const url = `/pages/sample/talent?product_id=${this.properties.item.product_id}&group_id=${this.data._groupID}`;
    //   wx.navigateTo({ url: url });
    // },
  },
});
