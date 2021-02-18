let _this_
const getData = () => _this_.curData || _this_.curData
const nameCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.generator.templateGroup.cheackName, { name: getData().name, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback('组名已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取组名异常')
    })
}
export default function(context) {
    _this_ = context
    return {
        name: [
            { required: true, message: '请输入组名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '组名只能是数字、字母或下划线', trigger: 'blur' },
            { validator: nameCheck, trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blur' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围1到999', trigger: 'blur' }
        ],
        remark: [
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
    }
}
