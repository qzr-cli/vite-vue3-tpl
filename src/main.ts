import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import pinia from '@/store'

import Plugins from '@/plugins'

import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

if (import.meta.env.VITE_ENV === 'mock') {
  import('./mock')
}

const app = createApp(App)

app.use(Plugins)
app.use(router)
app.use(pinia)
app.mount('#app')
