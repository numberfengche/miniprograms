import { request } from "./net"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}


export const formatDate = (date:Date) => {
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    return year +"-"+ month +"-"+  day;
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
// import { request } from "@@/exports";

class webapi {
  static get<T>(url: string, params?: any): Promise<T> {
    return this.execute<T>(url, {
      method: "GET",
      params: params
    });
  }

  static post<T>(url: string, data?: any): Promise<T> {
    return this.execute<T>(url, {
      method: "POST",
      data: data
    });
  }

  static execute<T>(url: string, option: any): Promise<T> {
    return request(url, option).then((r: any) => r.data);
  }
}

export default webapi;