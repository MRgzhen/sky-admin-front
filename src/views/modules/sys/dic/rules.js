let _this_
const getData = () => _this_.curData || _this_.curData
const codeCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.sys.dic.checkCode, { id: getData().id, code: getData().code }, true).then(result => {
        if (result.bean > 0) {
            callback('字典编码已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取字典编码异常')
    })
}
export default (context) => {
    _this_ = context
    return {
        code: [
            { required: true, message: '请输入字典编码', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '字典编码格式不正确', trigger: 'blur' },
            { validator: codeCheck, trigger: 'blur' }
        ],
        label: [
            { required: true, message: '请输入字典名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        enabled: [
            { required: true, message: '请输入状态', trigger: 'blue' }
        ],
        type: [
            { required: true, message: '请输入字典类型', trigger: 'blue' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blue' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围0到999', trigger: 'blue' }
        ],
        remark: [
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
        ]
    }
}
