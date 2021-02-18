<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="数据源昵称:" prop="nickName">
      <el-input v-model.trim="curData.nickName" placeholder="请输入数据源昵称，如：数字字符_-" />
    </el-form-item>
    <el-form-item label="数据源名称:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入数据源名称" />
    </el-form-item>
    <el-form-item label="驱动:" prop="driver">
      <el-input v-model.trim="curData.driver" placeholder="请输入驱动" />
    </el-form-item>
    <el-form-item label="连接地址:" prop="url">
      <el-input v-model.trim="curData.url" placeholder="请输入连接地址" />
    </el-form-item>
    <el-form-item label="用户名:" prop="username">
      <el-input v-model.trim="curData.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model.trim="curData.password" placeholder="请输入密码" />
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
            addApi: this.$api.generator.dsSetting.add,
            editApi: this.$api.generator.dsSetting.edit
        }
    }
}
</script>
