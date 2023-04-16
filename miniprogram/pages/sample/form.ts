import { request } from "../../utils/net";
import { formatDate } from "../../utils/util";

// pages/sample/form.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        group_id: 0,
        product_id: "",
        dou_id: "",
        product: {},

        addrText: "", //电话:13344445555 收货人张先生 地址:黑龙江省哈尔滨市南岗区某某大街33号4-5-6
        expanded: false,
        showRes: false,

        //form
        receiver: "",
        mobile: "",
        regionCodes: [],
        regionNames: [],
        detail: "",

        mode: 1, //1.直播 2.短视频 3.不限制
        stime: "",
        etime: "",
        remark: "",
    },

    onStime(e: any) {
        this.setData({
            stime: e.detail.value,
        });
    },
    onEtime(e: any) {
        this.setData({
            etime: e.detail.value,
        });
    },
    onRegion(e: any) {
        this.setData({
            regionCodes: e.detail.code,
            regionNames: e.detail.value,
        });
    },
    receiverChange(event: any) {
        this.setData({
            receiver: event.detail.value,
        });
    },
    detialChange(event: any) {
        this.setData({
            detail: event.detail.value,
        });
    },
    mobileChange(event: any) {
        this.setData({
            mobile: event.detail.value,
        });
    },
    addrTextChange(event: any) {
        this.setData({
            addrText: event.detail.value,
        });
    },
    remarkTextChange(event: any) {
        this.setData({
            remark: event.detail.value,
        });
    },

    shiftExpand() {
        const d = new Date()
        let stime = this.data.stime
        let etime = this.data.etime
        if (stime == "" && etime == "") {
            stime = formatDate(d)
            d.setDate(d.getDate() + 7)
            etime = formatDate(d)
        }

        this.setData({
            stime,
            etime,
            expanded: !this.data.expanded,
        });
    },

    setMode(e: any) {
        const id = e.currentTarget.dataset.id;
        this.setData({
            mode: id,
        });
    },

    onShowPop() {
        this.setData({
            showRes: true,
        });
    },

    onClosePop() {
        this.setData({
            showRes: false,
        });
    },

    onOverPop() {
        this.setData({
            showRes: false,
        });

        // 去我的合作
        wx.reLaunch({ url: "/pages/coopList/coopList" });
    },

    onLoad(options) {
        console.log(options.group_id)
        this.setData({
            product_id: options.product_id,
            dou_id: options.dou_id,
            group_id: parseInt(options.group_id ?? "0"),
        });
        this.getProduct();
    },

    getProduct() {
        request({
            url: "/api/weapp/spread/product?product_id=" + this.data.product_id,
            method: "GET",
            success: ({ data }: any) => {
                this.setData({
                    product: data,
                });
            },
        });
    },

    addressAnalysis() {
        const text = this.data.addrText.trim();
        if (text == "") {
            wx.showToast({ title: "请先输入地址信息", icon: "none" });
            return;
        }

        request({
            url: `/api/starway/user/address-analysis?address=${text}`, //http://apites.zhetuitui.com
            method: "GET",
            success: ({ data }: any) => {
                if (data.name == "" && data.mobile == "" && data.province_code == 0) {
                    wx.showToast({ title: "识别失败，请手动填写信息", icon: "none" });
                    return;
                }

                let update = {};
                if (data.name != "") {
                    update = { ...update, receiver: data.name };
                }
                if (data.mobile != "") {
                    update = { ...update, mobile: data.mobile };
                }
                if (data.province_code > 0 && data.province != "") {
                    const codes = [data.province_code];
                    const names = [data.province];
                    if (data.city_code > 0) {
                        codes.push(data.city_code);
                        names.push(data.city);
                    }
                    if (data.area_code > 0) {
                        codes.push(data.area_code);
                        names.push(data.area);
                    }

                    update = { ...update, regionCodes: codes, regionNames: names };
                }
                if (data.street != "") {
                    update = { ...update, detail: data.street };
                }

                this.setData({
                    ...update,
                });
            },
        });
    },

    getRegionName(idx: number) {
        if (this.data.regionNames.length > idx) {
            return this.data.regionNames[idx];
        }
        return "";
    },
    getRegionCode(idx: number) {
        if (this.data.regionCodes.length > idx) {
            return this.data.regionCodes[idx] + "";
        }
        return "";
    },

    savedata() {
        const _this = this;

        request({
            url: "/api/weapp/user/session",
            method: "GET",
            success: ({ data }: any) => {
                const postdata = {
                    group_id: _this.data.group_id,
                    product_id: _this.data.product_id,
                    uid: _this.data.dou_id,
                    receiver: _this.data.receiver,
                    mobile: _this.data.mobile,

                    province: _this.getRegionName(0),
                    city: _this.getRegionName(1),
                    area: _this.getRegionName(2),
                    province_code: _this.getRegionCode(0),
                    city_code: _this.getRegionCode(1),
                    area_code: _this.getRegionCode(2),
                    detail: _this.data.detail,

                    mode: parseInt(_this.data.mode),
                    stime: _this.data.stime,
                    etime: _this.data.etime,
                    remark: _this.data.remark,
                };

                if (postdata.receiver == "") {
                    wx.showToast({ title: "请填写收货人", icon: "none" });
                    return
                }
                if (postdata.mobile == "") {
                    wx.showToast({ title: "请填写手机号", icon: "none" });
                    return
                }
                if (postdata.province == "") {
                    wx.showToast({ title: "请填写地区", icon: "none" });
                    return
                }
                if (postdata.detail == "") {
                    wx.showToast({ title: "请填写详细地址", icon: "none" });
                    return
                }

                if (data.avatar_url == "" || data.nickname == "") {
                    wx.setStorage({
                        key: "sampletemp",
                        data: postdata,
                    });
                    wx.navigateTo({ url: "/pages/user/profile/index" });
                    return;
                }

                request({
                    url: "/api/weapp/spread/sample",
                    method: "POST",
                    data: postdata,
                    success: ({ data }: any) => {
                        _this.setData({
                            showRes: true,
                        });
                    },
                });
            },
        });
    },
});
