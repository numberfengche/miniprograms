import { request } from "../../../utils/net";
Page({
    data: {
        loading: false,
        location: [],
        code: [],
        postcode: "",
        // customItem: "全部",
        show:false,
        address_id: "",
        selection: false,
        name: "",
        mobile: "",
        address: ""
    },
    onLoad() {
        var _this = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            const dataInfo = data.data
            _this.setData({
                ...dataInfo,
                selection: dataInfo.is_default == 1 ? true : false,
                location: [dataInfo.province, dataInfo.city, dataInfo.area],
                code: [dataInfo.province_code, dataInfo.city_code, dataInfo.area_code]
            });
        })
    },

    form_submit(e: any) {
        console.log(e);

        const { address_id, location, code } = this.data;

        const data = {
            ...e.detail.value,
            is_default: e.detail.value.selection ? 1 : 0,
            province: location[0],
            province_code: code[0],
            city: location[1],
            city_code: code[1],
            area: location[2],
            area_code: code[2],
            location,
            code,
            ...(address_id ? { address_id } : {}),
        };
        if (!data.name) {
            wx.showToast({ title: "请填写收货人", icon: "none" });
        } else if (data.name.length > 10) {
            wx.showToast({ title: "收货人最大长度不超过10个字符", icon: "none" });
        } else if (!data.mobile || !/^1[0-9]{10}$/.test(data.mobile)) {
            wx.showToast({ title: "请填写正确的手机号码", icon: "none" });
        } else if (!data.location || !data.code) {
            wx.showToast({ title: "请选择正确的地区", icon: "none" });
        } else if (!data.address) {
            wx.showToast({ title: "请填写详细地址", icon: "none" });
        } else {
            this.setData({ loading: true });
            request({
                url: address_id ? "/api/mini/address/modify" : "/api/mini/address/create",
                method: "POST",
                data,
                success: () => {
                    this.setData({ loading: false });
                    wx.showToast({
                        title: address_id ? "修改成功" : "添加成功",
                        icon: "success",
                        success() {
                            setTimeout(() => {
                                wx.navigateBack({ delta: 1 });
                            }, 500);
                        },
                    });
                },
                fail: () => {
                    this.setData({ loading: false });
                },
            });
        }
    },

    bindRegionChange: function (e: any) {
        console.log(e);

        this.setData({
            location: e.detail.value,
            code: e.detail.code,
            postcode: e.detail.postcode,
        });
    },
    remove(){
 this.setData({show:true})
    },
    cancel(){
      this.setData({show:false})
    },
    confirm(){
      request({
        url: "/api/mini/address/delete",
        method:"POST",
        data:{address_id:this.data.address_id},
        success: ({ data }: any) => {
          this.setData({show:false})
          wx.showToast({
            title: "删除成功",
            icon: "success",
            success() {
                setTimeout(() => {
                    wx.navigateBack({ delta: 1 });
                }, 500);
            },
        });
            // this.setData({ list: list });
        },
    });
    }
});
