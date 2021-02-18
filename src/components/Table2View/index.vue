<template>
  <el-row class="table2view" :gutter="10" type="flex">
    <el-col :xs="9" :sm="7" :md="6" :lg="5" :xl="4">
      <slot name="left" />
    </el-col>
    <el-col :xs="15" :sm="17" :md="18" :lg="19" :xl="20">
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

        <slot name="tableSlot" class="body-wrapper" />
        <slot name="paginationSlot" class="pagination-wrapper" />

        <slot name="other" />
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>
