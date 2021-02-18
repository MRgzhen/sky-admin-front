<template>
  <table-view :show-btn="false">
    <template slot="formSlot" />
    <div slot="btnBeforeSlot">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCustomAdd">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleBatchDel">删除</el-button>
      <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
    </div>
    <div slot="btnAfterSlot" />

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
      <el-table-column prop="nickName" label="数据源昵称" width="150" />
      <el-table-column prop="name" label="数据源名称" width="150" />
      <el-table-column prop="driver" label="驱动" width="250" />
      <el-table-column prop="url" label="连接地址" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column label="操作" fixed="right" align="center" width="350">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" icon="el-icon-edit" @click="handleCustomAdd(scope.row)">修改</el-link>
          <el-link type="primary" :underline="false" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-link>
          <el-link type="primary" :underline="false" icon="el-icon-delete" @click="handleDsTest(scope.row)">连接测试</el-link>
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

    <dialog-view slot="other" ref="dialogRef" :title="dialogParams.title" :width="dialogParams.width">
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
            searchApi: this.$api.generator.dsSetting.list,
            deleteApi: this.$api.generator.dsSetting.delete,
            title: '数据源配置',
            form: {
                code: '',
                name: ''
            }
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({ })
            } else {
                this.handleAdd(row)
            }
        },
        handleDsTest(row) {
            this.$ajax.get(this.$api.generator.dsSetting.test, { id: row.id }).then(result => {
                this.$message({
                    message: '数据库连接成功',
                    type: 'success'
                })
            })
        }
    }
}
</script>
