const sys = {
    social: {
        listByUserId: '/sys/social/list/userId',
        bind: '/sys/social/bind',
        unbind: '/sys/social/unbind'
    },
    dept: {
        list: '/sys/dept/list',
        get: '/sys/dept/get',
        checkDeptName: '/sys/dept/check/deptName',
        add: '/sys/dept/add',
        edit: '/sys/dept/update',
        editEnable: '/sys/dept/update/enabled',
        delete: '/sys/dept/delete'
    },
    user: {
        userMe: '/sys/user/user',
        list: '/sys/user/list',
        check: '/sys/user/check/code',
        delete: '/sys/user/delete',
        add: '/sys/user/add',
        edit: '/sys/user/update',
        editEnabled: '/sys/user/update/enabled',
        ofRoles: '/sys/user/ofRoles',
        toRoles: '/sys/user/toRoles'
    },
    role: {
        list: '/sys/role/list',
        check: '/sys/role/check/code',
        add: '/sys/role/add',
        edit: '/sys/role/update',
        delete: '/sys/role/delete',
        ofMenus: '/sys/role/ofMenus',
        toMenus: '/sys/role/toMenus',
        ofDataScope: '/sys/role/ofDataScope',
        toDataScope: '/sys/role/toDataScope'
    },
    menu: {
        menuMe: '/sys/menu/me',
        checkCode: '/sys/menu/check/code',
        checkPerms: '/sys/menu/check/perms',
        list: '/sys/menu/list',
        add: '/sys/menu/add',
        edit: '/sys/menu/update',
        editEnable: '/sys/menu/update/enabled',
        delete: '/sys/menu/delete'
    },
    perm: {
        list: '/sys/perm/list',
        checkPerms: '/sys/perm/check/perms',
        checkCode: '/sys/perm/check/code',
        add: '/sys/menu/add',
        edit: '/sys/menu/update',
        delete: '/sys/menu/delete'
    },
    dic: {
        list: '/sys/dic/list/p',
        checkCode: '/sys/dic/check/code',
        get: '/sys/dic/get',
        add: '/sys/dic/add',
        edit: '/sys/dic/update',
        editEnable: '/sys/dic/update/enabled',
        delete: '/sys/dic/delete',

        listItem: '/sys/dic/item/list/c',
        checkItemValue: '/sys/dic/item/check/value',
        addItem: '/sys/dic/item/add',
        editItem: '/sys/dic/item/update',
        editItemEnable: '/sys/dic/item/update/enabled',
        deleteItem: '/sys/dic/delete'
    },
    dsTest: {
        list: '/sys/dsTest/list',
        get: '/sys/dsTest/get',
        add: '/sys/dsTest/add',
        edit: '/sys/dsTest/update',
        delete: '/sys/dsTest/delete'
    },
    basic: {
        dept: '/sys/basic/dept',
        role: '/sys/basic/role',
        roleByType: '/sys/basic/roleByType',
        menuByType: '/sys/basic/menuByType',
        menuWithPerm: '/sys/basic/menuWithPerm',
        permsByMenuId: '/sys/basic/permsByMenuId',
        pDic: '/sys/basic/pDic',
        childDicByCode: '/sys/basic/childDicByCode'
    }
}
export default sys

import ajax from '@/utils/ajax'
// 查询部门树
export function doDeptTreeOfBasic() {
    return ajax.get(sys.basic.dept)
}
// 查询角色
export function doRolesOfBasic() {
    return ajax.get(sys.basic.role)
}
// 根据类型查询角色
export function doRoleByTypeOfBasic(type) {
    return ajax.get(sys.basic.roleByType, { type: type })
}
// 查询菜单树
export function doMenusByTypeOfBasic(type = null) {
    return ajax.get(sys.basic.menuByType, { type: type })
}
// 根据菜单id查询权限
export function doMenuWithPermOfBasic() {
    return ajax.get(sys.basic.menuWithPerm)
}
// 查询权限
export function doPermsOfBasic(menuId) {
    return ajax.get(sys.basic.permsByMenuId, { menuId: menuId })
}
// 查询数据字典
export function doPDicOfBasic() {
    return ajax.get(sys.basic.pDic)
}
// 查询数据字典项
export function doCDicOfBasic(code) {
    return ajax.get(sys.basic.childDicByCode, { code: code })
}
