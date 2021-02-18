<template>
  <el-row type="flex" class="two_table-wrapper">
    <el-col class="one-wrapper" :xs="9" :sm="7" :md="6" :lg="5" :xl="4">
      <div class="btn-wrapper">
        组织机构
      </div>
      <el-input
        v-model="selectInput"
        placeholder="请输入组织机构名称/编码"
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
      <table-view :opened="opened">
        <el-form
          ref="form"
          slot="formSlot"
          :model="form"
          :inline="true"
          size="mini"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" clearable placeholder="请选择用户名" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName" clearable placeholder="请选择昵称" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择角色" clearable>
              <el-option v-for="(item,index) in roles" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAllSearch">查询</el-button>
            <el-button @click="handleRest">重置</el-button>
            <el-button type="text" @click="opened = !opened">
              <span v-if="!opened">
                展开 <i class="el-icon-arrow-down" />
              </span>
              <span v-else>
                收起 <i class="el-icon-arrow-up" />
              </span>
            </el-button>
          </el-form-item>
        </el-form>

        <template slot="btnBeforeSlot">
          用户管理
        </template>
        <template slot="btnAfterSlot">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCustomAdd">新增</el-button>
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
          @selection-change="handleTableCheckbox"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="userName" label="用户名" />
          <el-table-column prop="isSys" label="系统用户" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isSys==1">是</span>
              <span v-if="scope.row.isSys==0">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" />
          <el-table-column prop="sex" label="性别" width="120">
            <template slot-scope="scope">
              <template v-for="(item,index) in userSexs">
                <span v-if="scope.row.sex === item.value" :key="index">{{ item.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="130" />
          <el-table-column prop="email" label="邮箱" width="130" />
          <el-table-column prop="deptName" label="部门名称" width="150" />
          <el-table-column prop="type" label="用户类型" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.type=='0'">普通用户</span>
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="状态" width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" active-color="#409EFF" inactive-color="#ff4949" active-value="1" inactive-value="0" :disabled="scope.row.isSys=='1'" @change="handleChange($event,scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280" align="center">
            <template slot-scope="scope">
              <template v-if="$store.getters.user.username !== scope.row.userName">
                <el-button type="text" icon="el-icon-document" size="mini" @click="handleDetail(scope.row)">查看</el-button>
                <el-button type="text" icon="el-icon-edit" size="mini" @click="handleCustomAdd(scope.row)">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" size="mini" :disabled="scope.row.isSys==='1'" @click="handleDel(scope.row)">删除</el-button>
                <el-button type="text" icon="el-icon-delete" size="mini" :disabled="scope.row.isSys==='1'" @click="handleRoleToUser(scope.row)">分配角色</el-button>
              </template>
              <template v-else>
                <el-button type="text" icon="el-icon-document" size="mini" @click="handleDetail(scope.row)">查看</el-button>
              </template>
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
    </el-col>
  </el-row>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { doDeptTreeOfBasic, doRolesOfBasic, doCDicOfBasic } from '@/api/sys'

export default {
    components: {
        Add: () => import('./add'),
        Detail: () => import('./detail'),
        ToRole: () => import('./toRole')
    },
    mixins: [tableMixin],
    data() {
        return {
            searchApi: this.$api.sys.user.list,
            deleteApi: this.$api.sys.user.delete,
            title: '用户',
            form: {
                userName: '',
                nickName: '',
                roleId: ''
            },
            selectInput: '',
            selects: [],

            // 下拉框
            deptTrees: [],
            roles: [],
            userSexs: []
        }
    },
    watch: {
        // 监听部门数据，默认加载全部用户信息
        selects(val) {
            this.$nextTick(() => {
                if (this.selects != null && this.selects.length > 0) {
                    this.handleSearch()
                }
            })
        }
    },
    created() {
        this.initDatas()
    },
    methods: {
        // 获取table选择项
        handleTableCheckbox(rows) {
            this.deleteBatchData = []
            rows.forEach(item => {
                this.deleteBatchData.push(item.id)
            })
        },
        // 角色授权，展示对话框
        handleRoleToUser(row) {
            this.doInitDialog(
                { id: row.id, type: row.type, roleIds: [] },
                'ToRole',
                '分配角色'
            )
        },
        initDatas() {
            // 部门下拉框
            doDeptTreeOfBasic().then(result => {
                this.deptTrees = result.bean
                this.selects = [...this.deptTrees]
            })
            // 角色下拉框
            doRolesOfBasic().then(result => {
                this.roles = result.bean
            })
            // 数据字典用户性别
            doCDicOfBasic(this.$constant.DIC_CODE.SYSTEM_SEX).then(result => {
                this.userSexs = result.bean
            })
        },
        handleTree(data) {
            this.handleSearch()
        },
        handleCustomAdd(row) {
            if (row.constructor.name === 'MouseEvent') {
                this.handleAdd({
                    enabled: '1',
                    deptId: this.$refs.tree.getCurrentKey(),
                    type: null,
                    sex: null
                })
            } else {
                this.handleAdd(row)
            }
        },
        handleAllSearch() {
            this.$refs.tree.setCurrentKey(null)
            this.handleSearch()
        },
        resetSearchParams(search) {
            // 获取当前节点和子树
            search.deptId = this.$refs.tree.getCurrentKey()
        },
        handleInput(val) {
            this.selects = []
            if (this.deptTrees && this.deptTrees.length > 0) {
                this.searchTree(val, this.deptTrees)
            } else {
                this.selects.push({})
            }
        },
        searchTree(val, trees) {
            for (let i = 0; i < trees.length; i++) {
                if (
                    trees[i].label.indexOf(val) !== -1 ||
                    trees[i].value.indexOf(val) !== -1
                ) {
                    this.selects.push({ ...trees[i] })
                    continue
                }
                if (trees[i].children && trees[i].children.length > 0) {
                    this.searchTree(val, trees[i].children)
                }
            }
        },
        handleChange(status, val) {
            val.enabled = status
            this.$ajax
                .post(this.$api.sys.user.editEnabled, val)
                .then(result => {
                    this.handleSearch()
                })
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
