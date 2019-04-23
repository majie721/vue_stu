// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Tabbar, TabbarItem,Row, Col,Panel } from 'vant'


Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem).use(Row).use(Col).use(Panel);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
