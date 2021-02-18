<template>
  <table-view>
    <el-form
      ref="form"
      slot="formSlot"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请选择部门名称" clearable />
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
      <el-table-column prop="deptName" label="部门名称" width="220" />
      <el-table-column prop="type" label="部门类型" width="200">
        <template slot-scope="scope">
          <template v-for="(item,index) in deptTypes">
            <span v-if="scope.row.type === item.value" :key="index">{{ item.label }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#ff4949" active-value="1" inactive-value="0" @change="handleChange($event,scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" fixed="right" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      slot="paginationSlot"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      :total="page.total"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <dialog-view ref="dialogRef" slot="other" :title="dialogParams.title" :width="dialogParams.width">
      <template slot="dialogSlot">
        <component :is="dialogParams.componentName" :edit-data="editRow" @submitSuccess="handleSearch" />
      </template>
    </dialog-view>
  </table-view>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { doCDicOfBasic } from '@/api/sys'
export default {
    components: {
        Add: () => import('./add')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.dept.list,
            deleteApi: this.$api.sys.dept.delete,
            title: '组织机构',
            form: {
                name: null
            },
            selects: [],
            // 下拉框
            deptTypes: []
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
    mounted() {
        // 查询部门类型
        doCDicOfBasic(this.$constant.DIC_CODE.SYSTEM_DEPT).then(result => {
            this.deptTypes = result.bean
        })
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({ enabled: '1', sort: 1, parentId: null, type: '' })
            } else {
                this.handleAdd(row)
            }
        },
        handleChange(status, val) {
            val.enabled = status
            const enabledParm = { enabled: status, id: val.id }
            this.$ajax.post(this.$api.sys.dept.editEnable, enabledParm).then(result => {
                this.handleSearch()
            })
        },
        searchTree(val, trees) {
            for (let i = 0; i < trees.length; i++) {
                if (trees[i].deptName.indexOf(val) !== -1) {
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
