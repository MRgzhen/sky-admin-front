let _this_
const getData = () => _this_.curData || _this_.curData
const usersCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.sys.user.check, { userName: getData().userName, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback(new Error('用户名已存在'))
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取用户名异常')
    })
}
export default function(context) {
    _this_ = context
    return {
        userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 30, message: '用户名长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '用户名只能是数字、字母、横线或下划线', trigger: 'blur' },
            { validator: usersCheck, trigger: 'blur' }
        ],
        nickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 30, message: '昵称长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        deptId: [
            { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        birthday: [
            { required: true, message: '请选择密码有效期', trigger: 'blur' }
        ],
        passwordValid: [
            { required: true, message: '请选择密码有效期', trigger: 'blur' }
        ],
        sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
        ],
        enabled: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        phone: [
            { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        eamil: [
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        roleIds: [
            { required: true, message: '请选择角色', trigger: 'blur' }
        ]
    }
}
