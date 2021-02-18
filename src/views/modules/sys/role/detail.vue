<template>
  <el-form ref="form" :model="curData" label-width="100px" :inline="true" status-icon>
    <el-form-item label="角色编码:" prop="code">
      {{ curData.code }}
    </el-form-item>
    <el-form-item label="角色名称:" prop="name">
      {{ curData.name }}
    </el-form-item>
    <el-form-item label="用户类型:" prop="type">
      {{ curData.type == "0"? '普通用户' : '' }}
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      {{ curData.enabled == "0"? '禁用' : '启用' }}
    </el-form-item>
    <el-form-item class="formDialogBtn">
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import detailMixin from '@/mixins/detail.mixin'
export default {
    mixins: [detailMixin],
    data() {
        return {
        }
    }
}
</script>
