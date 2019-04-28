import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import History from '@/components/History'
import CardHistory from '@/components/CardHistory'
import PointsHistory from '@/components/PointsHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
      {
          path: '/history',
          name: 'history',
          component: History
      },
      {
          path: '/home/cardHistory',
          name: 'cardHistory',
          component: CardHistory
      },
      {
          path: '/home/pointsHistory',
          name: 'pointsHistory',
          component: PointsHistory
      }
  ]
})
