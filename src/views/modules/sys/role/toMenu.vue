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
    <el-form-item class="toMenuClass">
      <el-row>
        <el-col :span="18" style="overflow: auto;height: 280px;border: 1px solid  #eaeefb;">
          <el-tree
            ref="tree"
            :data="menuWithPerm"
            show-checkbox
            highlight-current
            :default-checked-keys="leafMenus"
            node-key="id"
            :default-expand-all="choose1"
          />
        </el-col>
        <el-col :span="4" :offset="1">
          <el-checkbox v-model="choose1" @change="handlerChoose1">展开/折叠</el-checkbox>
          <el-checkbox v-model="choose2" style="margin-top:15px;" @change="handlerChoose2">全选/不选</el-checkbox>
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
import { doMenuWithPermOfBasic } from '@/api/sys'
export default {
    mixins: [edtiMixin],
    data() {
        return {
            choose1: true,
            choose2: false,
            leafMenus: [],
            editApi: this.$api.sys.role.toMenus,

            // 下拉框
            menuWithPerm: []
        }
    },
    computed: {
    },
    mounted() {
        doMenuWithPermOfBasic().then(result => {
            this.menuWithPerm = result.bean
        })
        this.$nextTick(() => {
            if (this.curData.id != null) {
                this.doRoleOfMenus()
            }
        })
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
                this.$refs.tree.setCheckedNodes(this.menuWithPerm)
            } else {
                this.$refs.tree.setCheckedKeys([])
            }
        },
        doRoleOfMenus() {
            this.$ajax.get(this.$api.sys.role.ofMenus, { id: this.curData.id }).then(result => {
                this.leafMenus = result.bean.filter(menu => menu.leaf === '1').map(menu => menu.id)
            })
        },
        resetEditParams(params) {
            const keys = this.$refs.tree.getCheckedKeys()
            const halfkeys = this.$refs.tree.getHalfCheckedKeys()
            params = { ...params, ...{ menuIds: [...keys, ...halfkeys] }}
            return params
        }
    }
}
</script>

<style scoped lang="scss">

    .treeBody {
        height:350px;
        border: 1px solid #DCDFE6;
        height: 350px;
        padding: 5px 15px;
        margin-right:15px;
        margin-bottom: 10px;
    }
    .toMenuClass {
        margin-left: 100px!important;
    }

</style>

