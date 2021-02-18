<template>
  <el-form ref="form" :model="curData" label-width="100px" :inline="true" status-icon size="small">
    <el-form-item label="用户名:" prop="userName">
      {{ curData.userName }}
    </el-form-item>
    <el-form-item label="昵称:" prop="nickName">
      {{ curData.nickName }}
    </el-form-item>
    <el-form-item label="部门:" prop="deptName">
      {{ curData.deptName }}
    </el-form-item>
    <el-form-item label="用户类型:" prop="type">
      {{ curData.type == "0"? '普通用户' : '' }}
    </el-form-item>
    <el-form-item label="系统用户:" prop="deptName">
      {{ curData.isSys == 1? '是' : '否' }}
    </el-form-item>
    <el-form-item label="性别:" prop="sex" class="formInline">
      <template v-for="(item,index) in userSexs">
        <span
          v-if="curData.sex === item.value"
          :key="index"
          :label="item.label"
          :value="+item.value"
        >{{ item.label }}</span>
      </template>

    </el-form-item>
    <el-form-item label="生日:" prop="birthday">
      {{ curData.birthday }}
    </el-form-item>
    <el-form-item label="手机号:" prop="phone">
      {{ curData.phone }}
    </el-form-item>
    <el-form-item label="邮箱:" prop="eamil">
      {{ curData.eamil }}
    </el-form-item>
    <el-form-item label="密码有效期:" prop="passwordValid">
      {{ curData.passwordValid }}
    </el-form-item>
    <el-form-item label="状态:" prop="enabled">
      {{ curData.enabled == "0"? '禁用' : '启用' }}
    </el-form-item>
    <el-form-item label="关联角色:" prop="roleName">
      {{ curData.roleName }}
    </el-form-item>
    <el-form-item>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import detailMixin from '@/mixins/detail.mixin'
import { doCDicOfBasic } from '@/api/sys'
export default {
    mixins: [detailMixin],
    data() {
        return {
            // 下拉框
            userSexs: []
        }
    },
    mounted() {
        // 用户性别
        doCDicOfBasic(this.$constant.DIC_CODE.SYSTEM_SEX).then(result => {
            this.userSexs = result.bean
        })
    }

}
</script>
