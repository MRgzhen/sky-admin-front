<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane name="toMenu">
      <span slot="label"><i class="el-icon-date" /> 分配菜单</span>
      <to-menu v-if="activeName==='toMenu'" :edit-data="editData" @submitSuccess="handleSearch" />
    </el-tab-pane>
    <el-tab-pane name="toDatascope">
      <span slot="label"><i class="el-icon-date" /> 数据权限</span>
      <to-datascope v-if="activeName==='toDatascope'" :edit-data="editData" @submitSuccess="handleSearch" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    name: 'Perm',
    components: {
        ToMenu: () => import('./toMenu'),
        ToDatascope: () => import('./toDatascope')
    },
    props: {
        editData: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        return {
            activeName: 'toMenu'
        }
    },
    methods: {
        handleSearch() {
            this.$emit('submitSuccess')
        }
    }
}
</script>
