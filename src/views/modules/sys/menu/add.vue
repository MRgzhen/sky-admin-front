<template>
  <div>
    <el-dialog width="31%" :title="dialogIconParams.title" :visible.sync="dialogIconParams.dialogShow" append-to-body>
      <component :is="dialogIconParams.componentName" @handleSetIcon="handleSetIcon" />
    </el-dialog>
    <el-form
      ref="form"
      :model="curData"
      :rules="rules"
      status-icon
      class="no_inline-form"
      size="small"
    >
      <el-form-item label="菜单类型:" prop="type">
        <el-radio-group v-model="curData.type" @change="handleChange">
          <el-radio label="0">目录</el-radio>
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
          <el-radio label="3">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级菜单:" prop="parentId">
        <el-select-tree v-model="curData.parentId" clearable check-strictly placeholder="请选择上级菜单" default-expand-all :popover-width="200" :data="menus" :disabled-values="disabledValues" />
      </el-form-item>
      <el-form-item label="菜单名称:" prop="name">
        <el-input v-model.trim="curData.name" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item v-if="curData.type==='1'" label="路由地址:" prop="path">
        <el-input v-model.trim="curData.path" placeholder="请输入路由地址" clearable />
      </el-form-item>
      <el-form-item v-if="curData.type==='1'" label="组件路径:" prop="component">
        <el-input v-model.trim="curData.component" placeholder="请输入组件路径" clearable />
      </el-form-item>
      <el-form-item v-if="curData.type==='0' || curData.type==='1'" label="菜单样式:" prop="icon">
        <span v-if="curData.icon">
          <i :class="curData.icon" style="font-size:18px;cursor: pointer;margin-right:30px;" @click="handleCustomIconAdd" />
          <i class="el-icon-circle-close" style="cursor: pointer;" @click="handleDeleteIcon" />
        </span>
        <span v-else @click="handleCustomIconAdd">
          <el-link type="primary">选择菜单样式</el-link>
        </span>
      </el-form-item>
      <el-form-item v-if="curData.type!=='0'" label="权限标识:" prop="perms">
        <el-input v-model.trim="curData.perms" placeholder="请输入权限标识，如system:user:add" clearable />
      </el-form-item>
      <el-form-item label="状态:" prop="enabled">
        <el-switch v-model="curData.enabled" active-color="#409EFF" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number v-model.number.trim="curData.sort" controls-position="right" :step="1" :min="1" :max="999" />
      </el-form-item>

      <el-form-item class="formDialogBtn">
        <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
        <el-button type="info" size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import edtiMixin from '@/mixins/edit.mixin'
import rules from './rules'
import { doMenusByTypeOfBasic } from '@/api/sys'
export default {
    components: {
        Icon: () => import('./icon')
    },
    mixins: [edtiMixin],
    data() {
        return {
            rules: rules(this),
            addApi: this.$api.sys.menu.add,
            editApi: this.$api.sys.menu.edit,
            dialogIconParams: {
                dialogShow: false,
                componentName: 'Icon',
                title: '图标'
            },
            disabledValues: [],

            // 下拉框
            menus: []
        }
    },
    mounted() {
        // 首次加载
        this.handleChange(this.curData.type)
    },
    methods: {
        handleCustomIconAdd() {
            this.dialogIconParams.dialogShow = true
        },
        handleSetIcon(item) {
            const json = JSON.parse(JSON.stringify(this.curData))
            json.icon = item
            this.curData = json
            this.dialogIconParams.dialogShow = false
        },
        handleDeleteIcon() {
            this.curData.icon = ''
        },
        async handleChange(val) {
            // 1. 清空menus下拉列表
            this.menus = []

            // 2. 如果菜单类型为目录或菜单，上级菜单点只能是目录；若果按钮类型，上级菜单点可以为目录或菜单
            if (this.curData.type === '0' || this.curData.type === '1') {
                await doMenusByTypeOfBasic('0').then(result => {
                    this.menus = result.bean
                })
            } else {
                await doMenusByTypeOfBasic().then(result => {
                    this.menus = result.bean
                })
            }
            // 3. 修改操作，上级菜单为当前节点及其子节点不可选
            if (this.curData.id) {
                this.disabledValues = []
                this.doChange(this.menus)
            }

            // 4. 将curData临时保存，重置form表单
            const tmpCurData = { ...this.curData }
            this.$refs.form.resetFields()
            this.curData.type = val
            this.curData.parentId = tmpCurData.parentId

            // 5. 新增操作，code和name、enabled、sort都变成上一次填写的记录信息
            if (!this.curData.id) {
                this.curData.name = tmpCurData.name
                this.curData.enabled = tmpCurData.enabled
                this.curData.sort = tmpCurData.sort
            }
        },
        doChange(childs) {
            childs.forEach(item => {
                if (this.curData.id && item.id === this.curData.id) {
                    this.disabledValues.push(item.id)
                    this.doDisabledChange(item.children)
                } else {
                    this.doChange(item.children)
                }
            })
        },
        doDisabledChange(childs) {
            childs.forEach(item => {
                this.disabledValues.push(item.id)
                this.doDisabledChange(item.children)
            })
        },
        resetEditParams(val) {
            const params = { ...val }
            if (val.type === '0') {
                params.path = ''
                params.component = ''
                params.perms = ''
            } else if (val.type === '2' || val.type === '3') {
                params.path = ''
                params.component = ''
                params.icon = ''
            }
            return params
        }
    }
}
</script>
