let _this_
const getData = () => _this_.curData || _this_.curData
const rolesCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.sys.role.check, { code: getData().code, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback('角色编码已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取角色编码异常')
    })
}
export default function(context) {
    _this_ = context
    return {
        code: [
            { required: true, message: '请输入角色编码', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '角色编码只能是数字、字母或下划线', trigger: 'blur' },
            { validator: rolesCheck, trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        enabled: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ]
    }
}
