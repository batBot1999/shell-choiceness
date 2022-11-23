import axios from "axios"
import qs from "qs"
// import VueRouter from 'vue-router'
// import router from './router'

// 创建axios实例
const service = axios.create({
  baseURL:
  // "http://bkzx.bioclub.cn/api/jeecg-boot",
  "http://linzhiying123.natapp1.cc/jeecg-boot",
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
    // 对象的属性不止可以"."也可以[]
    config.headers['X-Access-Token'] = localStorage.getItem("token") || ""
  }
  // console.log(localStorage)
  return config
})

// 响应拦截
service.interceptors.response.use((res) => {
  // 根据状态码判断成功还是失败
  const code = res.data.code
  if (code != 200) {
    return Promise.reject(res.data)
  }
  // 401 token失效
    if (code == 401) {
      this.$router.push({name: "home"})
    }
  // 成功的返回
  return res.data
}, (err) => {
  // console.log(err);
})

// get
export function get({
  url,
  data
}) {
  // console.log(data);
  // console.log(qs.stringify(data));
  let str = data ? `${qs.stringify(data)}` : '';
  // console.log(str);
  return service.get(`${url}${str}`);
}


// post
export function post({
  url,
  data
}) {
  // console.log(url, data);
  let headers = {
    'Content-Type': "application/json",
    // ...header
  };
  return service.post(url, data, {
    headers
  });
}

export default service