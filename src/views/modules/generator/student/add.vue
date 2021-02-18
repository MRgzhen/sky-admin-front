<template>
  <el-form ref="form" :model="curData" label-width="100px" :inline="true" status-icon>
    <el-form-item label="主键:" prop="name">
      <el-input v-model.trim="curData.id" placeholder="请输入主键" size="small" />
    </el-form-item>
    <el-form-item label="名字:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入名字" size="small" />
    </el-form-item>
    <el-form-item label="学号:" prop="name">
      <el-input v-model.trim="curData.no" placeholder="请输入学号" size="small" />
    </el-form-item>
    <el-form-item label="年龄:" prop="name">
      <el-input v-model.trim="curData.age" placeholder="请输入年龄" size="small" />
    </el-form-item>
    <el-form-item label="住址:" prop="name">
      <el-input v-model.trim="curData.address" placeholder="请输入住址" size="small" />
    </el-form-item>
    <el-form-item class="formDialogBtn">
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            addApi: this.$api.generator.student.add,
            editApi: this.$api.generator.student.edit
        }
    }
}
</script>
