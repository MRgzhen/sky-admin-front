const layout = {
    namespaced: true,
    state: {
        // 屏幕宽度
        screenWidth: document.documentElement.clientWidth,
        // 屏幕高度
        screenHeight: document.documentElement.clientHeight,
        // sidebar
        sidebar: {
            // 是否折叠  true：展开，false：折叠
            opened: true,
            // 抽屉是否打开  true：打开，false：折叠
            drawer: false
        },
        // 是否小尺寸，false：否，true：是
        mobile: false
    },
    mutations: {
        SET_SIDEBAR(state) {
            if (state.mobile) {
                state.sidebar.opened = true
                state.sidebar.drawer = !state.sidebar.drawer
            } else {
                state.sidebar.drawer = false
                state.sidebar.opened = !state.sidebar.opened
            }
        }
    }
}

export default layout
