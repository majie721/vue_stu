// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { Tabbar, TabbarItem,Row, Col,Panel,NavBar,TreeSelect,Tab, Tabs,Pagination,Button,Toast,Actionsheet } from 'vant'

// 引入css
import '../static/css/global.css';


// 定义全局过滤器 开始
import Moment from 'moment';
Moment.locale('zh-cn');
Vue.filter('convertTime',function(time,format){
  return Moment(time).format(format)
})



Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem).use(Row)
    .use(Col).use(Panel).use(NavBar ).use(TreeSelect)
    .use(Tab).use(Tabs).use(Pagination).use(Button).use(Toast).use(Actionsheet);

//axios
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://mfsk.com/api/';
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     Toast.loading({
//         message: '加载中...'
//     });
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     Toast.fail('网络错误稍后再试');
//     return Promise.reject(error);
// });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Toast.clear()
    return response;
}, function (error) {
    // 对响应错误做点什么
    Toast.fail('请求错误稍后再试');
    return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
