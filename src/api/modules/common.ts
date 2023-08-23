import { Axios, AxiosClass } from '../axios'

// 本地直接通过第三方接口获取token和用戶信息
export function getUserInfoWithMail(params) {
  const axios = new AxiosClass({
    reductAll: true
  })
  return axios.request({
    method: 'get',
    url: '/auth/loginForDevelopment',
    params: params,
    baseURL: 'https://shadow-test.yangcong345.com/api',
  })
}

/**
 * @description: 鉴权
 * @param {*} code  从微前端获取的id
 * @return {*} token  返回token需要在所有接口带上
 */
export function authCheck(code) {
  return Axios.post('/admin/user/authentication', {
    code,
  })
}
