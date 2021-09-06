/*
 * @Date         : 2021-09-02 15:08:52
 * @Description  : 全局引用components common组件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 15:28:41
 */


export default function(Vue:any) {
  const files:any = import.meta.globEager('../components/common/*.vue')


  console.log(files)
  Object.keys(files).forEach((fileName:string) => {
    console.log(fileName)
    let componentname:any = fileName.replace(/(\.\/|\.vue)/g, '').split('/')
    componentname = componentname[componentname.length - 1]
    console.log(componentname)
    console.log(files[fileName].default)
    Vue.component('common-' + componentname, () => files[fileName].default.render() || files[fileName])
  })
}
