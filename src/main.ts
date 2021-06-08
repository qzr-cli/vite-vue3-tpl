import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import Plugins from '@/plugins'

const app = createApp(App)

app.use(Plugins)
app.use(router)
app.use(store)
app.mount('#app')
