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


export const formatRichText=(html:any)=>{
    console.log(html);
    let newContent= html.replace(/<img[^>]*>/gi,function(match:any,capture:any){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match:any,capture:any){
        match = match
        .replace(/<p>/gi, '<p class="p_class">')
        .replace(/width:[^;]+;/gi, 'max-width:100%;')
        .replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, "");
    newContent = newContent.replace(/<a>/gi, '<a class="p_class "');
    newContent = newContent.replace(/<li>/gi, '<li class="p_class "');
    newContent = newContent.replace(/\<p/gi, '<p class="p_class "');
    newContent = newContent.replace(/\<span/gi, '<span class="p_class "');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
  }
  export const filterKeys = (json: any | Array<any>) => {
    let result: any = false;
    if (Array.isArray(json)) {
      result = json.filter((item) => item !== "" && item !== null && item !== undefined);
    } else if (json instanceof Object) {
      result = {};
  
      for (const key in json) {
        if (json[key] !== "" && json[key] !== null && json[key] !== undefined) {
          // if (Array.isArray(json[key]) && json[key].length > 0) {
          result[key] = json[key];
          // }
        }
      }
    }
    return result;
  };
//   "tabBar": {
//     "backgroundColor": "#fff",
//     "color": "#BBBBBB",
//     "selectedColor": "#1A1A1A",
//     "list": [
//         {
//             "pagePath": "pages/index/index",
//             "text": "首页",
//             "iconPath": "assets/images/index.png",
//             "selectedIconPath": "assets/images/index_select.png"
//         },
//         {
//             "pagePath": "pages/square/square",
//             "text": "文创市集",
//             "iconPath": "assets/images/sj.png",
//             "selectedIconPath": "assets/images/sj_select.png"
//         },
//         {
//             "pagePath": "pages/article/article",
//             "text": "文章",
//             "iconPath": "assets/images/wz.png",
//             "selectedIconPath": "assets/images/wz_select.png"
//         },
//         {
//             "pagePath": "pages/activity/activity",
//             "text": "活动",
//             "iconPath": "assets/images/hd.png",
//             "selectedIconPath": "assets/images/hd_select.png"
//         },
//         {
//             "pagePath": "pages/mine/mine",
//             "text": "我的",
//             "iconPath": "assets/images/mine1.png",
//             "selectedIconPath": "assets/images/mine1_select.png"
//         }
//     ]
// },