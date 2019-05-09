import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import History from '@/components/History'
import CardHistory from '@/components/CardHistory'
import PointsHistory from '@/components/PointsHistory'
import Flow from '@/components/Flow'
import User from '@/components/User'
import Bankinfo from '@/components/Bankinfo'
import BankinfoEdit from '@/components/BankinfoEdit'
import Feedback from '@/components/Feedback'
import FeedbackList from '@/components/FeedbackList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
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
            path: '/flow',
            name: 'flow',
            component: Flow
        },
        {
            path: '/user',
            name: 'user',
            component: User,
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
        },
        {
            path: '/user/bankinfo',
            name: 'bankinfo',
            component: Bankinfo
        },
        {
            path: '/bankinfo_edit',
            name: 'bankinfo_edit',
            component: BankinfoEdit
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: Feedback
        },
        {
            path: '/feedbackList',
            name: 'feedbackList',
            component: FeedbackList
        }
    ]
})
