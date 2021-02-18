<template>
  <table-view>
    <el-form
      ref="form"
      slot="formSlot"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code" placeholder="请选择编码" clearable />
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="请选择名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
        <el-button size="mini" @click="handleRest">重置</el-button>
      </el-form-item>
    </el-form>

    <template slot="btnBeforeSlot">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCustomAdd">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleBatchDel">删除</el-button>
    </template>
    <template slot="btnAfterSlot" />

    <el-table
      slot="tableSlot"
      v-loading="loading"
      :data="tableData"
      checkbox
      height="100%"
      width="100%"
      size="mini"
      border
      @selection-change="handleTableCheckbox"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="code" label="角色编码" width="220" />
      <el-table-column prop="name" label="角色名称" width="220" />
      <el-table-column prop="type" label="用户类型" width="220">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='0'">普通用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="userCnt" label="关联用户数量" width="200" />
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
      <el-table-column prop="updateTime" label="更新时间" width="200" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-document" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleToMenu(scope.row)">分配菜单</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleToDatascope(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      slot="paginationSlot"
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <dialog-view ref="dialogRef" slot="other" :title="dialogParams.title" :width="dialogParams.width">
      <template slot="dialogSlot">
        <component
          :is="dialogParams.componentName"
          :edit-data="editRow"
          @submitSuccess="handleSearch"
        />
      </template>
    </dialog-view>
  </table-view>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
export default {
    components: {
        Add: () => import('./add'),
        Detail: () => import('./detail'),
        ToMenu: () => import('./toMenu'),
        ToDatascope: () => import('./toDatascope')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.role.list,
            deleteApi: this.$api.sys.role.delete,
            title: '角色',
            form: {
                code: '',
                name: ''
            }
        }
    },
    methods: {
        // 获取table选择项
        handleTableCheckbox(rows) {
            this.deleteBatchData = []
            rows.forEach(item => {
                this.deleteBatchData.push(item.id)
            })
        },
        handleToMenu(row) {
            this.doInitDialog({ id: row.id, code: row.code, name: row.name, dataScope: row.dataScope }, 'ToMenu', '分配菜单')
        },
        handleToDatascope(row) {
            this.doInitDialog({ id: row.id, code: row.code, name: row.name, dataScope: row.dataScope }, 'ToDatascope', '分配权限')
        },
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({ enabled: '1', type: '0' })
            } else {
                this.handleAdd(row)
            }
        },
        handleChange(status, val) {
            val.enabled = status
            this.$ajax.post(this.$api.sys.role.edit, val).then(result => {
                this.handleSearch()
            })
        }
    }
}
</script>
