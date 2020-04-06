import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'

Vue.use(Router)

// 导出的应该是 Router 的实例的工厂函数
// 每一次请求都创建一个 Router 实例
// 使得用户之间相互独立 
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Index },
      { path: '/detail', component: Detail },
    ]
  })
}
