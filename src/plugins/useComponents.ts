/*
 * @Date         : 2021-09-02 15:08:52
 * @Description  : 全局引用components common组件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-01-21 16:07:49
 */


export default function(Vue:any) {
  const files:any = import.meta.globEager('../components/common/*.vue')


  console.log(files)
  Object.keys(files).forEach((fileName:string) => {
    let componentname:any = fileName.replace(/(\.\/|\.vue)/g, '').split('/')
    componentname = componentname[componentname.length - 1]
    Vue.component('common-' + componentname, files[fileName].default)
  })
}
