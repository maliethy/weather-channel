import Vue from 'vue'
import VueRouter from 'vue-router'
import { REFRESH_TOKEN } from '@/constants'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: () => import('@/views/DashBoard/index.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp/index.vue'),
  },
  {
    path: '/update-my-info',
    name: 'UpdateMyInfo',
    component: () => import('@/views/UpdateMyInfo/index.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/test-error',
    name: 'TestError',
    component: () => import('@/views/TestError.vue'),
  },
  {
    path: '/detail-forecast',
    name: 'DetailForecast',
    component: () => import('@/views/DetailForecast/index.vue'),
    children: [
      {
        path: '/detail-forecast/hourly',
        name: 'ForecastHourly',
        component: () => import('@/views/DetailForecast/ForecastHourly/index.vue'),
        meta: { authRequired: true },
      },
      {
        path: '/detail-forecast/daily',
        name: 'ForecastDaily',
        component: () => import('@/views/DetailForecast/ForecastDaily/index.vue'),
        meta: { authRequired: true },
      },
      {
        path: '/detail-forecast/all',
        name: 'ForecastAll',
        component: () => import('@/views/DetailForecast/ForecastAll/index.vue'),
        meta: { authRequired: true },
      },
      {
        path: '/detail-forecast/diagonose',
        name: 'ForecastDiagonose',
        component: () => import('@/views/DetailForecast/ForecastDiagonose/index.vue'),
        meta: { authRequired: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !localStorage.getItem(REFRESH_TOKEN)) {
    store.dispatch('user/setLoginFormModalVisible', {
      visible: true,
    })

    next('/')
    return
  }

  if (from.name !== 'SignUp' && store.getters['alert/userApiResponse'].type === 'success') {
    store.dispatch('alert/resetUserApiResponse')
  }

  next()
})

export default router
