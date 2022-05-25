/**
 * @Date         : 2020-09-22 13:48:53
 * @Description  : axios封装
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-09-22 16:02:37
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import jsonpAdapter from 'axios-jsonp'
import axiosRetry from 'axios-retry'
import qs from 'qs'
import { useUser } from '@/store/user'

 interface CustomOpt extends AxiosRequestConfig {
   reductData: boolean  // 是否直接返回数据
   reductId: string
   contentType: 'json' | 'encode' | 'from'  // 参数传递方式
 }

const defaultOpt: CustomOpt = {
  reductData: true,
  contentType: 'json',
  timeout: 10000,
  reductId: 'info'
}

 enum ContentType {
   'json' = 'application/json',
   'encode' = 'application/x-www-form-urlencoded',
   'from' = 'multipart/form-data'
 }

export class AxiosClass {
  axios: AxiosInstance
  option: CustomOpt
  requestPool: {
     [key: symbol]: AbortController
   }  // 请求池 用于取消请求
  constructor(option: Partial<CustomOpt>) {
    this.requestPool = {}

    const customOpt: CustomOpt = {
      ...defaultOpt,
      ...option
    }

    this.option = {
      baseURL: import.meta.env.VITE_HOST,
      headers: {
        'Content-Type': ContentType[customOpt.contentType],
      },
      ...customOpt
    }

    this.axios = this.create(this.option)
    this.requestInterceptors()
    this.responseInterceptors()
    // axiosRetry(this.axios, { retries: 3 })
  }

  private create(customOpt: Partial<CustomOpt>) {
    const option: CustomOpt = {
      baseURL: import.meta.env.VITE_HOST,
      withCredentials: true,
      headers: {
        'Content-Type': ContentType[customOpt.contentType ?? 'json'],
      },
      ...defaultOpt,
      ...customOpt
    }

    const Axios = axios.create(option)

    return Axios
  }

  /**
    * 请求拦截器
    */
  private requestInterceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        if (this.option.contentType === 'encode') {
          config.data = qs.stringify(config.data)
        }
        const controller = new AbortController()
        config.signal = controller.signal
        config['id'] = Symbol(config.url)

        this.requestPool[config['id']] = controller
        return config
      },
      (error) => {
        console.error(error)
        return Promise.reject(error)
      }
    )
  }

  /**
    * 响应拦截器
    */
  private responseInterceptors() {
    this.axios.interceptors.response.use(
      (res) => {
        const { reductData, reductId } = this.option
        delete this.requestPool[res.config['id']]
        // 对响应数据做些事
        if (!res.data) {
          console.error('发生未知错误')
          return Promise.reject(res)
        } else if (Number(res.data.code) === 1) {
          throw Error(res.data.msg)
        }
        return reductData ? res.data[reductId] : res.data
      },
      (error) => {

        this.httpErrorStatusHandle(error)

        return Promise.reject(error.response)
      }
    )
  }

  async request(config: AxiosRequestConfig) {
    const res = await this.axios.request(config)
    return res
  }

  async jsonp(url: string) {
    const config = {
      ...{ url },
      ...{ adapter: jsonpAdapter }
    }
    const res = await this.axios.request(config)
    return res
  }

  async get<P, R>(url: string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.get(url, {
      params: param,
      ...option
    })
  }
  async options<P, R>(url: string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.options(url, {
      params: param,
      ...option
    })
  }

  async head<P, R>(url: string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.head(url, {
      params: param,
      ...option
    })
  }

  async delete<P, R>(url: string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.delete(url, {
      params: param,
      ...option
    })
  }

  async post<P, R>(url:string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.post(url, param, option)
  }

  async put<P, R>(url:string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.request({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(param),
      ...option
    })
    // return this.axios.put(url, param, option)
  }

  async patch<P, R>(url:string, param: P, option?: AxiosRequestConfig): Promise<R> {
    return this.axios.patch(url, param, option)
  }

  /**
    * 取消请求池中所有请求
    */
  cancalAll() {
    for (const key in this.requestPool) {
      if (Object.prototype.hasOwnProperty.call(this.requestPool, key)) {
        const val = this.requestPool[key]
        val.abort()
        delete this.requestPool[key]
      }
    }
  }


  /**
  * 处理异常
  * @param {*} error
  */

  private httpErrorStatusHandle(error:any) {
    // 处理被取消的请求
    if (axios.isCancel(error)) return console.error('已取消的请求：' + error.message)
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


    if (error?.response?.data?.msg) {
      if (error?.response?.data?.msg === '认证异常') {
        this.cancalAll()

        const userStore = useUser()
        userStore.logout()
      }
    }

  }
}

export const Axios = new AxiosClass({
  reductId: 'data'
})
