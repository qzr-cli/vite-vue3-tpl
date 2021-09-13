import commonDirective from './useDirective'
import commonProps from './useProps'
import commonComponents from './useComponents'

const Plugin:any = {}

Plugin.install = (Vue:any, options:any) => {
  commonDirective(Vue)
  commonProps(Vue)
  // commonComponents(Vue)
}

export default Plugin
