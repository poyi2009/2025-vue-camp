import { createRouter, createWebHashHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'home',
      component: MenuView,
    },
    {
      path: '/review',
      component: () => import('../views/ReviewView.vue'),
    },
    {
      path: '/week2',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/week3',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/task',
      component: () => import('../views/TaskView.vue'),
    },
  ],
})

export default router
