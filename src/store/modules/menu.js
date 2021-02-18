import { mainRoutes, mainChildRoutes } from '@/router/router'
import ajax from '@/utils/ajax'
import api from '@/api/api'
const menu = {
    namespaced: true,
    state: {
        routes: [],
        menus: [],
        activeName: '',
        tabs: [],
        breadcrumb: []
    },
    getters: {},
    mutations: {
        SET_MENUS(state, menus = []) {
            state.menus = [...menus]
        },
        SET_ROUTES(state, routes = {}) {
            state.routes = [].concat(routes)
        },
        SET_ACTIVENAME(state, val) {
            state.activeName = val
        },
        ADD_TAB(state, tabObj) {
            let noTab = true
            const tabName = tabObj.name
            state.tabs.forEach((item, index) => {
                if (item.name === tabName) {
                    noTab = false
                }
            })
            if (noTab) {
                if (tabObj.name === 'home') {
                    state.tabs.unshift({
                        label: tabObj.title,
                        name: tabObj.name
                    })
                } else {
                    state.tabs.push({
                        label: tabObj.title,
                        name: tabObj.name
                    })
                }
            }
            state.activeName = tabName
        },
        REMOVE_TAB(state, tabName) {
            const activeName = state.activeName
            if (activeName === tabName) {
                state.tabs.forEach((item, index) => {
                    if (item.name === tabName) {
                        const nextTab = state.tabs[index + 1] || state.tabs[index - 1]
                        if (nextTab) {
                            state.activeName = nextTab.name
                        }
                    }
                })
            }
            state.tabs = state.tabs.filter(item => item.name !== tabName)
        }
    },
    actions: {
        createRoutes({ commit, state }) {
            return new Promise((resolve, reject) => {
                ajax.get(api.sys.menu.menuMe).then(result => {
                    // 菜单缓存
                    commit('SET_MENUS', result.bean)
                    // 创建路由
                    const routes = []
                    createRoutes(routes, result.bean)
                    // 路由缓存
                    mainRoutes.children = mainRoutes.children.concat(mainChildRoutes)
                    console.log(mainRoutes)
                    mainRoutes.children = mainRoutes.children.concat(routes)
                    console.log(mainRoutes)
                    commit('SET_ROUTES', mainRoutes)
                    resolve(state.routes)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default menu

// 通过meta对象设置路由展示方式
// 1. isTab: 是否通过tab展示内容, true: 是, false: 否
// 2. type: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
// 3. isCache: 是否缓存, keep-alive: 是, '': 否
// 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
// { path: 'home', component: () => import('@/views/home/index.vue'), name: 'home', meta: { title: '首页' }}
function createRoutes(routes = [], nodes = []) {
    for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.children && node.children.length > 0) {
            createRoutes(routes, node.children)
        } else {
            const routeNode = {
                path: node.path,
                name: node.path,
                component: null,
                meta: {
                    key: node.id,
                    title: node.name,
                    icon: node.icon,
                    isTab: true,
                    type: 'view',
                    isCache: true
                },
                children: []
            }
            if (/^http[s]?:\/\/.*/.test(node.component)) {
                routeNode.meta.type = 'iframe'
                routeNode.meta.iframeUrl = node.component
            } else {
                routeNode.component = () => import('@/views/modules/' + node.component + '/index')
            }

            routes.push(routeNode)
        }
    }
}

