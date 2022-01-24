/**
 * @Date         : 2022-01-04 18:14:39
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-04 18:14:40
 */

import Mock from 'mockjs'

Mock.mock(RegExp(`/mock/test/.*`), 'post', {
  'code': 200,
  'message': '',
  'status': 'success'
})
