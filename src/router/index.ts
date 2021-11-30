import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import Home from '@/views/Home/index.vue'
import Other from '@/views/Other/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:catchAll(.*)',
    component: Home,
  },
  {
    path: '/other',
    name: 'Other',
    component: Other
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
