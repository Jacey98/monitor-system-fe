import axios from 'axios'

const requests = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  // 请求超时时间5s
  timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  let token = window.localStorage.getItem('token')
  if (token) {
    config.headers.token = token;
  }
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  if (res.data.code === 400) {
    localStorage.removeItem("name");
    localStorage.removeItem("authority");
    localStorage.removeItem("token");
    PubSub.publish("changeActive", 6);
    return
  }
  return res.data
}, (error) => {
  alert("服务器响应数据失败");
  // return Promise.reject(new Error(error))
})

export default requests