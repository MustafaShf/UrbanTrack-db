import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/listOfFoundUnclaimedItems',
      name: 'listOfFoundUnclaimedItems',
      component: () => import('../views/listOfFoundUnclaimedItems.vue'),
    },
    {
      path: '/listOfLostUnfoundItems',
      name: 'listOfLostUnfoundItems',
      component: () => import('../views/listOfLostUnfoundItems.vue'),
    },
    {
      path: '/ReportLostItem',
      name: 'ReportLostItem',
      component: () => import('../views/ReportLostItem.vue'),
    },
    {
      path: '/ReportFoundItem',
      name: 'ReportFoundItem',
      component: () => import('../views/ReportFoundItem.vue'),
    },
    {
      path: '/user-home',
      name: 'user-home',
      component: () => import('../views/UserHomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SigninView.vue'),
    },
  ],
})

export default router
