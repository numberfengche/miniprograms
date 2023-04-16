// pages/productShare/components/list.ts
// pages/productShare/index.ts
import {
  PageBehavior,
  PData,
  PMethods,
} from "../../../behaviors/pagination-behavior";
import { requestPromise } from "../../../utils/net";
Component<PData, any, PMethods>({
  behaviors: [PageBehavior],

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toRequest() {
      const _this = this;
      return () => {
        return new Promise((resolve, reject) => {
          resolve({ list: [1,2,3,4,5,6,7,8,8,9,10], total: 50 });
        });
        requestPromise({
          url: "/api/group/statistics/goods-rank",
          method: "POST",
          data: {
            page: _this.data.page,
            page_size: _this.data.pageSize,
          },
        }).then((res: any) => {
          // return { list: res.data.list, total: res.data.pageObj.totalCount };
        });
      };
    },
    refresh() {
      this.reloadData(this.toRequest());
    },
  },

  lifetimes: {
    attached: function () {
      this.refresh();
    },
  },
});
