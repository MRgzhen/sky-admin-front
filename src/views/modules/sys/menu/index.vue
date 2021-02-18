<template>
  <table-view>
    <el-form
      slot="formSlot"
      ref="form"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请选择名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleRest">重置</el-button>
      </el-form-item>
    </el-form>

    <div slot="btnBeforeSlot">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCustomAdd">新增</el-button>
    </div>
    <div slot="btnAfterSlot" />

    <el-table slot="tableSlot" v-loading="loading" :data="selects" stripe height="100%" size="mini" row-key="id" width="100%" border :tree-props="{children: 'children'}">
      <el-table-column prop="name" label="菜单名称" width="220" />
      <el-table-column prop="type" label="菜单类型" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==0" type="danger">目录</el-tag>
          <el-tag v-if="scope.row.type==1">菜单</el-tag>
          <el-tag v-if="scope.row.type==2" type="success">按钮</el-tag>
          <el-tag v-if="scope.row.type==3" type="warning">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由地址" width="220" />
      <el-table-column prop="component" label="组件路径" width="220" />
      <el-table-column prop="icon" label="图标" width="180" />
      <el-table-column prop="perms" label="权限标识" width="180" />
      <el-table-column prop="enabled" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#409EFF"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            @change="handleChange($event,scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column label="操作" fixed="right" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <dialog-view slot="other" ref="dialogRef" :title="dialogParams.title" :width="dialogParams.width">
      <template slot="dialogSlot">
        <component :is="dialogParams.componentName" :edit-data="editRow" @submitSuccess="handleSearch" />
      </template>
    </dialog-view>
  </table-view>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
export default {
    components: {
        Add: () => import('./add')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.menu.list,
            deleteApi: this.$api.sys.menu.delete,
            form: {
                name: ''
            },
            selects: []
        }
    },
    watch: {
        tableData() {
            this.selects = []
            if (!this.form.name) {
                this.selects = [...this.tableData]
            } else {
                if (this.tableData && this.tableData.length > 0) {
                    this.searchTree(this.form.name, this.tableData)
                } else {
                    this.selects.push({})
                }
            }
        }
    },
    methods: {
        handleChange(status, val) {
            val.enabled = status
            this.$ajax.post(this.$api.sys.menu.editEnable, val).then(result => {
                this.handleSearch()
            })
        },
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd(
                    { type: '0',
                        parentId: null,
                        name: null,
                        component: null,
                        enabled: '1',
                        path: null,
                        perms: null,
                        icon: null,
                        sort: 1
                    }
                )
            } else {
                this.handleAdd(row)
            }
        },
        searchTree(val, trees) {
            for (let i = 0; i < trees.length; i++) {
                if (trees[i].name.indexOf(val) !== -1) {
                    this.selects.push({ ...trees[i] })
                    continue
                }
                if (trees[i].children && trees[i].children.length > 0) {
                    this.searchTree(val, trees[i].children)
                }
            }
        }
    }
}
</script>
