import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Layout from '@/views/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  // 使用hash方式创建路由
  history: createWebHashHistory(),
  routes
})

export default router
