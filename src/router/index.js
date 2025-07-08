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
      path: '/:listName/:index?',
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,  // mimics props: true
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })
    },
  ],
})

export default router
