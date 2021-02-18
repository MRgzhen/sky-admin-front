<template>
  <div class="content-container">
    <div class="my-breadcrumb">
      <el-breadcrumb separator="/" class="breadcrumb-wrapper">
        <el-breadcrumb-item v-for="(item,index) in paths" :key="index" :to="{ name: item.path}">
          <span v-if="item.name === $route.name">{{ item.title }}</span>
          <a v-else @click.prevent="handlerGo(item)">{{ item.title }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="card-wrapper">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            paths: []
        }
    },
    computed: {
        ...mapGetters(['menus']),
        ...mapState('layout', ['screenHeight']),
        bodyStyle() {
            return `min-height:${this.screenHeight - 110}px;padding:10px;position: relative;box-sizing: border-box;`
        }
    },
    watch: {
        '$route'(to, from) {
            this.SET_ACTIVENAME(to.name)
            if (to.name !== 'home') {
                this.doMenuPath(this.menus)
            } else {
                this.paths = []
            }
            this.paths.unshift({ name: 'home', title: '首页' })
        }
    },
    created() {
        this.doMenuPath(this.menus)
        this.paths.unshift({ name: 'home', title: '首页' })
    },
    methods: {
        ...mapMutations('menu', ['SET_ACTIVENAME']),
        handlerGo(item) {
            this.$router.push({ name: item.name })
        },
        doMenuPath(menus) {
            // 递归遍历菜单获取和当前路由一致的叶子节点，获取该叶子节点->父节点->祖父节点....，其中父节点及以上节点的name为获取到的节点同层第一个节点的path
            const key = this.$route.meta.key
            for (let i = 0; i < menus.length; i++) {
                const menu = menus[i]
                if (menu.children && menu.children.length > 0) {
                    this.doMenuPath(menu.children)
                    if (this.paths.length > 0) {
                        if (this.paths.length === 1) {
                            this.paths.unshift({ name: menu.children[0].path, title: menu.name })
                        }
                        this.paths.splice(1, { name: this.paths[0].path, title: menu.name })
                        return
                    }
                } else {
                    if (menu.id === key) {
                        this.paths = []
                        this.paths.push({ name: menu.path, title: menu.name })
                        return
                    }
                }
            }
        }
    }
}
</script>
