/*
 * @Date         : 2021-06-08 16:24:21
 * @Description  : 全局自定义指令
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-09 14:44:42
 */


export default function(Vue:any) {
  Vue.directive('riseFall', {
    mounted(el:HTMLElement) {
      riseFall(el)
    },
  })

  Vue.directive('add0', {
    mounted(el:HTMLElement) {
      const text = el.innerText
      el.innerText = Number(text) < 10 ? `0${text}` : text
    },
  })

}

function riseFall(el:HTMLElement) {
  const reg = /\-/g
  const isNegative = reg.test(el.innerText)
  if (isNegative) {
    el.style.color = '#00A960'
  } else {
    el.style.color = '#F22C43'
  }
}
