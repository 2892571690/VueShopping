import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/font-ico/iconfont.css'
// 导入第三方表格
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入NProgress对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入axios
import axios from 'axios'
// axios设置根目录
axios.defaults.baseURL = 'http://localhost:3000'
// 用axios拦截器的request，在请求头添加Authorization字段提供tokoen令牌，使登陆过后有权限访问其他接口
// 再 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 在最后面必须 return config;
  return config;
})
// 再 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config =>{
  NProgress.done()
  return config;
})
// 在Vue原型上绑定axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 注册导入第三方表格
Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件   
Vue.use(VueQuillEditor)
// 使用数组的(filter)过滤器方法，设置一个全局的时间函数
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getMilliseconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
