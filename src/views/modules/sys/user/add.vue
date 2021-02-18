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
    <el-form-item label="用户名:" prop="userName">
      <el-input v-model.trim="curData.userName" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="昵称:" prop="nickName">
      <el-input v-model.trim="curData.nickName" placeholder="请输入昵称" clearable />
    </el-form-item>
    <template v-if="!curData.id || curData.isSys==='0'">
      <el-form-item label="部门:" prop="deptId">
        <el-select-tree
          v-model="curData.deptId"
          clearable
          default-expand-all
          check-strictly
          :popover-min-width="200"
          :data="deptTrees"
          placeholder="请选择部门"
        />
      </el-form-item>
      <el-form-item label="用户类型:" prop="type">
        <el-select
          v-model="curData.type"
          placeholder="请选择用户类型"
          clearable
          @change="handleChange"
        >
          <el-option label="普通用户" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色:" prop="roleIds">
        <el-select
          v-model="curData.roleIds"
          placeholder="请选择角色"
          multiple
          filterable
          clearable
        >
          <el-option
            v-for="(item,index) in roleByTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.enabled==0"
          />
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="生日:" prop="birthday">
      <el-date-picker
        v-model="curData.birthday"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="birthdayValidPickerOptions"
        clearable
      />
    </el-form-item>
    <el-form-item label="密码有效期:" prop="passwordValid">
      <el-date-picker
        v-model="curData.passwordValid"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="passwordValidPickerOptions"
        clearable
      />
    </el-form-item>
    <el-form-item label="性别:" prop="sex" class="formInline">
      <el-radio-group v-model="curData.sex">
        <el-radio
          v-for="(item,index) in userSexs"
          :key="index"
          :label="item.value"
        >{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      <el-switch
        v-model="curData.enabled"
        active-color="#409EFF"
        active-value="1"
        inactive-value="0"
      />
    </el-form-item>
    <el-form-item label="手机号:" prop="phone">
      <el-input v-model.trim="curData.phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item label="邮箱:" prop="eamil">
      <el-input v-model.trim="curData.eamil" placeholder="请输入邮箱" clearable />
    </el-form-item>
    <el-form-item label="备注:" prop="remark">
      <el-input
        v-model.trim="curData.remark"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        maxlength="30"
        show-word-limit
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import rules from './rules'
import { doDeptTreeOfBasic, doRoleByTypeOfBasic, doCDicOfBasic } from '@/api/sys'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.sys.user.add,
            editApi: this.$api.sys.user.edit,
            passwordValidPickerOptions: {
                disabledDate(time) {
                    return time.getTime() <= Date.now()
                }
            },
            birthdayValidPickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },

            // 下拉框
            deptTrees: [],
            roleByTypes: [],
            userSexs: []
        }
    },
    computed: {
    },
    mounted() {
        this.initDatas()
    },
    methods: {
        initDatas() {
            // 部门下拉框
            doDeptTreeOfBasic().then(result => {
                this.deptTrees = result.bean
            })
            // 数据字典用户性别
            doCDicOfBasic(this.$constant.DIC_CODE.SYSTEM_SEX).then(result => {
                this.userSexs = result.bean
            })

            if (this.curData.id) {
                doRoleByTypeOfBasic(this.curData.type).then(result => {
                    this.roleByTypes = result.bean
                })
                this.doUserOfRoles()
            }
        },
        doUserOfRoles() {
            this.$ajax
                .get(this.$api.sys.user.ofRoles, { id: this.curData.id })
                .then(result => {
                    this.curData.roleIds = [...result.bean]
                })
        },
        handleChange(val) {
            this.curData.roleIds = []
            doRoleByTypeOfBasic(val).then(result => {
                this.roleByTypes = result.bean
            })
        }
    }
}
</script>
