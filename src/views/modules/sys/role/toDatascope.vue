<template>
  <el-form
    ref="form"
    :model="curData"
    status-icon
    class="no_inline-form"
    size="small"
  >
    <el-form-item label="角色名称:" prop="name">
      <el-input v-model.trim="curData.name" disabled />
    </el-form-item>
    <el-form-item label="数据权限:" prop="dataScope">
      <el-select
        v-model="curData.dataScope"
        placeholder="请选择数据权限"
        size="small"
        clearable
        @change="handleChange"
      >
        <el-option label="本人" value="1" />
        <el-option label="本部门" value="2" />
        <el-option label="本部门及下级部门" value="3" />
        <el-option label="全部" value="4" />
        <el-option label="自定义数据权限" value="5" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="dataScoped" class="toDatascopeClass">
      <el-row>
        <el-col :span="18" style="overflow: auto;height: 280px;border: 1px solid  #eaeefb;">
          <el-tree
            ref="tree"
            :data="depts"
            show-checkbox
            highlight-current
            :default-checked-keys="leafDepts"
            node-key="id"
            :check-strictly="!choose3"
            :default-expand-all="choose1"
          />
        </el-col>
        <el-col :span="4" :offset="1">
          <el-checkbox v-model="choose1" @change="handlerChoose1">展开/折叠</el-checkbox>
          <el-checkbox
            v-model="choose2"
            style="margin-top:15px;"
            @change="handlerChoose2"
          >全选/不选</el-checkbox>

          <el-checkbox v-model="choose3" style="margin-top:15px;" @change="handlerChoose3">父子联动</el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
      <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import { doDeptTreeOfBasic } from '@/api/sys'

export default {
    name: '',
    mixins: [edtiMixin],
    props: {
        editData: {
            type: Object,
            default: () => {
                return null
            }
        }
    },
    data() {
        var check = (rule, value, callback) => {
            if (value === '5') {
                const keys = this.$refs.tree.getCheckedKeys()
                const halfkeys = this.$refs.tree.getHalfCheckedKeys()
                if ([...keys, ...halfkeys].length <= 0) {
                    callback(new Error('请选择自定义数据权限'))
                } else {
                    callback()
                }
            }
        }
        return {
            // 展开/折叠
            choose1: true,
            // 全选/不选
            choose2: false,
            // 父子联动
            choose3: false,
            selected: false,
            depts: [],
            leafDepts: [],
            editApi: this.$api.sys.role.toDataScope,
            rules: {
                dataScope: [
                    { required: true, message: '数据权限不能为空' },
                    { validator: check, trigger: 'blue' }
                ]
            },

            // 下拉框
            deptTrees: []
        }
    },
    computed: {
        dataScoped() {
            console.log(this.selected)
            return this.selected
        }
    },
    mounted() {
        if (this.curData.id != null && this.curData.dataScope === '5') {
            this.doRoleOfDataScope()
            this.selected = false
        }
    },
    methods: {
        handlerChoose1() {
            var nodes = this.$refs.tree.store.nodesMap
            for (var i in nodes) {
                nodes[i].expanded = this.choose1
            }
        },
        handlerChoose2() {
            if (this.choose2) {
                this.$refs.tree.setCheckedNodes(this.depts)
            } else {
                this.$refs.tree.setCheckedKeys([])
            }
        },
        handlerChoose3() {
        },
        handleChange(val) {
            if (val === '5') {
                doDeptTreeOfBasic().then(result => {
                    this.deptTrees = result.bean
                    this.depts = [...this.deptTrees]
                    this.selected = true
                })
            } else {
                this.depts = []
                this.leafDepts = []
                this.selected = false
                this.choose1 = false
                this.choose2 = false
            }
        },
        resetEditParams(params) {
            if (params.dataScope === '5') {
                const keys = this.$refs.tree.getCheckedKeys()
                params = { ...params, ...{ deptIds: [...keys] }}
            }
            return params
        },
        doRoleOfDataScope() {
            this.$ajax
                .get(this.$api.sys.role.ofDataScope, { id: this.curData.id })
                .then(result => {
                    if (result.bean && result.bean.length > 0) {
                        this.leafDepts = result.bean
                            // .filter(dept => dept.leaf === '1')
                            .map(menu => menu.id)
                    } else {
                        this.leafDepts = []
                    }
                    this.handleChange(this.curData.dataScope)
                })
        }
    }
}
</script>

<style scoped lang="scss">
    .treeBody {
        height: 350px;
        border: 1px solid #dcdfe6;
        height: 350px;
        padding: 5px 15px;
        margin-right: 15px;
        margin-bottom: 10px;
    }

    .toDatascopeClass {
        margin-left:100px!important;
    }

</style>
