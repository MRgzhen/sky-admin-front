<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="字典编码:" prop="code">
      <el-input v-model.trim="curData.code" placeholder="请输入字典编码" disabled />
    </el-form-item>
    <el-form-item label="字典项值:" prop="value">
      <el-input v-model.trim="curData.value" placeholder="请输入字典项值" />
    </el-form-item>
    <el-form-item label="字典项名称:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入字典项名称" />
    </el-form-item>
    <el-form-item label="默认项:" prop="isDefault">
      <el-radio-group v-model="curData.isDefault">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      <el-switch v-model="curData.enabled" active-color="#409EFF" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item label="排序:" prop="sort">
      <el-input-number v-model.number.trim="curData.sort" controls-position="right" :step="1" :min="1" :max="999" />
    </el-form-item>
    <el-form-item label="备注:" prop="remark">
      <el-input v-model.trim="curData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="30" show-word-limit />
    </el-form-item>
    <el-form-item class="formDialogBtn">
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import itemRules from './itemRules'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: itemRules(this),
            addApi: this.$api.sys.dic.addItem,
            editApi: this.$api.sys.dic.editItem
        }
    }
}
</script>
