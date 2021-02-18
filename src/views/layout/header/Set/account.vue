<template>
  <div class="header-account_wrapper">
    <el-table
      :data="socials"
      height="100%"
      size="small"
      width="100%"
    >
      <el-table-column prop="app" label="绑定账号信息">
        <template slot-scope="scope">
          <template v-for="(item, index) in newSocialData">
            <div v-if="scope.row.app === item.type" :key="index">
              <svg-icon
                :icon-class="item.type"
                :class-name="item.type"
                class="icon-social"
              />
              <span>{{ item.title }}</span>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="app" label="详情">
        <template slot-scope="scope">
          <template v-if="scope.row.status==='1'">
            <el-avatar size="small" :src="scope.row.avatar" style="vertical-align:middle;margin-right: 5px;" />
            <span>{{ scope.row.nickName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="绑定日期" />
      <el-table-column label="操作" fixed="right" width="280" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==='1'" type="text" icon="el-icon-add" size="mini" @click="handleUnBind(scope.row)">解绑</el-button>
          <el-button v-else type="text" icon="el-icon-add" size="mini" @click="handleBind(scope.row)">绑定</el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { socials as socialData } from '@/utils/common'
export default {
    name: '',
    data() {
        return {
            socials: [],
            newSocialData: socialData()
        }
    },
    mounted() {
        this.doList()
    },
    methods: {
        doList() {
            this.$ajax.get(this.$api.sys.social.listByUserId, { userId: this.$store.getters.user.userId }).then(result => {
                this.socials = result.bean
            })
        },
        handleUnBind(row) {
            this.$ajax.post(this.$api.sys.social.unbind, { app: row.app }).then(result => {
                this.$message({
                    message: '解绑成功',
                    type: 'success',
                    duration: 5 * 1000
                })
                this.doList()
            })
        },
        handleBind(row) {
            const redirect_uri = process.env.VUE_APP_BASE_API + '/sys/social/auth/login/' + row.app +
                                 '?domain=' + window.location.origin
            this.$common.openWindow(redirect_uri, row.app, 540, 540)
            const context = this
            window.addEventListener('message', function(e) {
                try {
                    const data = JSON.parse(e.data)
                    if (data.code !== '10000') {
                        context.$message({
                            message: '绑定失败',
                            type: 'error',
                            duration: 5 * 1000
                        })
                        return
                    }
                    if (data.bean.auth === '0') {
                        // 绑定用户
                        context.$ajax.post(context.$api.sys.social.bind, { app: row.app, openId: data.bean.openId, tmpCode: data.bean.tmpCode }).then(result => {
                            context.$message({
                                message: '绑定成功',
                                type: 'success',
                                duration: 5 * 1000
                            })
                            context.doList()
                        })
                    }
                } catch (error) {
                    // 什么也不做
                    console.log(error)
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .header-account_wrapper {
        height: 100%;
        padding:10px;
        .icon-social {
            margin-left: 20px;
            width: 25px;
            height: 25px;
            cursor: pointer;
            vertical-align: middle;
            margin-right: 10px;
        }
    }

</style>
