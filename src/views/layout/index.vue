<template>
  <el-container>
    <el-header height="$headerHight">
      <s-header />
    </el-header>
    <el-container>
      <s-sidebar />
      <s-content />
    </el-container>
  </el-container>
</template>
<script>
import SSidebar from './sidebar/index.vue'
import SHeader from './header/index.vue'
import SContent from './content/index.vue'
export default {
    components: {
        SSidebar,
        SHeader,
        SContent
    },
    data() {
        return {
        }
    }
}
</script>
