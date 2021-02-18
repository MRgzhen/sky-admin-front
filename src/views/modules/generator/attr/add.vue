<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="参数名称:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入参数名称，如：数字字符_-" />
    </el-form-item>
    <el-form-item label="参数值:" prop="value">
      <el-input v-model.trim="curData.value" placeholder="请输入参数值" />
    </el-form-item>
    <el-form-item label="排序:" prop="sort">
      <el-input-number
        v-model.number="curData.sort"
        controls-position="right"
        :step="1"
        :min="1"
        :max="999"
      />
    </el-form-item>
    <el-form-item label="描述:" prop="remark">
      <el-input
        v-model.trim="curData.remark"
        placeholder="请输入描述"
        type="textarea"
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
            addApi: this.$api.generator.attr.add,
            editApi: this.$api.generator.attr.edit
        }
    }
}
</script>
