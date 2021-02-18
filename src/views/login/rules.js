// eslint-disable-next-line no-unused-vars
export default (context) => {
    return {
        username: [
            { required: true, message: '姓名不能为空' }
        ],
        password: [
            { required: true, message: '密码不能为空' }
        ],
        code: [
            { required: true, message: '验证码不能为空' }
        ],
        smsCode: [
            { required: true, message: '验证码不能为空' }
        ]
    }
}
