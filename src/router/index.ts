import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import { defineAsyncComponent } from 'vue'
import Home from '@/views/Home/index.vue'
import Other from '@/views/Other/index.vue'

// 路由懒加载
const _import = (path) => defineAsyncComponent(() => import(`../views/${path}/index.vue`))

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
    component: _import('Ohter')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
