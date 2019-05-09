// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { Tabbar, TabbarItem,Row, Col,Panel,NavBar,TreeSelect,Tab, Tabs,Pagination,
    Button,Toast,Actionsheet,Icon,Cell, CellGroup,Tag,Field,Popup ,Picker} from 'vant'

//表单验证
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';

// 引入css
import '../static/css/global.css';

const HOST = 'http://card.test.com'  //测试环境的地址
//const HOST = 'http://mfsk.com'  //开发替换成自己的地址

// 定义全局过滤器 开始
import Moment from 'moment';
Moment.locale('zh-cn');
Vue.filter('convertTime',function(time,format){
  return Moment(time).format(format)
})

Vue.filter('tipsm',function(id){
   // return 'http://mfsk.com/mobile/tipsm/show_tips?tip_id=2019041515095289572'
    return HOST+'/mobile/tipsm/show_tips?tip_id='+id;
})



Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem).use(Row)
    .use(Col).use(Panel).use(NavBar ).use(TreeSelect)
    .use(Tab).use(Tabs).use(Pagination).use(Button)
    .use(Toast).use(Actionsheet).use(Icon).use(Cell)
    .use(CellGroup).use(Tag ).use(Field ).use(Popup).use(Picker);


Validator.localize('zh_CN', zh_CN)
Vue.use(VeeValidate)

const ValidatorisMoblie ={
    messages: {
        cn:(field, args) => field + '必须是11位手机号码',
    },
    validate: (value, args) => {
        return value.length == 11 && /^(1)\d{10}$/.test(value)
    }

}

Validator.extend('mobile',ValidatorisMoblie)

const formatFileSize = function (size) {
    let units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let threshold = 1024;
    size = Number(size) * threshold;
    let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
    return (((size / Math.pow(threshold, i)).toFixed(2) * 1) + " " + (units[i]));
}
const fieldName = '' // 原来的i18n的fieldName会显示绑定的name值，就是英文，实际项目中不需要
Validator.localize('zh_CN', {
    name: 'zh_CN',
    attributes: {},
    messages: {
        _default: () => `${fieldName}无效`,
        mobile: () => `${fieldName}必须是11位手机号码`,
        after: (field, [target]) => `${fieldName}必须在${target}之后`,
        alpha_dash: () => `${fieldName}能够包含字母数字字符、破折号和下划线`,
        alpha_num: () => `${fieldName}只能包含字母数字字符`,
        alpha_spaces: () => `${fieldName}只能包含字母字符和空格`,
        alpha: () => `${fieldName}只能包含字母字符`,
        before: (field, [target]) => `${fieldName}必须在${target}之前`,
        between: (field, [min, max]) => `${fieldName}必须在${min}与${max}之间`,
        confirmed: (field, [confirmedField]) => `${fieldName}不能和${confirmedField}匹配`,
        credit_card: () => `${fieldName}格式错误`,
        date_between: (field, [min, max]) => `${fieldName}必须在${min}和${max}之间`,
        date_format: (field, [format]) => `${fieldName}必须符合${format}格式`,
        decimal: (field, [decimals = '*'] = []) => `${fieldName}必须是数字，且能够保留${decimals === '*' ? '' : decimals}位小数`,
        digits: (field, [length]) => `${fieldName}必须是数字，且精确到${length}位数`,
        dimensions: (field, [width, height]) => `${fieldName}必须在${width}像素与${height}像素之间`,
        email: () => `${fieldName}不是一个有效的邮箱`,
        ext: () => `${fieldName}不是一个有效的文件`,
        image: () => `${fieldName}不是一张有效的图片`,
        included: () => `${fieldName}不是一个有效值`,
        integer: () => `${fieldName}必须是整数`,
        ip: () => `${fieldName}不是一个有效的地址`,
        length: (field, [length, max]) => {
            if (max) {
                return `${fieldName}长度必须在${length}到${max}之间`
            }
            return `${fieldName}长度必须为${length}`
        },
        max: (field, [length]) => `${fieldName}不能超过${length}个字符`,
        max_value: (field, [max]) => `${fieldName}必须小于或等于${max}`,
        mimes: () => `${fieldName}不是一个有效的文件类型`,
        min: (field, [length]) => `${fieldName}必须至少有${length}个字符`,
        min_value: (field, [min]) => `${fieldName}必须大于或等于${min}`,
        excluded: () => `${fieldName}不是一个有效值`,
        numeric: () => `${fieldName}只能包含数字字符`,
        regex: () => `${fieldName}格式无效`,
        required: () => `${fieldName}不能为空`,
        size: (field, [size]) => `${fieldName}必须小于${formatFileSize(size)}`,
        url: () => `${fieldName}不是一个有效的url`
    }
})
Vue.use(VeeValidate)

//axios
Vue.prototype.$axios = axios;
axios.defaults.baseURL = HOST+'/api/'; //TODO 改成自己开发环境
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
