<template>
  <el-aside :class="['sidebarer-container',{'open-sidebar':!isCollapse,'hide-sidebar':isCollapse}]">
    <el-scrollbar wrap-class="scrollbar-wrap">
      <el-menu
        :default-active="activeName || 'home'"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        collapse-transition
        unique-opened
        @select="handleMenu"
      >
        <el-menu-item index="home">
          <i class="el-icon-s-home" />
          <span slot="title">首页</span>
        </el-menu-item>
        <sidebar-item v-for="route in menus" :key="route.id" :item="route" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import sidebarItem from './sidebarItem'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        sidebarItem
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['menus']),
        ...mapState('menu', ['activeName']),
        isCollapse() {
            return !this.$store.getters.opened
        }
    },
    methods: {
        handleMenu(key) {
            if (key !== this.activeName) {
                this.$router.push({ name: key })
            }
        }
    }
}
</script>
