const generator = {
    dsSetting: {
        list: '/generator/dsSetting/list',
        checkNickName: '/generator/dsSetting/check/nickName',
        add: '/generator/dsSetting/add',
        edit: '/generator/dsSetting/update',
        delete: '/generator/dsSetting/delete',
        test: '/generator/dsSetting/test',
        listDsTables: '/generator/dsSetting/list/ds/tables'
    },
    attr: {
        list: '/generator/attr/list',
        listTypeToGroup: '/generator/attr/list/typeToGroup',
        checkName: '/generator/attr/check/name',
        add: '/generator/attr/add',
        edit: '/generator/attr/update',
        delete: '/generator/attr/delete'
    },
    templateGroup: {
        list: '/generator/templateGroup/list',
        cheackName: '/generator/templateGroup/check/name',
        add: '/generator/templateGroup/add',
        edit: '/generator/templateGroup/update',
        delete: '/generator/templateGroup/delete'
    },
    template: {
        list: '/generator/template/list',
        get: '/generator/template/get',
        add: '/generator/template/add',
        edit: '/generator/template/update',
        delete: '/generator/template/delete'
    },
    code: {
        new: '/generator/code/new'
    },
    student: {
        list: '/generator/student/list',
        add: '/generator/student/add',
        edit: '/generator/student/update',
        delete: '/generator/student/delete'
    },
    basic: {
        templateGroup: '/generator/basic/templateGroup',
        dsSetting: '/generator/basic/dsSetting'
    }
}
export default generator
import ajax from '@/utils/ajax'
// 查询模板分组
export function doTemplateGroupOfBasic() {
    return ajax.get(generator.basic.templateGroup)
}
// 数据库连接设置
export function doDsSettingOfBasic() {
    return ajax.get(generator.basic.dsSetting)
}
