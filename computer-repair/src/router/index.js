import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-network',
    name: 'AddNetwork',
    component: () => import('../views/AddNetwork.vue')
  },
  {
    path: '/update-network/:id',
    name: 'UpdateNetwork',
    component: () => import('../views/UpdateNetwork.vue')
  },
  {
    path: '/network-list',
    name: 'NetworkList',
    component: () => import('../views/NetworkList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
