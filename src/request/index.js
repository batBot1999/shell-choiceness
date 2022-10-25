import axios from "axios"

// 创建axios实例
const service = axios.create({
  baseURL: "http://linzhiying123.natapp1.cc/jeecg-boot",
  timeout: 1000,
  headers: {
    // "Content-Type" : "application/json;charset=utf-8"
    'Content-Type': "application/json",
  }
})

// 请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token") || ""
  }
  return config
})

// 响应拦截
service.interceptors.response.use((res) => {
  // 根据状态码判断成功还是失败
  const code = res.data.code
  if (code != 200) {
    return Promise.reject(res.data)
  }
  // 成功的返回
  return res.data
}, (err) => {
  console.log(err);
})


// export function get(url, params) {
//   let str = params ? `?${qs.stringify(params)}` : '';
//   return reqInstance.get(`${url}${str}`);
// }

// post 默认 application/json 类型
export function post({url,data}) {
  // console.log(url, data);
  let headers = {
    'Content-Type': "application/json",
    // ...header
  };
  // if (isJson === false) {
  //   params = qs.stringify(params);
  //   headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";
  // }
  return service.post(url, data, {
    headers
  });
}

export default service