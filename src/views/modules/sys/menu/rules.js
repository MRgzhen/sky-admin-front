let _this_
const getData = () => _this_.curData || _this_.curData
const permsCheck = (rule, value, callback) => {
    if (!getData().perms) {
        callback()
        return
    }
    _this_.$ajax.get(_this_.$api.sys.menu.checkPerms, { perms: getData().perms, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback(new Error('权限标识已存在'))
        } else {
            callback()
        }
    }).catch(() => {
        callback(new Error('获取权限标识异常'))
    })
}
export default (context) => {
    _this_ = context
    return {
        parentId: [
            { required: true, message: '请输入上级菜单', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        path: [
            { required: true, message: '请输入路由地址', trigger: 'blur' },
            { max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        component: [
            { required: true, message: '请输入组件路径', trigger: 'blur' },
            { max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        perms: [
            { pattern: /^[a-zA-Z:]+$/, message: '权限标识格式不正确', trigger: 'blur' },
            { max: 100, message: '长度在 0 到 30 个字符', trigger: 'blur' },
            { validator: permsCheck, trigger: 'blur' }
        ],
        icon: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blur' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围1到999', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择菜单类型', trigger: 'blur' }
        ],
        enabled: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ]
    }
}
