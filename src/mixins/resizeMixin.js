export default {
    data() {
        return {
        }
    },
    methods: {
        resizeHandler() {
            this.$store.state.layout.screenWidth = document.documentElement.clientWidth // 窗口宽度
            this.$store.state.layout.screenHeight = document.documentElement.clientHeight // 窗口高度
            if (this.$store.state.layout.screenWidth < 1100) {
                this.$store.state.layout.sidebar.opened = true
                this.$store.state.layout.mobile = true
            } else {
                this.$store.state.layout.sidebar.drawer = false
                this.$store.state.layout.mobile = false
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    created() {
        this.resizeHandler()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    }
}
