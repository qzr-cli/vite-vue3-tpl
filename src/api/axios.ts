/**
 * @Date         : 2020-09-22 13:48:53
 * @Description  : axios封装
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-09-22 16:02:37
 */

import axios from 'axios'

const option:any = {
  baseURL: '',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

if (import.meta.env.DEV) option.baseURL = '/api'

const Axios = axios.create(option)

// 添加请求拦截器
Axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  (res) => {
    // 对响应数据做些事
    if (!res.data) {
      console.error('发生未知错误')
      return Promise.reject(res)
    } else if (res.data.status !== 'success' || res.data.code !== 200) {
      console.error(res.data.message)
    }
    return res.data
  },
  (error) => {
    console.log(error)
    console.log(error.response)
    console.error(`${error.response.status}：${error.response.statusText}`)

    return Promise.reject(error.response)
  }
)

export default Axios
