import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia
