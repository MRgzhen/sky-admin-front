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
      <el-input v-model.trim="curData.code" placeholder="请输入字典编码" />
    </el-form-item>
    <el-form-item label="字典名称:" prop="label">
      <el-input v-model.trim="curData.label" placeholder="请输入字典名称" />
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      <el-switch v-model="curData.enabled" active-color="#409EFF" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item label="类型:" prop="type">
      <el-radio-group v-model="curData.type">
        <el-radio label="0">自定义</el-radio>
        <el-radio label="1">预定义</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序:" prop="sort">
      <el-input-number v-model.number="curData.sort" controls-position="right" :step="1" :min="1" :max="999" />
    </el-form-item>
    <el-form-item label="备注:" prop="remark">
      <el-input
        v-model.trim="curData.remark"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        maxlength="30"
        show-word-limit
      />
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
            addApi: this.$api.sys.dic.add,
            editApi: this.$api.sys.dic.edit
        }
    }
}
</script>
