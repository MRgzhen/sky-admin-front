// 全局路由(无需嵌套上左右整体布局)
export const globalRoutes = [
    // { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' }},
    { path: '/login', component: () => import('@/views/login'), name: 'login', meta: { title: '登录' }}
]

export const mainChildRoutes = [
    { path: 'owner', component: () => import('@/views/layout/header/Set'), name: 'owner', meta: { title: '个人中心' }}
]

// 主入口路由(需嵌套上左右整体布局)
export const mainRoutes = {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口整体布局' },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 3. isCache: 是否缓存, keep-alive: 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        { path: 'home', component: () => import('@/views/home/index.vue'), name: 'home', meta: { title: '首页' }}
        // { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' }},
        // { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true }},
        // { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true }}
    ]
}

