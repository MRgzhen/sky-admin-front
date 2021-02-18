export default function(context) {
    return {
        name: [
            { required: true, message: '请输入角色编码', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '角色编码只能是数字、字母或下划线', trigger: 'blur' }
        ]
    }
}
