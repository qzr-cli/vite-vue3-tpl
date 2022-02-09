import commonDirective from './useDirective'
import commonProps from './useProps'
import commonComponents from './useComponents'
import commonMixin from './useMixin'

const Plugin:any = {}

Plugin.install = (Vue:any, options:any) => {
  commonDirective(Vue)
  commonProps(Vue)
  commonComponents(Vue)
  commonMixin(Vue)
}

export default Plugin
