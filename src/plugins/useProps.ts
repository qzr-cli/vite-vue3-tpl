/*
 * @Date         : 2021-06-09 14:29:18
 * @Description  : 全局方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-10-31 15:44:33
 */


import api from '@/api'
import utils from '@constq/qzr-utils'

export default function(Vue:any) {
  Vue.config.globalProperties.$api = api
  Vue.config.globalProperties.$utils = utils
  Vue.config.globalProperties.$goUrl = (url:any) => {
    window.open(url)
  }

  Vue.provide('$api', api)
  Vue.provide('$utils', utils)
}
