// import service from "./index";
import {post} from "./index";

// 登录
export function login(data) {
    return service({
        url: "/login",
        method: "POST",
        data
    })
}

// 注册
export function register(data) {
    // console.log(service);
    return post({
        url: "/bio/user/register",
        data
    })
}

// 商品推荐列表
export function goodsRecommendList () {
    return service({
        url: "goodsRecommendList",
        method: "GET"
    })
}

// 精选服务列表
export function choicenessServiceList () {
    return service({
        url: "choicenessServiceList",
        method: "GET"
    })
}

// 搜索商品
export function searchGoods () {
    return service({
        url: "searchGoods",
        method: "GET"
    })
}

// 搜索商品
export function searchServices () {
    return service({
        url: "searchServices",
        method: "GET"
    })
}

// 商品列表
export function getGoodsList() {
    return service({
        url:"/getGoodsList",
        method: "GET"
    })
}