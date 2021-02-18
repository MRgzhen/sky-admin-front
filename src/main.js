/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 扩展组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/iconfont.css'
import ElSelectTree from 'el-select-tree'

// 工具类
import ajax from '@/utils/ajax'
import api from '@/api/api'
import constant from '@/utils/constant'
import common from '@/utils/common'

// mixins
import resizeMixin from '@/mixins/resizeMixin'
// global css
import '@/assets/scss/layout.scss'
// icon
import '@/icons'
import '@/components'
Vue.config.productionTip = false

// 组件注册到Vue中
Vue.use(ElementUI)
Vue.use(ElSelectTree)

// 绑定到Vue原型上
Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$constant = constant
Vue.prototype.$common = common

new Vue({
    router,
    store,
    mixins: [resizeMixin],
    render: h => h(App)
}).$mount('#app')
