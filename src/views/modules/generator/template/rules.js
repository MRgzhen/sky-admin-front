export default function(context) {
    return {
        name: [
            { required: true, message: '请输入模板名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_\$\{\}.]+$/, message: '模板格式不正确', trigger: 'blur' }
        ],
        moduleName: [
            { required: true, message: '请输入模块名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_\$\{\}.]+$/, message: '模块名格式不正确', trigger: 'blur' }
            // { pattern: /^[a-zA-Z0-9.]+$/, message: '模块名只能是数字、字母或句号', trigger: 'blur' }
        ],
        content: [
            { min: 1, max: 5000, message: '长度在 1 到 5000 个字符', trigger: 'blur' }
        ]
    }
}
