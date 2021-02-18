let _this_
const getData = () => _this_.curData || _this_.curData
const nickNameCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.generator.dsSetting.checkNickName,
        { nickName: getData().nickName, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback('数据源昵称已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取数据源昵称异常')
    })
}
export default function(context) {
    _this_ = context
    return {
        name: [
            { required: true, message: '请输入数据源名称', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
        ],
        nickName: [
            { required: true, message: '请输入数据源昵称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '数据源昵称只能是数字、字母或下划线', trigger: 'blur' },
            { validator: nickNameCheck, trigger: 'blur' }
        ],
        driver: [
            { required: true, message: '请输入驱动', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        url: [
            { required: true, message: '请输入连接地址', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
    }
}
