export default {
    data() {
        return {
            // table数据
            tableData: [],
            // 是否加载中
            loading: false,
            // 分页
            page: {
                // 当前页
                pageNum: 1,
                // 每页条数
                pageSize: 20,
                // 总数
                total: 0
            },
            // 查询条件
            form: {},
            // 主动触发查询
            activeSerach: true,
            // 载入table数据api
            searchApi: '',
            // 载入table数据请求方式
            searchMethd: 'get',
            // 删除数据api
            deleteApi: '',
            // 批量删除数据
            deleteBatchData: [],
            // 对话框标题
            title: '',
            // 新增修改组件
            editCom: 'Add',
            // 明细组件
            detailCom: 'Detail',
            // 对话框参数
            dialogParams: {
                componentName: '',
                title: '',
                width: ''
            },
            // 编辑的数据
            editRow: {},
            // 查询条件折叠展开
            opened: false
        }
    },
    methods: {
        handleSizeChange(val) {
            // 设置每页条数
            this.page.pageSize = val
            this.handleSearch(1)
        },
        handleCurrentChange(val) {
            // 设置当前页数
            this.page.pageNum = val
            this.handleSearch(val)
        },
        handleRest() {
            this.$refs.form.resetFields()
        },
        handleSearch(pageNum) {
            if (this.searchApi && this.activeSerach) {
                // 加载中
                this.loading = true
                // 封装参数
                const search = { ...this.page, ...this.form }
                // 重新设置参数
                const params = this.resetSearchParams && this.resetSearchParams(search) || search
                // 移除总数
                delete params['total']
                // 请求
                this.$ajax[this.searchMethd](this.searchApi, params).then(result => {
                    if (result.bean.total || result.bean.records) {
                        // 数据总数
                        this.page.total = result.bean.total
                        // 赋值
                        this.tableData = [...result.bean.records] || []
                    } else {
                        // 赋值
                        this.tableData = result.bean || []
                    }
                    // 关闭加载
                    this.loading = false
                    // 加载成功处理
                    this.searchSuccessHandler && this.searchSuccessHandler()
                }).catch(() => { this.loading = false })
            }
        },
        handleDel(row) {
            // 是否需要删除
            if (this.deleteApi) {
                const ids = [row.id]
                this.doDeleteData(ids)
            }
        },
        handleBatchDel() {
            // 是否需要删除
            if (this.deleteApi) {
                if (this.deleteBatchData.length < 1) {
                    this.$MessageN.warning('请选择要删除的数据')
                    return
                }
                this.doDeleteData(this.deleteBatchData)
            }
        },
        doDeleteData(data) {
            this.$confirm('确定要删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 重新设置参数
                this.$ajax['post'](this.deleteApi, { ids: data }).then(result => {
                    // 加载成功处理
                    this.deleteSuccessHandler && this.deleteSuccessHandler()
                    this.handleSearch()
                    this.$MessageN.success(result.msg)
                }).catch((error) => {
                    console.log(error)
                })
            }).catch(() => {
            })
        },
        handleAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.editRow = {}
            } else {
                this.editRow = row || {}
            }

            // 存在则为编辑，否则为新增
            if (this.editRow.id) {
                this.dialogParams.componentName = this.editCom
                this.dialogParams.title = this.title && '修改' + this.title || '修改'
            } else {
                this.dialogParams.componentName = this.editCom
                this.dialogParams.title = this.title && '新增' + this.title || '新增'
            }
            this.dialogParams.width = '700px'
            this.$refs.dialogRef.show()
        },
        handleDetail(row) {
            this.editRow = row || {}
            this.dialogParams.componentName = this.detailCom
            this.dialogParams.title = this.title && '查看' + this.title || '查看'
            this.dialogParams.width = '700px'
            this.$refs.dialogRef.show()
        },
        doInitDialog(row, componentName, title, width) {
            this.editRow = row || {}
            this.dialogParams.componentName = componentName
            this.dialogParams.title = title
            if (!width) {
                this.dialogParams.width = '700px'
            } else {
                this.dialogParams.width = width
            }
            this.$refs.dialogRef.show()
        }
    },
    mounted() {
        this.handleSearch()
    }
}
