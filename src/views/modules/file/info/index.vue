<template>
  <table-view :show-block-control="false">
    <template slot="formSlot">
      <el-form ref="form" slot="formSlot" :model="form" label-width="80px" :inline="true">
        <el-form-item label="文件类型" prop="type">
          <el-input v-model="form.type" size="small" placeholder="请选择文件类型" />
        </el-form-item>
        <el-form-item label="创建时间" prop="name" class="formDate">
          <el-date-picker
            v-model="form.date"
            size="small"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
          <el-button plain icon="el-icon-refresh" size="small" @click="handleRest">重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <div slot="btnBeforeSlot">
      <el-button type="info" plain icon="el-icon-delete" size="small" @click="handleBatchDel">删除</el-button>
    </div>
    <div slot="btnAfterSlot" />

    <el-table slot="tableSlot" v-loading="loading" :data="tableData" stripe checkbox height="100%" size="small" width="100%" border @selection-change="handleTableCheckbox">

      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="文件名">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="你确定要下载该文件么？"
            @onConfirm="handleConfirm(scope.row)"
          >
            <el-button slot="reference" type="text">{{ scope.row.name }}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小" width="180" />
      <el-table-column prop="isImg" label="是否是图片" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isImg == 1" type="success">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220" />
      <el-table-column prop="createUser" label="创建人" />
    </el-table>

    <template slot="paginationSlot">
      <el-pagination
        :current-page="page.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>

    <template slot="otherSlot">
      <dialog-view ref="dialogRef" :title="dialogParams.title" :width="dialogParams.width">
        <template slot="dialogSlot">
          <component
            :is="dialogParams.componentName"
            :edit-data="editRow"
            @submitSuccess="handleSearch"
          />
        </template>
      </dialog-view>
    </template>
  </table-view>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'

export default {
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.file.list,
            deleteApi: this.$api.file.delete,
            title: '文件',
            form: {
                date: [],
                type: '',
                name: ''
            }
        }
    },
    mounted() {
    },
    methods: {
        handleTableCheckbox(rows) {
            this.deleteBatchData = []
            rows.forEach(item => {
                this.deleteBatchData.push(item.id)
            })
        },
        // 获取table选择项
        handleTableCheckbox(rows) {
            this.deleteBatchData = []
            rows.forEach(item => {
                this.deleteBatchData.push(item.id)
            })
        },
        handleConfirm(row) {
            this.$ajax.download(this.$api.file.download, { id: row.id }, row.name)
        },
        resetSearchParams(param) {
            const data = { ...param }
            if (param.date.length == 2) {
                data.startDate = param.date[0]
                data.endDate = param.date[1]
            }
            delete data.date
            return data
        }
    }
}
</script>
