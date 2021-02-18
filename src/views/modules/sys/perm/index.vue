<template>
  <el-row type="flex" class="two_table-wrapper">
    <el-col class="one-wrapper" :xs="9" :sm="7" :md="6" :lg="5" :xl="4">
      <div class="btn-wrapper">
        菜单
      </div>
      <el-input
        v-model="selectInput"
        placeholder="请输入菜单名称/编码"
        prefix-icon="el-icon-search"
        size="mini"
        clearable
        class="query-wrapper"
        @input="handleInput"
      />
      <el-tree
        ref="tree"
        :data="selects"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        highlight-current
        class="body-wrapper elTreeClass"
        @node-click="handleTree"
      />
    </el-col>
    <el-col :xs="15" :sm="17" :md="18" :lg="19" :xl="20">
      <table-view>
        <el-form
          ref="form"
          slot="formSlot"
          :model="form"
          :inline="true"
          size="mini"
        >
          <el-form-item label="权限标识" prop="perm">
            <el-input v-model="form.perm" placeholder="请选择标识" clearable />
          </el-form-item>
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="form.name" placeholder="请选择名称" clearable />
          </el-form-item>
          <el-form-item class="formQueryBtn">
            <el-button
              type="primary"
              @click="handleAllSearch"
            >查询</el-button>
            <el-button @click="handleRest">重置</el-button>
          </el-form-item>
        </el-form>

        <div slot="btnBeforeSlot">
          权限管理
        </div>
        <div slot="btnAfterSlot">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleCustomAdd"
          >新增</el-button>
        </div>

        <el-table slot="tableSlot" v-loading="loading" :data="tableData" stripe checkbox height="100%" size="mini" width="100%" border @selection-change="handleTableCheckbox">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="名称" width="220" />
          <el-table-column prop="menuName" label="所属菜单" width="220" />
          <el-table-column prop="perms" label="权限标识" width="220" />
          <el-table-column prop="type" label="类型" width="180">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type==2" type="success" size="small">按钮</el-tag>
              <el-tag v-if="scope.row.type==3" type="warning" size="small">其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="状态" width="180">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-color="#409EFF"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
                size="small"
                @change="handleChange($event,scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <dialog-view
          slot="other"
          ref="dialogRef"
          :title="dialogParams.title"
          :width="dialogParams.width"
        >
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
import { doMenusByTypeOfBasic } from '@/api/sys'

export default {
    name: 'Perm',
    components: {
        Add: () => import('./add')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.perm.list,
            deleteApi: this.$api.sys.menu.delete,
            title: '权限',
            form: {
                perm: '',
                name: ''
            },
            selectInput: '',
            selects: [],
            selectParentMenuId: null,

            // 下拉框
            menus: []
        }
    },
    computed: {
        perms: {
            get() {
                return this.$store.state.basic.perms
            },
            set(val) {
                this.$store.state.basic.perms = val
            }
        }
    },
    watch: {
        selects(val) {
            this.$nextTick(() => {
                this.handleSearch()
            })
        }
    },
    mounted() {
        doMenusByTypeOfBasic().then(result => {
            this.menus = result.bean
            this.selects = [...this.menus]
        })
    },
    methods: {
        handleChange(status, val) {
            val.enabled = status
            this.$ajax.post(this.$api.sys.perm.edit, val).then(result => {
                this.handleSearch()
            })
        },
        handleTree(val) {
            this.handleSearch()
        },
        handleAllSearch() {
            this.$refs.tree.setCurrentKey(null)
            this.handleSearch()
        },
        resetSearchParams(search) {
            search.menuId = this.$refs.tree.getCurrentKey()
        },
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({
                    enabled: '1',
                    parentId: this.$refs.tree.getCurrentKey(),
                    type: '2',
                    sort: 1
                })
            } else {
                this.handleAdd(row)
            }
        },
        handleInput(val) {
            this.selects = []
            if (this.menus && this.menus.length > 0) {
                this.searchTree(val, this.menus)
            } else {
                this.selects.push({})
            }
        },
        searchTree(val, menus) {
            for (let i = 0; i < menus.length; i++) {
                if (
                    menus[i].label.indexOf(val) !== -1 ||
                    menus[i].value.indexOf(val) !== -1
                ) {
                    this.selects.push({ ...menus[i] })
                    continue
                }
                if (menus[i].children && menus[i].children.length > 0) {
                    this.searchTree(val, menus[i].children)
                }
            }
        }
    }
}
</script>
<style lang="scss">
    .elTreeClass {
        .el-tree-node__content {
            padding: 1px 0;
        }
    }
</style>
