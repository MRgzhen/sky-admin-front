<template>
  <table-view>
    <el-form ref="form" slot="formSlot" :model="form" label-width="100px" :inline="true">
      <el-form-item class="formQueryBtn">
        <el-button type="primary" plain icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
        <el-button plain icon="el-icon-refresh" size="small" @click="handleRest">重置</el-button>
      </el-form-item>
    </el-form>

    <template slot="btnBeforeSlot">
      <el-button type="primary" plain icon="el-icon-plus" size="small" @click="handleCustomAdd">新增</el-button>
      <el-button type="danger" plain icon="el-icon-delete" size="small" @click="handleBatchDel">删除</el-button>
    </template>
    <template slot="btnAfterSlot" />

    <el-table slot="tableSlot" v-loading="loading" :data="tableData" stripe checkbox height="100%" size="mini" width="100%" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="主键" width="220" />
      <el-table-column prop="name" label="名字" width="220" />
      <el-table-column prop="no" label="学号" width="220" />
      <el-table-column prop="age" label="年龄" width="220" />
      <el-table-column prop="address" label="住址" width="220" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" icon="el-icon-edit" @click="handleCustomAdd(scope.row)">修改</el-link>
          <el-link type="primary" :underline="false" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-link>
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
            searchApi: this.$api.generator.student.list,
            title: '学生'
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
