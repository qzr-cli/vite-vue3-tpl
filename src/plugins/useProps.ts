/*
 * @Date         : 2021-06-09 14:29:18
 * @Description  : 全局方法
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 14:46:33
 */


import api from '@/api'
import utils from '@constq/qzr-utils'

export default function(Vue:any) {
  Vue.config.globalProperties.$api = api
  Vue.config.globalProperties.$utils = utils

  Vue.provide('$api', api)
  Vue.provide('$utils', utils)
}
