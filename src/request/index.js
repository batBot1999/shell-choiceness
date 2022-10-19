import axios from "axios"

// 创建axios实例
const service = axios.create({
  baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
  timeout: 1000,
  headers: {
    "Content-Type" : "application/json;charset=utf-8"
}
})

// 请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if(localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token") || ""
  }
  return config
})

// 响应拦截
service.interceptors.response.use((res) => {
  // 根据状态码判断成功还是失败
  const code = res.data.data.code
  if (code != 200) {
    return Promise.reject(res.data)
  }
  // 成功的返回
  return res.data
}, (err) => {
  console.log(err);
})

export default service