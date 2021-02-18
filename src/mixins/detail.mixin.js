export default {
    data() {
        return {
            // 页面数据
            curData: {}
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
        }
    },
    watch: {
        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        editData: {
            handler: function(val, oldVal) {
                this.curData = { ...this.editData }
            },
            immediate: true
        }
    }
}
