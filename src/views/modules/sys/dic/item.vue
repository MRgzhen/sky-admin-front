<template>
  <table-view>
    <el-form
      ref="form"
      slot="formSlot"
      :model="form"
      :inline="true"
      size="mini"
    >
      <el-form-item label="字典项值" prop="value">
        <el-input v-model="form.value" placeholder="请输入字典项值" clearable />
      </el-form-item>
      <el-form-item label="字典项名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入字典项名称" clearable />
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

    <el-table
      slot="tableSlot"
      v-loading="loading"
      :data="tableData"
      stripe
      height="100%"
      size="mini"
      row-key="id"
      width="100%"
      border
      class="dicItemClass"
    >
      <el-table-column prop="code" label="字典编码" width="220" />
      <el-table-column prop="value" label="字典项值" />
      <el-table-column prop="name" label="字典项名称" width="180" />
      <el-table-column prop="isDefault" label="默认值">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isDefault === '1'">是</el-tag>
          <el-tag v-else-if="scope.row.isDefault === '0'">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#ff4949" active-value="1" inactive-value="0" @change="handleChange($event,scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column label="操作" fixed="right" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="small" @click="handleCustomAdd(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click="handleCustomDel(scope.row)">删除</el-button>
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
        ItemAdd: () => import('./itemAdd')
    },
    mixins: [tableMixin],
    props: {
        editData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            searchApi: this.$api.sys.dic.listItem,
            deleteApi: this.$api.sys.dic.deleteItem,
            title: '字典项',
            form: {
                name: '',
                value: ''
            }
        }
    },
    watch: {
        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        editData: {
            handler: function() {
                this.form = { ...this.editData }
            },
            immediate: true
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.doInitDialog({ enabled: '1', isDefault: '0', sort: 0, code: this.form.code }, 'ItemAdd', '字典项')
            } else {
                this.doInitDialog(row, 'ItemAdd', '字典项')
            }
        },
        handleCustomDel(row) {
            this.handleDel(row)
        },
        handleChange(status, val) {
            val.enabled = status
            this.$ajax.post(this.$api.sys.dic.editItemEnable, val).then(result => {
                this.handleSearch()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .dicItemClass {
        min-height: 350px!important;
    }
</style>

