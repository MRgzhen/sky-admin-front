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
      <el-table-column prop="name" label="组名" width="220" />
      <el-table-column prop="remark" label="描述" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="updateTime" label="更新时间" width="200" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" icon="el-icon-plus" @click="handleCustomAttr(scope.row)">新增属性</el-link>
          <el-link type="primary" :underline="false" icon="el-icon-plus" @click="handleCustomTemplate(scope.row)">新增模板</el-link>
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
        Add: () => import('./add'),
        Template: () => import('../template/add'),
        Attr: () => import('../attr/add')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.generator.templateGroup.list,
            deleteApi: this.$api.generator.templateGroup.delete,
            title: '模板分组',
            form: {
                code: '',
                name: ''
            }
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({ sort: 1 })
            } else {
                this.handleAdd(row)
            }
        },
        handleCustomAttr(row) {
            this.doInitDialog({ sort: 1, templateGroupId: this.templateGroupId }, 'Attr', '属性')
        },
        handleCustomTemplate(row) {
            this.doInitDialog({ templateGroupId: row.id }, 'Template', '模板', this.$store.getters.mobile ? '80%' : '70%')
        }
    }
}
</script>
