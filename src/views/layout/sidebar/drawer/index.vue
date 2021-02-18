<template>
  <el-drawer
    :visible.sync="drawer"
    :with-header="false"
    direction="ltr"
    size="230px"
  >
    <nav-menu />
  </el-drawer>
</template>
<script>
import navMenu from '../navMenu/index.vue'
export default {
    components: {
        navMenu
    },
    data() {
        return {
        }
    },
    computed: {
        drawer: {
            get() {
                return this.$store.getters.drawer
            },
            set(val) {
                this.$store.commit('layout/SET_SIDEBAR')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    /deep/ .el-drawer__body {
        height: 100%!important;
    }
</style>
