<template>
  <el-dialog
    v-if="dialogShow"
    :title="title"
    visible
    :width="width"
    center
    :fullscreen="fullscreen"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :v-bind="$attrs"
    :v-on="$listeners"
    append-to-body
    class="dialog-wrapper"
  >
    <slot name="dialogSlot" />
  </el-dialog>
</template>

<script>
export default {
    props: {
        title: {
            default: '信息',
            type: String
        },
        width: {
            default: null,
            type: String
        },
        fullscreen: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            dialogShow: false
        }
    },
    methods: {
        show() {
            this.dialogShow = true
        },
        hide() {
            this.dialogShow = false
        }
    }
}
</script>
