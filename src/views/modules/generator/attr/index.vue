<template>
  <el-tabs v-model="active" class="attrTab">
    <template v-for="(item,index) in templateGroups">
      <el-tab-pane :key="index" :label="item.label" :name="item.value" :style="contentStyle">
        <attr-item v-if="activeName===item.value" :template-group-id="activeName" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
import { doTemplateGroupOfBasic } from '@/api/generator'
export default {
    components: {
        attrItem: () => import('./attrItem')
    },
    data() {
        return {
            // 下拉列表
            templateGroups: [],
            activeName: null
        }
    },
    computed: {
        contentStyle() {
            return `height:${this.$store.getters.screenHeight - 184}px;box-sizing: border-box;`
        },
        active: {
            get() {
                return this.activeName != null ? this.templateGroups && this.templateGroups.length > 0
                    ? this.templateGroups[0].value : '' : this.activeName
            },
            set(val) {
                this.activeName = val
            }
        }
    },
    mounted() {
        doTemplateGroupOfBasic().then(result => {
            this.templateGroups = result.bean
        })
    }
}
</script>
<style lang="scss">
.attrTab >.el-tabs__header  {
     padding-left: 20px;
     background: #ffffff;
 }
</style>
