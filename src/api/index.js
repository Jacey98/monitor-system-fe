import requests from './requests'

// 登录
export const userLogin = (data) => requests({ url: '/user/login', params: data, method: 'post' })
// export const xx = () => requests({ url: '/xx', method: 'get' })

// 获取影像名称列表
export const imageImageList = () => requests({ url: '/image/imageList', method: 'get' })
