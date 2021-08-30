import commonDirective from './useDirective'
import commonProps from './useProps'

const Plugin:any = {}

Plugin.install = (Vue:any, options:any) => {
  commonDirective(Vue)
  commonProps(Vue)
}

export default Plugin
