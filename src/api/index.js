import requests from './requests'

// 用户登录接口
export const userLogin = (data) => requests({ url: '/user/login', params: data, method: 'post' })
// export const xx = () => requests({ url: '/xx', method: 'get' })

