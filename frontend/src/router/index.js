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
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/AdminDashboard',
      name: 'AdminDashboard',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminDashboard.vue'),
    },
    {
      path: '/admin/LostItems',
      name: 'LostItems',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LostItems.vue'),
    },
    {
      path: '/admin/FoundItemsList',
      name: 'FoundItemsList',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FoundItemsList.vue'),
    },
    {
      path: '/admin/ClaimRequests',
      name: 'ClaimRequests',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClaimRequests.vue'),
    },
    {
      path: '/admin/UserList',
      name: 'UserList',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserList.vue'),
    },
    ,
    {
      path: '/admin/FeedbackPage',
      name: 'UseFeedbackPagerList',
      // route level code-splitting
      // this generates a separate chunk (SignUp.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FeedbackPage.vue'),
    },
    {
      path: '/listOfFoundClaimedItems',
      name: 'listOfFoundClaimedItems',
      component: () => import('../views/listOfFoundClaimedItems.vue'),
    },
  ],
})

export default router
