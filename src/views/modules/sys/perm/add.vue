<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="权限类型:" prop="type">
      <el-radio-group v-model="curData.type">
        <el-radio label="2">按钮</el-radio>
        <el-radio label="3">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="所属菜单:" prop="parentId">
      <el-select-tree
        v-model="curData.parentId"
        :popover-min-width="200"
        :data="menus"
        styles="height:32px!important"
        check-strictly
        clearable
      />
    </el-form-item>
    <el-form-item label="权限名称:" prop="name">
      <el-input v-model.trim="curData.name" placeholder="请输入权限名称" clearable />
    </el-form-item>
    <el-form-item label="权限标识:" prop="perms">
      <el-input v-model.trim="curData.perms" placeholder="请输入权限标识，如system:user:add" clearable />
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      <el-switch v-model="curData.enabled" active-color="#409EFF" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item label="排序:" prop="sort">
      <el-input-number v-model.number.trim="curData.sort" controls-position="right" :step="1" :min="1" :max="999" />
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
import { doMenusByTypeOfBasic } from '@/api/sys'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.sys.perm.add,
            editApi: this.$api.sys.perm.edit,

            // 下拉框
            menus: []
        }
    },
    mounted() {
        doMenusByTypeOfBasic().then(result => {
            this.menus = result.bean
        })
    }
}
</script>
