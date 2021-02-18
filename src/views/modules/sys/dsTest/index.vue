<template>
  <table-view>
    <el-form
      ref="form"
      slot="formSlot"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item class="formQueryBtn">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleRest">重置</el-button>
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
      stripe
      checkbox
      height="100%"
      size="mini"
      width="100%"
      border
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="数据权限测试" width="220" />
      <el-table-column prop="updateTime" label="更新时间" width="200" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-document" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row)">删除</el-button>
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
        Add: () => import('./add')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.dsTest.list,
            title: '数据权限测试'
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({})
            } else {
                this.handleAdd(row)
            }
        }
    }
}
</script>
