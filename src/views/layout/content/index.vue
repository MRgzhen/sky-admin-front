<template>
  <el-main>
    <breadcrumb v-if="mobile" />
    <tab v-else />
  </el-main>

</template>

<script>
import breadcrumb from './breadcrumb/index'
import tab from './tab/index'
export default {
    components: {
        breadcrumb,
        tab
    },
    data() {
        return { activeName: 'first' }
    },
    computed: {
        mobile() {
            return this.$store.getters.mobile
        }
    }
}
</script>
