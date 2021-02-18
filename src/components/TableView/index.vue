<template>
  <div class="table-wrapper">
    <div ref="queryRef" class="query-wrapper">
      <!--form-->
      <slot name="formSlot" />
    </div>
    <el-row class="btn-wrapper" type="flex">
      <el-col>
        <slot name="btnBeforeSlot" />
      </el-col>
      <el-col>
        <el-row justify="end" type="flex">
          <slot name="btnAfterSlot" />
        </el-row>
      </el-col>
    </el-row>

    <slot name="tableSlot" />
    <slot name="paginationSlot" />
    <slot name="other" />
  </div>
</template>

<script>
export default {
    name: 'TableView',
    props: {
        showBtn: {
            type: Boolean,
            default: true
        },
        opened: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            initFormheight: ''
        }
    },
    watch: {
        opened(oldVal, newVal) {
            this.doForm()
        }
    },
    mounted() {
        this.doForm()
    },
    methods: {
        doForm() {
            const formRef = this.$refs.queryRef
            if (!this.opened) {
                const elFormEle = formRef.getElementsByClassName('el-form-item')
                for (var i = 2; i < elFormEle.length; i++) {
                    if (i === elFormEle.length - 1) {
                        break
                    } else {
                        elFormEle[i].style.display = 'none'
                    }
                }
            } else {
                const elFormEle = formRef.getElementsByClassName('el-form-item')
                for (var j = 2; j < elFormEle.length; j++) {
                    if (j === elFormEle.length - 1) {
                        break
                    } else {
                        elFormEle[j].style.display = 'inline-block'
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss" >
</style>
