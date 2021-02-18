<template>
  <div class="content-container">
    <el-tabs
      v-model="activeName"
      class="tabs-wrapper"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handlerTabRemove"
    >
      <el-tab-pane
        v-for="(item) in tabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <div class="card-wrapper">
          <template v-if="$route.meta.type === 'iframe'">
            <iframe
              v-if="item.name === activeName"
              :src="$route.meta.iframeUrl"
              width="100%"
              height="99%"
              frameborder="0"
              scrolling="yes"
            />
          </template>

          <keep-alive v-else>
            <router-view v-if="item.name === activeName" />
          </keep-alive>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState('menu', ['tabs']),
        // bodyStyle() {
        //     return ``
        // },
        contentStyle() {
            return ''
            // return `box-sizing: border-box;`
        },
        activeName: {
            get() {
                return this.$store.state.menu.activeName
            },
            set(value) {
                this.SET_ACTIVENAME(value)
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.ADD_TAB({ title: to.meta.title, name: to.name })
        }
    },
    created() {
        this.$nextTick(() => {
            if (this.activeName !== this.$route.name) {
                this.ADD_TAB({ title: this.$route.meta.title, name: this.$route.name })
            }
        })
    },
    methods: {
        ...mapMutations('menu', ['ADD_TAB', 'REMOVE_TAB', 'SET_ACTIVENAME']),
        handleTabClick(tab, event) {
            if (this.$route.name !== tab.name) {
                this.$router.push({ name: tab.name })
            }
        },
        handlerTabRemove(tabName) {
            this.REMOVE_TAB(tabName)
            if (this.$route.name !== this.activeName) {
                this.$router.push({ name: this.activeName })
            }
        }
    }
}
</script>

