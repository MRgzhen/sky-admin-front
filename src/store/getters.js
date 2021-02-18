const getters = {
    user: state => state.user.user,
    token: state => state.user.token,
    menus: state => state.menu.menus,
    routes: state => state.menu.routes,
    activeName: state => state.menu.activeName,
    opened: state => state.layout.sidebar.opened,
    drawer: state => state.layout.sidebar.drawer,
    mobile: state => state.layout.mobile,
    screenHeight: state => state.layout.screenHeight
}

export default getters
