import service from "./index";

// 登录接口
export function login(data) {
    return service({
        url: "/login",
        method: "POST",
        data
    })
}

// 商品列表接口
export function getGoodsList() {
    return service({
        url:"/getGoodsList",
        method: "get"
    })
}