<template>
  <table-view>
    <el-form
      slot="formSlot"
      ref="form"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item label="字典编码" prop="name">
        <el-input v-model="form.code" placeholder="请选择编码" clearable />
      </el-form-item>
      <el-form-item label="字典名称" prop="name">
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

    <el-table slot="tableSlot" v-loading="loading" :data="tableData" stripe height="100%" size="mini" row-key="id" width="100%" border>
      <el-table-column prop="code" label="字典编码" width="220" />
      <el-table-column prop="label" label="字典名称" width="220" />
      <el-table-column prop="type" label="字典类型" width="200">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '1'">预定义</el-tag>
          <el-tag v-else-if="scope.row.type === '0'">自定义</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#ff4949" active-value="1" inactive-value="0" @change="handleChange($event,scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />
      <el-table-column label="操作" fixed="right" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-set-up" size="mini" @click="handleItem(scope.row)">数据项</el-button>
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleCustomDel(scope.row)">删除</el-button>
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
export default {
    components: {
        Add: () => import('./add'),
        Item: () => import('./item')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.dic.list,
            deleteApi: this.$api.sys.dic.delete,
            title: '数据字典',
            form: {
                name: ''
            }
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({ type: '1', enabled: '1', sort: 0, code: '' })
            } else {
                this.handleAdd(row)
            }
        },
        handleCustomDel(row) {
            this.handleDel(row)
        },
        handleChange(status, val) {
            val.enabled = status
            this.$ajax.post(this.$api.sys.dic.editEnable, val).then(result => {
                this.handleSearch()
            })
        },
        handleItem(row) {
            this.doInitDialog({ code: row.code }, 'Item', '字典项', '1000px')
        }
    }
}
</script>

