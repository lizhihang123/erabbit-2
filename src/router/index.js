import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Layout from '@/views/Layout.vue'
// 一级分类和二级分类的页面
import TopCategory from '@/views/category/index.vue'
import SubCategory from '@/views/category/sub.vue'

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
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
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
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 0 } vue2的写法
    return { top: 0, left: 0 }
  }
})

export default router
