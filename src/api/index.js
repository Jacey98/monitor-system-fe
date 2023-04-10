import requests from './requests'

// 登录
export const userLogin = (data) => requests({ url: '/user/login', params: data, method: 'post' })
// export const xx = () => requests({ url: '/xx', method: 'get' })

// 获取影像名称列表
export const imageImageList = () => requests({ url: '/image/imageList', method: 'get' })

// 获取影像各图层
export const imageImageLayers = (data) => requests({ url: '/image/imageLayers', params: data, method: 'post' })

// 获取影像名称列表
export const imageAllImages = () => requests({ url: '/image/allImages', method: 'get' })

// 获取影像各图层
export const imageDeleteImage = (data) => requests({ url: '/image/deleteImage', params: data, method: 'post' })

// 新增影像
export const imageImageAdd = (data) => requests({ url: '/image/imageAdd', data: data, method: 'post', timeout: 500000, headers: { "Content-Type": "multipart/form-data" } })
