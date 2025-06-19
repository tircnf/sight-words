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
      path: '/pre-k/:index?',
      name: 'pre-k',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,  // mimics props: true
        listName: "prek",  // adds custom listname
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })
    },
    {
      path: '/short/:index?',
      name: 'short',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "short",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })
    },

    {
      path: '/kinder/:index?',
      name: 'kinder',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "kinder",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
    {
      path: '/first/:index?',
      name: 'first',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "first",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
    {
      path: '/second/:index?',
      name: 'second',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "second",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
    {
      path: '/third/:index?',
      name: 'third',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "third",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
    {
      path: '/nouns/index?',
      name: 'nouns',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "nouns",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
    {
      path: '/all/:index?',
      name: 'all',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardView.vue'),
      props: (route) => ({
        ...route.params,
        listName: "all",
        index: route.params.index ? parseInt(route.params.index) : 0  // converts :index to a number.
      })

    },
  ],
})

export default router
