export type PData =
  | {
      page: number; //页码
      pageSize: number; //每页数据
      dataList: any[]; //数据列表
      total: number; //列表总数
      refreshing: boolean; //刷新数据中
      loading: boolean; //请求数据中
      noMoreData: boolean; //没有更多数据
    }
  | WechatMiniprogram.Component.DataOption;

export type PMethods =
  | {
      refresh: Function;
      loadData: Function;
      clear: Function;
    }
  | WechatMiniprogram.Component.MethodOption
  | any;

export interface IDataResult {
  list: [];
  total: number;
}

// 分页行为 ，使用方式可以参考 package_merchants/pages/rank/rank-list/index.ts
export const PageBehavior = Behavior<PData, any, any>({
  data: {
    page: 1, //页码
    pageSize: 20, //每页数据
    dataList: [], //数据列表
    total: 0, //列表总数
    refreshing: false, //刷新数据中
    loading: false, //请求数据中
    noMoreData: false, //没有更多数据
  },
  methods: {
    //刷新数据
    async reloadData(f: () => Promise<IDataResult>) {
      this.setData(
        {
          page: 1,
          refreshing: true,
          noMoreData: false,
        },
        () => {
          this.loadData(f);
        }
      );
    },

    //加载数据
    async loadData(f: () => Promise<IDataResult>) {
      if (this._isLocked()) {
        return;
      }

      this._lock();

      f()
        .then((res: IDataResult) => {
          if (!res || res.list == undefined || res.total == undefined) {
            return;
          }

          const { list, total } = res;
          const newPage = list.length > 0 ? this.data.page + 1 : this.data.page;
          const newList =
            this.data.page == 1 ? list : [...this.data.dataList, ...list];
          const noMoreData = newList.length >= total;

          if (
            this.data.noMoreData == false &&
            noMoreData == true &&
            this.data.page > 1
          ) {
            this.onNoMoreData();
          }

          this.setData({
            dataList: newList,
            total: total,
            page: newPage,
            noMoreData: noMoreData,
          });
        })
        .catch((e) => {
          console.log("错误", e);
        })
        .finally(() => {
          this.setData({
            refreshing: false,
          });
          this._unlock();
        });
    },

    _lock() {
      this.setData({
        loading: true,
      });
    },

    _unlock() {
      this.setData({
        loading: false,
      });
    },

    _isLocked() {
      return this.data.loading == true;
    },

    //当没有更多数据时触发,可以在组件中覆盖为自己的处理方式
    onNoMoreData() {
      wx.showToast({ title: "没有更多数据了", icon: "none" });
    },
  },
});
