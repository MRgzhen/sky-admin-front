let _this_
const getData = () => _this_.curData || _this_.curData
const deptNameCheck = (rule, value, callback) => {
    _this_.$ajax.get(_this_.$api.sys.dept.checkDeptName, { deptName: getData().deptName, id: getData().id }, true).then(result => {
        if (result.bean > 0) {
            callback('部门名称已存在')
        } else {
            callback()
        }
    }).catch(() => {
        callback('获取部门名称异常')
    })
}
export default (context) => {
    _this_ = context
    return {
        type: [
            { required: true, message: '请选择部门类型', trigger: 'blur' }
        ],
        deptName: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { validator: deptNameCheck, trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blue' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围0到999', trigger: 'blue' }
        ]
    }
}
