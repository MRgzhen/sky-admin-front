<template>
  <el-form
    ref="form"
    :model="curData"
    :inline="true"
    :rules="rules"
    status-icon
    size="small"
    class="inline-form"
  >
    <el-form-item label="角色编码:" prop="code">
      <el-input v-model.trim="curData.code" placeholder="请输入角色编码，如：数字字符_-" clearable />
    </el-form-item>
    <el-form-item label="角色名称:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入角色名称" clearable />
    </el-form-item>
    <el-form-item label="用户类型:" prop="type">
      <el-select v-model="curData.type" placeholder="请选择用户类型" clearable :disabled="curData.id != null">
        <el-option label="普通用户" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      <el-switch v-model="curData.enabled" active-color="#409EFF" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import rules from './rules'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.sys.role.add,
            editApi: this.$api.sys.role.edit
        }
    }
}
</script>
