<template>
  <el-form
    ref="form"
    :model="curData"
    :rules="rules"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="上级部门:" prop="parentId">
      <el-select-tree
        v-model="curData.parentId"
        default-expand-all
        check-strictly
        placeholder="请选择上级部门"
        :popover-min-width="200"
        :data="deptTrees"
        :disabled-values="disabledValues"
        clearable
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="部门类型:" prop="type">
      <el-select
        v-model="curData.type"
        placeholder="请选择部门类型"
        clearable
      >
        <el-option
          v-for="(item,index) in customDeptTypes"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="名称:" prop="deptName">
      <el-input v-model.trim="curData.deptName" placeholder="请输入部门名称" />
    </el-form-item>
    <el-form-item label="排序:" prop="sort">
      <el-input-number
        v-model.number.trim="curData.sort"
        controls-position="right"
        :step="1"
        :min="1"
        :max="999"
      />
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
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import rules from './rules'
import { doDeptTreeOfBasic, doCDicOfBasic } from '@/api/sys'

export default {
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.sys.dept.add,
            editApi: this.$api.sys.dept.edit,
            customDeptTypes: [],
            disabledValues: [],

            // 下拉框
            deptTrees: [],
            deptTypes: []
        }
    },
    mounted() {
        // 查询部门树
        doDeptTreeOfBasic().then(result => {
            this.deptTrees = result.bean

            // 修改操作，上级部门为当前节点及其子节点不可选
            if (this.curData.id) {
                this.doChange(this.deptTrees)
            }
        })

        // 编辑时初始化数据
        doCDicOfBasic(this.$constant.DIC_CODE.SYSTEM_DEPT).then(result => {
            this.deptTypes = [...result.bean]
            if (this.curData.id) {
                this.customDeptTypes = this.getDeptTypes(this.curData.id)
            } else {
                this.customDeptTypes = [...result.bean]
            }
        })
    },
    methods: {
        handleChange(val) {
            // 1.重置部门类型和部门类型下拉列表数据
            this.curData.type = null
            this.customDeptTypes = []

            // 2.查询根据当前父部门类型查询对应该部门可以选择的部门类型
            this.getDeptTypes(val)
        },
        async getDeptTypes(val) {
            let dept = {}
            await this.$ajax.get(this.$api.sys.dept.get, { id: val }).then(result => {
                dept = { ...result.bean }
            })
            doDeptTreeOfBasic().then(result => {
                this.deptTrees = result.bean
                for (let i = 0; i < this.deptTypes.length; i++) {
                    if (this.deptTypes[i].value === dept.type) {
                        if (i < this.deptTypes.length) {
                            this.customDeptTypes = this.deptTypes.slice(i, this.deptTypes.length)
                        }
                        return
                    }
                }
            })
        },
        doChange(childs) {
            childs.forEach(item => {
                if (this.curData.id && item.id === this.curData.id) {
                    this.disabledValues.push(item.id)
                    this.doDisabledChange(item.children)
                } else {
                    this.doChange(item.children)
                }
            })
        },
        doDisabledChange(childs) {
            childs.forEach(item => {
                this.disabledValues.push(item.id)
                this.doDisabledChange(item.children)
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>
