<template>
  <el-row type="flex" class="two_table-wrapper">
    <el-col class="one-wrapper" :xs="11" :sm="10" :md="9" :lg="8" :xl="7">
      <div class="btn-wrapper">
        模板参数设置
      </div>
      <el-form
        ref="templateForm"
        :model="formTemplate"
        label-width="100px"
        :rules="rules"
        :inline="true"
        size="mini"
        class="template_form"
      >
        <el-divider content-position="left">模板组</el-divider>
        <el-form-item label="模板组:" prop="templateGroupId">
          <el-select
            v-model="formTemplate.templateGroupId"
            placeholder="请选择模板组"
            filterable
          >
            <el-option
              v-for="(item,index) in templateGroups"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.enabled==0"
            />
          </el-select>
        </el-form-item>
        <el-divider content-position="left">模板参数</el-divider>
        <el-form-item label="包名:" prop="javaPackageName">
          <el-input v-model.trim="formTemplate.javaPackageName" placeholder="请输入包名" />
        </el-form-item>
        <div style="margin:0 0 20px 30px;width: 85%;color:#888">
          <span style="font-size:6px;line-height: 20px;">
            包名一般为域+组织标识+项目，如com.yanyu.sky，yanyu标识组织，sky标识项目
          </span>
        </div>
        <el-form-item label="模块名:" prop="javModuleName">
          <el-input v-model.trim="formTemplate.javModuleName" placeholder="请输入模块名" />
        </el-form-item>
        <div style="margin:0 0 20px 30px;width: 85%;color:#888">
          <span style="font-size:6px;line-height: 20px;">
            当前模块名与包名共同组成路径, 如：包名com.yanyu.sky，模块名sys，将统一在com.yanyu.sky.sys下生成代码
          </span></div>
        <el-form-item label="作者:" prop="author">
          <el-input v-model.trim="formTemplate.author" placeholder="请输入作者" />
        </el-form-item>
        <el-divider content-position="left">命名规则</el-divider>
        <el-form-item label="表命名规则">
          <el-radio-group v-model="formTemplate.tableNaming">
            <el-radio label="2">驼峰命名</el-radio>
            <el-radio label="1">原样</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="列命名规则">
          <el-radio-group v-model="formTemplate.columnNaming">
            <el-radio label="2">驼峰命名</el-radio>
            <el-radio label="1">原样</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="忽略表前缀:" prop="ingoreTablePrefix">
          <el-input v-model.trim="formTemplate.ingoreTablePrefix" placeholder="请输入忽略表前缀" />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="17">
      <table-view>
        <el-form ref="form" slot="formSlot" :model="form" :inline="true" class="inline-form" size="mini">
          <el-form-item label="数据库:" prop="dsId">
            <el-select v-model="form.dsId" placeholder="请选择数据库" filterable @change="handleChange">
              <el-option
                v-for="(item,index) in dsSettings"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.enabled==0"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="formQueryBtn">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleCustomSearch">查询</el-button>
          </el-form-item>
        </el-form>

        <template slot="btnBeforeSlot">
          数据库设置
        </template>
        <template slot="btnAfterSlot">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleGeneratorCode">代码生成</el-button>
        </template>
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
          @selection-change="handleSelect"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="tableName" label="表名" width="250" />
          <el-table-column prop="tableComment" label="表描述" />
          <el-table-column label="操作" fixed="right" align="center" width="350">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" icon="el-icon-edit" @click="handleCustomAdd(scope.row)">预览</el-link>
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
    </el-col>
  </el-row>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { doDsSettingOfBasic, doTemplateGroupOfBasic } from '@/api/generator'
import rules from './rules'
export default {
    components: {
    },
    mixins: [tableMixin],
    data() {
        return {
            rules: rules(this),
            activeSerach: false,
            searchApi: this.$api.generator.dsSetting.listDsTables,
            title: '代码生成',
            form: {
                dsId: ''
            },
            formTemplate: {
                dsId: '',
                templateGroupId: '',
                javaPackageName: 'com.yanyu.sky',
                javModuleName: '',
                author: 'yanyu',
                tableNaming: '2',
                columnNaming: '2',
                ingoreTablePrefix: '',
                tableNames: []
            },
            dsSettings: [],
            templateGroups: []

        }
    },
    mounted() {
        doDsSettingOfBasic().then(result => {
            this.dsSettings = result.bean
        })
        doTemplateGroupOfBasic().then(result => {
            this.templateGroups = result.bean
        })
    },
    methods: {
        handleGeneratorCode() {
            this.$refs.templateForm.validate((valid) => {
                if (valid) {
                    if (this.formTemplate.tableNames && this.formTemplate.tableNames.length <= 0) {
                        this.$message({
                            message: '请选择数据源和对应的表',
                            type: 'error'
                        })
                        return
                    }
                    this.formTemplate.dsId = this.form.dsId
                    this.$ajax.download(this.$api.generator.code.new, this.formTemplate, 'skymt.zip')
                }
            })
        },
        handleCustomSearch() {
            if (!this.form.dsId) {
                this.$message({
                    type: 'error',
                    message: '请选择数据源'
                })
                return
            }
            this.handleSearch()
        },
        handleChange(val) {
            this.activeSerach = true
        },
        handleSelect(selecteds) {
            const tableNames = selecteds.map((item) => {
                return item.tableName
            })
            this.formTemplate.tableNames = [...tableNames]
        }
    }
}
</script>
<style scoped lang="scss">
    .template_form {
        .el-form-item {
            .el-form-item__content {
                width: 215px !important;

                &>div {
                     width: 215px !important;
                }
            }
        }
    }
</style>
