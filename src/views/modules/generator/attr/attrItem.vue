<template>
  <table-view>
    <el-form ref="form" slot="formSlot" :model="form" :inline="true" size="mini">
      <el-form-item label="参数名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="全部" value="0" />
          <el-option label="自定义" value="1" />
          <el-option label="默认" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item class="formQueryBtn">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleRest">重置</el-button>
      </el-form-item>
    </el-form>

    <div slot="btnBeforeSlot">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCustomAdd">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleBatchDel">删除</el-button>
    </div>
    <div slot="btnAfterSlot" />

    <el-table slot="tableSlot" v-loading="loading" :data="tableData" stripe checkbox height="100%" size="mini" width="100%" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="参数名称" width="220" />
      <el-table-column prop="value" label="参数值" width="220" />
      <el-table-column prop="type" label="参数类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='1'">自定义</span>
          <span v-if="scope.row.type=='2'">默认</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="120" />
      <el-table-column prop="remark" label="描述" width="220" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" fixed="right" width="350" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" icon="el-icon-edit" @click="handleCustomAdd(scope.row)">修改</el-link>
          <el-link type="primary" :underline="false" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

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
    props: {
        templateGroupId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            searchApi: this.$api.generator.attr.list,
            deleteApi: this.$api.generator.attr.delete,
            title: '模板参数',
            form: {
                type: '1',
                name: ''
            }
        }
    },
    methods: {
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.doInitDialog({ templateGroupId: this.templateGroupId, sort: 1 }, 'add', '参数')
            } else {
                this.$ajax.get(this.$api.generator.template.get, { id: row.id }).then(result => {
                    row.templateGroupId = this.templateGroupId
                    this.doInitDialog(row, 'add', '参数')
                })
            }
        },
        resetSearchParams(param) {
            param.templateGroupId = this.templateGroupId
        }
    }
}
</script>
