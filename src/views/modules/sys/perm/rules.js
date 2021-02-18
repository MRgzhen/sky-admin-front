export default function(context) {
    return {
        perms: [
            { pattern: /^[a-zA-Z:]+$/, message: '权限标识格式不正确', trigger: 'blur' },
            { max: 30, message: '长度在 0 到 30 个字符', trigger: 'blue' }
        ],
        name: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        parentId: [
            { required: true, message: '请输入所属菜单', trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入排序', trigger: 'blue' },
            { pattern: /^[0-9]{1,3}$/, message: '必须为数字范围1到999', trigger: 'blue' }
        ],
        type: [
            { required: true, message: '请选择权限类型', trigger: 'blue' }
        ],
        enabled: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ]
    }
}
