<template>
  <el-form
    ref="form"
    :model="curData"
    :inline="true"
    :rules="rules"
    status-icon
    size="small"
  >
    <el-form-item label="数据权限测试:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入数据权限测试，如：数字字符_-" />
    </el-form-item>
    <el-form-item class="formDialogBtn">
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
            addApi: this.$api.sys.dsTest.add,
            editApi: this.$api.sys.dsTest.edit
        }
    }
}
</script>
