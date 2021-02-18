<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    size="small"
    class="no_inline-form"
  >
    <el-form-item label="角色:" prop="roleIds" class="formBlock">
      <el-select v-model="curData.roleIds" placeholder="请选择角色" multiple filterable>
        <el-option
          v-for="(item,index) in roleByTypes"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import { doRoleByTypeOfBasic } from '@/api/sys'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: {
                roleIds: [
                    { required: true, message: '请选择角色信息', trigger: ['change'] }
                ]
            },
            editApi: this.$api.sys.user.toRoles,
            curData: {
                roleIds: []
            },

            // 下拉框
            roleByTypes: []
        }
    },
    mounted() {
        this.initDatas()
    },
    methods: {
        // 获取用户所拥有的角色
        doUserOfRoles() {
            this.$ajax.get(this.$api.sys.user.ofRoles, { id: this.curData.id }).then(result => {
                this.curData.roleIds = [...result.bean]
            })
        },
        initDatas() {
            doRoleByTypeOfBasic(this.curData.type).then(result => {
                this.roleByTypes = result.bean
                this.doUserOfRoles()
            })
        }
    }
}
</script>

