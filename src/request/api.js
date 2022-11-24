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

// 商品首页只传一个id不分页
export function getIdGoodsList(data) {
    return get({
        url: "/bio/app/bioItem/parent/item?id=" + data,

    })
}

// 首页商品分类hover一级返传一级id,返回二三级直接渲染
export function getIdGoodsSortAll(data) {
    return get({
        url: "/bio/app/bioClassification/app/next?",
        data,

    })
}


// 订单页面点击提交
export function postOrderCommit(data) {
    return post({
        url: "/bio/bioOrder/add?",
        data,
    })
}

// 获取用户基本信息 只传token
export function getUserImformation(data) {
    return get({
        url: "/bio/user/getMyBioUser?",
        data,

    })
}

// 更新用户基本信息 传很多参数
export function updateUserImformation(data) {
    return post({
        url: "/bio/user/update?",
        data,

    })
}

// 个人服务地址信息表格请求数据
export function getUserImformationAdress(data) {
    return get({
        url: "/bio/bioConsigneeAddress/pc/list?",
        data,
    })
}

// 增加个人服务地址信息表格数据
export function addUserImformationAdress(data) {
    return post({
        url: "/bio/bioConsigneeAddress/pc/add?",
        data,

    })
}

// 编辑个人服务地址信息表格数据
export function editUserImformationAdress(data) {
    return post({
        url: "/bio/bioConsigneeAddress/pc/edit?",
        data,

    })
}

// 图片上传
export function uploadimage(data) {
    return post({
        // url的地址改成自己的本地地址或者是线上地址
        //   url: `http://localhost:9528/template/api/admin/article/uploadimg`,
        data: data,
    })
}