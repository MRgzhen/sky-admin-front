import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { globalRoutes, mainRoutes } from './router'

Vue.use(VueRouter)

// 处理路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 处理固定路由(/,/login,/home....)重复增加
VueRouter.prototype.$addRoutes = (params) => {
    router.matcher = new VueRouter({ mode: 'history' }).matcher
    router.addRoutes(params)
}

const router = new VueRouter({
    routes: globalRoutes.concat(mainRoutes),
    mode: 'history'
})

router.beforeEach(async(to, from, next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            try {
                if (store.getters.user) {
                    next()
                } else {
                    await store.dispatch('user/getUserInfo')
                    await store.dispatch('menu/createRoutes')
                    router.$addRoutes(store.getters.routes)
                    // 已登录访问不是登录页面
                    next({ ...to, replace: true })
                }
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to, from) => {
})

export default router

