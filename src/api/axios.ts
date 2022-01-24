/**
 * @Date         : 2020-09-22 13:48:53
 * @Description  : axios封装
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-09-22 16:02:37
 */

import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import axiosRetry from 'axios-retry'
import qs from 'qs'

interface CustomOpt {
  reductData: boolean  // 是否直接返回数据
  contentType: 'json' | 'encode' | 'from'  // 参数传递方式
  timeout: number // 超时时间
}

const defaultOpt: CustomOpt = {
  reductData: true,
  contentType: 'json',
  timeout: 10000
}

enum ContentType {
  'json' = 'application/json',
  'encode' = 'application/x-www-form-urlencoded',
  'from' = 'multipart/form-data'
}

/**
 *
 * @param customParam 自定义参数
 * @returns AxiosInstance
 */
function axiosFn(customParam?: CustomOpt) {
  const customOpt: CustomOpt = {
    ...defaultOpt,
    ...customParam
  }

  const { contentType, reductData, timeout } = customOpt

  const option:any = {
    baseURL: '',
    timeout,
    withCredentials: true, // 是否允许带cookie这些
    headers: {
      'Content-Type': ContentType[contentType],
    },
  }

  option.baseURL = import.meta.env.HOST

  const Axios = axios.create(option)

  // 重试三次请求
  axiosRetry(Axios, { retries: 3 })

  // 添加请求拦截器
  Axios.interceptors.request.use(
    (config) => {
      if (contentType === 'encode') {
        config.data = qs.stringify(config.data)
      }
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
      return reductData ? res.data : res
    },
    (error) => {

      httpErrorStatusHandle(error)

      return Promise.reject(error.response)
    }
  )

  return Axios
}

/**
 *
 * @param url url地址
 */
async function jsonp(url: string) {
  let configObj = { ...{ url }, ...{ adapter: jsonpAdapter }}
  const Axios = axiosFn()

  const res = await Axios.request(configObj)
  return res
}

export default { axios: axiosFn(), jsonp, axiosFn }

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error:any) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302: message = '接口重定向了！'; break
      case 400: message = '参数不正确！'; break
      case 401: message = '您未登录，或者登录已经超时，请先登录！'; break
      case 403: message = '您没有权限操作！'; break
      case 404: message = `请求地址出错: ${error.response.config.url}`; break // 在正确域名下
      case 408: message = '请求超时！'; break
      case 409: message = '系统已存在相同数据！'; break
      case 500: message = '服务器内部错误！'; break
      case 501: message = '服务未实现！'; break
      case 502: message = '网关错误！'; break
      case 503: message = '服务不可用！'; break
      case 504: message = '服务暂时无法访问，请稍后再试！'; break
      case 505: message = 'HTTP版本不受支持！'; break
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  console.log(error)
  console.log(error.response)
  console.error(`${error.response.status}：${error.response.statusText}`)
  console.error(message)
  // throw Error(message)
  // ElMessage({
  //   type: 'error',
  //   message
  // })
}
