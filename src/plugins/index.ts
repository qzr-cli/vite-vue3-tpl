import commonDirective from './directive'

const Plugin:any = {}

Plugin.install = (Vue:any, options:any) => {
  commonDirective(Vue)
}

export default Plugin
