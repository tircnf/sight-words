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
      path: '/pre-k',
      name: 'pre-k',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "prek"}
    },
    {
      path: '/short',
      name: 'short',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "short"}
    },

    {
      path: '/kinder',
      name: 'kinder',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "kinder"}
    },
    {
      path: '/first',
      name: 'first',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "first"}
    },
    {
      path: '/second',
      name: 'second',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "second"}
    },
    {
      path: '/third',
      name: 'third',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "third"}
    },
    {
      path: '/nouns',
      name: 'nouns',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "nouns"}
    },
    {
      path: '/all',
      name: 'all',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: {listName: "all"}
    },
  ],
})

export default router
