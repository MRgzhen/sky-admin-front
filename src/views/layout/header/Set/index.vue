<template>
  <el-row type="flex" class="two_table-wrapper header-ower_wrapper">
    <el-col class="one-wrapper ower-one_wrapper" :xs="9" :sm="7" :md="6" :lg="5" :xl="4">
      <div class="btn-wrapper">
        个人中心
      </div>
      <div :class="[{'selectedClass':selected==0},'item']" @click="handleBtn('userInfo')">账号信息</div>
      <div :class="[{'selectedClass':selected==1},'item']" @click="handleBtn('account')">账号绑定</div>

    </el-col>
    <el-col :xs="15" :sm="17" :md="18" :lg="19" :xl="20" class="two-wrapper ower-two_wrapper">
      <div class="btn-wrapper">
        {{ title }}
      </div>
      <component :is="compName" />
    </el-col>
  </el-row>
</template>

<script>
export default {
    name: '',
    components: {
        userInfo: () => import('./userInfo'),
        account: () => import('./account')
    },
    data() {
        return {
            title: 'userInfo',
            compName: null,
            selected: 0
        }
    },
    methods: {
        handleBtn(type) {
            if (type === 'userInfo') {
                this.title = '基础信息'
                this.compName = 'userInfo'
                this.selected = 0
            } else if (type === 'account') {
                this.title = '账号绑定'
                this.compName = 'account'
                this.selected = 1
            }
        }
    }
}
</script>

<style lang="scss">
    .header-ower_wrapper {
        font-size: 14px;
        .ower-one_wrapper {
            .item:hover {
                cursor: pointer;
                background: #DBDFE1;
            }
            .item {
                padding: 13px 20px;
            }
            .selectedClass{
                background: #F0FAFF;
             }
        }
        .ower-two_wrapper {
            background: #ffffff;
        }
    }
</style>
