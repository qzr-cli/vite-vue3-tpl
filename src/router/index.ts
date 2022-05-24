import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import Home from '@/views/Home/index.vue'
import Other from '@/views/Other/index.vue'

import beforeEach from './guard/beforeEach'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/:catchAll(.*)',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/other',
    name: 'Other',
    component: Other,
    meta: {
      keepAlive: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(beforeEach)

export default router
