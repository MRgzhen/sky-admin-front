let _this_
const getData = () => _this_.curData || _this_.curData
const nameCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.generator.attr.checkName, { name: getData().name, id: getData().id, templateGroupId: getData().templateGroupId }, true).then(result => {
        if (result.bean > 0) {
            callback('参数名称已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取参数名称异常')
    })
}
export default function(context) {
    _this_ = context
    return {
        name: [
            { required: true, message: '请输入参数名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z]+$/, message: '参数名称只能是字母', trigger: 'blur' },
            { validator: nameCheck, trigger: 'blur' }
        ],
        value: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blue' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围0到999', trigger: 'blue' }
        ]
    }
}
