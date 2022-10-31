// import service from "./index";
import {
    post,
    get
} from "./index";

// 登录
export function login(data) {
    return post({
        url: "/bio/user/login",
        data
    })
}

// 注册
export function register(data) {
    return post({
        url: "/bio/user/register",
        data
    })
}

// 商品推荐列表
// export function goodsRecommendList (data) {
//     return service({
//         url: "/bio/app/bioItem/recommended/list",
//         method: "get",
//         data
//     })
// }

// 商品推荐列表分页
export function goodsRecommendList(data) {
    return get({
        url: "/bio/app/bioItem/recommended/list?",
        data
    })
}

// 商品详情返回id
export function getGoodsDetail(data) {
    // console.log("api---", data);
    return get({
        url: "/bio/app/bioItem/queryById?id=" + data,

    })
}

// 商品详情sku
export function getGoodsDetailSku(data) {
    // console.log("api---", data);
    return get({
        url: "/bio/app/bioSku/queryItemId?itemId=" + data,
    })
}

// 商品推荐轮播图
export function getBanner(data) {
    return get({
        url: "/bio/app/bioBanner/app/list?bannerType=" + data
    })
}

// 获取古诗分页
// export function getPoem() {
//     return get({
//         url: "https://api.apiopen.top/api/getImages?page=0&size=10"
//     })
// }

// 平台公告分页
export function getAnnouncementPagination(data) {
    return get({
        url: "/bio/app/bioAnnouncement/app/list?",
        data,
    })
}

// 平台公告详情返回id
export function getAnouncementDetail(data) {
    return get({
        url: "/bio/app/bioAnnouncement/queryById?id=" + data,

    })
}

// 首页商品和服务分类
    // 获取商品和服务推荐tab列表 只传level=2 type=1
export function getIndexSort(data) {
    return get({
        url: "/bio/app/bioClassification/app/parent?",
        data,
    })
}

// 推荐服务分页
export function serviceRecommendList(data) {
    return get({
        url: "/bio/app/bioService/app/recommended/list?",
        data
    })
}

// 补充服务分页
export function serviceRecommendListSupplement(data) {
    return get({
        url: "/bio/app/bioService//app/list?",
        data
    })
}

// 服务详情返回id
export function getServiceDetail(data) {
    return get({
        url: "bio/app/bioService/queryById?id=" + data,

    })
}