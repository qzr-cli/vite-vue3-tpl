import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import { createPinia } from 'pinia'

import Plugins from '@/plugins'

const app = createApp(App)

app.use(Plugins)
app.use(router)
app.use(createPinia())
app.mount('#app')
