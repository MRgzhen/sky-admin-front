export default {
    data() {
        return {
            // 页面编辑数据
            curData: {},
            // 提交控制
            loading: false,
            // 新增api
            addApi: '',
            // 新增方法
            addMethod: 'post',
            // 修改api
            editApi: '',
            // 修改方法
            editMethod: 'post'
        }
    },
    props: {
        editData: {
            type: Object,
            default: {}
        }
    },
    methods: {
        handleCancel() {
            this.$parent.hide()
        },
        handleSubmit() {
            if (this.loading) {
                return
            }
            this.loading = true
            this.$refs.form.validate(valid => {
                if (valid) {
                    let api = this.addApi
                    let apiMethod = this.addMethod
                    if (this.curData.id) {
                        api = this.editApi
                        apiMethod = this.editMethod
                    }
                    const params = this.resetEditParams && this.resetEditParams(this.curData) || this.curData
                    this.$ajax[apiMethod](api, params).then(result => {
                        this.$emit('submitSuccess')
                        this.$message({
                            message: result.msg,
                            type: 'success'
                        })
                        this.loading = false
                        this.handleCancel()
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    this.loading = false
                }
            })
        }
    },
    watch: {
        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        editData: {
            handler: function() {
                this.curData = { ...this.editData }
            },
            immediate: true
        }
    }
}
