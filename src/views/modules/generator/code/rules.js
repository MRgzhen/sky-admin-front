export default function(context) {
    return {
        templateGroup: [
            { required: true, message: '请输入模板组', trigger: 'blur' }
        ],
        javaPackageName: [
            { required: true, message: '请输入包名', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9.]+$/, message: '包名只能是数字、字母或句号', trigger: 'blur' }
        ],
        javModuleName: [
            { required: true, message: '请输入模块名', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        author: [
            { required: true, message: '请输入作者', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
        ],
        tableNaming: [
            { required: true, message: '请选择表命名规则', trigger: 'blur' }
        ],
        columnNaming: [
            { required: true, message: '请输入列命名规则', trigger: 'blur' }
        ],
        ingoreTablePrefix: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '包名只能是数字、字母或下划线', trigger: 'blur' }
        ]
    }
}
