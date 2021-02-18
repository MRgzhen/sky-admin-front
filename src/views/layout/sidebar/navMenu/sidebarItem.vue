<template>
  <el-submenu v-if="item.children && item.children.length > 0" ref="subMenu" :index="item.id">
    <template slot="title">
      <i :class="item.icon" />
      <span>{{ item.name }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-submenu>
  <el-menu-item v-else :index="item.path">
    <i :class="item.icon" />
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleMenu(item) {
            if (item.path !== this.$store.state.menu.activeName) {
                this.$router.push({ name: item.path })
            }
        }
    }
}
</script>
<style>
    .el-menu .font_family {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        /* font-size: 18px; */
    }
</style>
