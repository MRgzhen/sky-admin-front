<template>
  <div class="header-container">
    <div :class="['header-title',{'open-header-title':opened,'hide-header-title':!opened}]">
      <span v-if="!opened">SKY</span>
      <template v-else>
        <svg-icon icon-class="sky" class-name="sky" />
        <span style="padding-left:10px;">SKY平台</span>
      </template>
    </div>
    <div class="header-body">
      <span :class="['header-shousuo',{'mobile-header-body':mobile} ]">
        <svg-icon
          icon-class="shousuo"
          class-name="shousuo"
          :class="shousuoClass"
          @click="toggleSideBar"
        />
      </span>
    </div>
    <div v-if="!mobile" class="header-userinfo">
      <span class="header-logout" @click="logout">
        <svg-icon icon-class="tuichu" class-name="tuichu" />
      </span>

      <el-dropdown @command="handleCommand">
        <span class="header-avatar">
          <el-avatar :size="size" :src="circleUrl" />
          <span class="header-user">
            {{ $store.getters.user && $store.getters.user.username || '' }}
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="owner">个人中心</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            size: 'medium',
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
    computed: {
        ...mapGetters(['opened', 'mobile', 'drawer']),
        shousuoClass() {
            if (this.mobile) {
                return this.drawer ? 'shousuoClass' : 'zhankaiClass'
            } else {
                return this.opened ? 'zhankaiClass' : 'shousuoClass'
            }
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.commit('layout/SET_SIDEBAR')
        },
        logout() {
            this.$ajax.post(this.$api.auth.logout).then(result => {
                this.$store.dispatch('user/cleanUser').then(() => {
                    // 为了重新实例化vue-router对象 避免bug
                    location.reload()
                })
            })
        },
        handleCommand(value) {
            this.$router.push({ name: 'owner' })
        }
    }
}
</script>
<style scoped>
</style>
