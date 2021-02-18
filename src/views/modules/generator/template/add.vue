<template>
  <el-row>
    <el-col :span="18">
      <el-form
        ref="form"
        :model="curData"
        :rules="rules"
        label-width="100px"
        status-icon
        size="small"
      >
        <el-form-item label="模板名:" prop="name">
          <el-input v-model.trim="curData.name" placeholder="模板名格式${SKY}Bean.java" />
        </el-form-item>
        <el-form-item label="模块包名:" prop="moduleName">
          <el-input v-model.trim="curData.moduleName" placeholder="请输入模块名" />
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model.trim="curData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="30" show-word-limit placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="模板内容:" prop="content">
          <code-editor v-model="curData.content" language="x-java" />
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
          <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="5" :push="1">
      <el-table :data="defaultAttrData" border size="mini" height="350" style="width: 100%;">
        <el-table-column prop="name" label="属性名" width="140" />
        <el-table-column prop="remark" label="属性描述" />
      </el-table>
      <div style="height:10px;" />
      <el-table :data="customAttrData" border size="mini" height="150" style="width: 100%;">
        <el-table-column prop="name" label="属性名" width="140" />
        <el-table-column prop="remark" label="属性描述" />
      </el-table>
      <span style="font-size:6px;color:#888;">{属性名:{"name":属性名,"value":属性值,"desc":"描述"}}，可以通过属性名.value获取值</span>
    </el-col>
  </el-row>

</template>

<script>
import CodeEditor from '@/components/CodeEditor'
import edtiMixin from '@/mixins/edit.mixin'
import rules from './rules'

export default {
    components: {
        CodeEditor
    },
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.generator.template.add,
            editApi: this.$api.generator.template.edit,
            defaultAttrData: [],
            customAttrData: []
        }
    },
    mounted() {
        const templateGroupId = this.curData.templateGroupId
        this.$ajax.get(this.$api.generator.attr.listTypeToGroup, { templateGroupId: templateGroupId }).then(result => {
            this.defaultAttrData = result.bean.default
            this.customAttrData = result.bean.custom
        })
    }
}
</script>
