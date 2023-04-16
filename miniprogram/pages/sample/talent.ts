import { request } from "../../utils/net";

// pages/sample/talent.ts
Page({
  data: {
    inputValue: "",
    checkedHistory: 0,
    product_id: "",
    group_id: 0,

    historyID: "",
    history: [],
  },
  inputChange(event: any) {
    this.setData({
      inputValue: event.detail.value,
    });
  },
  buttonClick() {
    const douID = this.data.inputValue.trim()
    if (douID == ""){
      wx.showToast({ title: "请填写达人的抖音号", icon: "none" });
      return
    }
    const productID = this.data.product_id.trim()
    if (productID == ""){
      wx.showToast({ title: "请返回上一步选择商品", icon: "none" });
      return
    }

    const url = `/pages/sample/form?product_id=${productID}&dou_id=${douID}&group_id=${this.data.group_id}`;
    wx.navigateTo({
      url: url,
    });
  },
  setChoose(event: any) {
    let newID = event.currentTarget.dataset.id;
    if (newID == this.data.historyID) {
      newID = "";
    }

    this.setData({
      historyID: newID,
      inputValue: newID,
    });
  },

  onLoad(options) {
    this.setData({
      product_id: options.product_id,
      group_id: parseInt(options.group_id??'0'),
    });
    this.getHistory();
  },

  getHistory() {
    //拿数据 加载
    request({
      url: "/api/weapp/spread/recently-author",
      method: "GET",
      success: ({ data }: any) => {
        this.setData({
          history: data.list,
        });
      },
    });
  },
});
