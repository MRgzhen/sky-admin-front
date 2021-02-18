<template>
  <div class="header-userinfo_wrapper">
    <el-form ref="form" label-width="100px" :inline="true" status-icon size="small">
      <el-form-item label="用户名:">
        {{ this.$store.getters.user.username }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    }
}
</script>

<style scoped lang="scss">
    .header-userinfo_wrapper {
        height: 100%;
        padding:10px;
    }
</style>
