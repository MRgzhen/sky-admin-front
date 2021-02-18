<template>
  <div>
    <ul class="icon-list">
      <li v-for="(item,index) in icons" @click="handleSelectIcon(item)">
        <span>
          <span :class="item" style="display: block" />
          <template v-if="item.indexOf('el-icon')!=-1">
            <span class="icon-name">{{ item.substring(item.indexOf("icon")+5,item.length) }}</span>
          </template>
          <template v-else>
            <span class="icon-name">{{ item.substring(item.indexOf("icon")+5,item.length) }}</span>
          </template>

        </span>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            icons: [
                'el-icon-platform-eleme',
                'el-icon-eleme',
                'el-icon-delete-solid',
                'el-icon-s-tools',
                'el-icon-setting',
                'el-icon-user-solid',
                'el-icon-user',
                'el-icon-phone',
                'el-icon-phone-outline',
                'el-icon-more',
                'el-icon-more-outline',
                'el-icon-user',
                'el-icon-menu',
                'el-icon-reading', // 数据字典
                'el-icon-document',
                'font_family icon-zuhuguanli', // 租户管理
                'font_family icon-quanxian', // 组织架构
                'font_family icon-tenantuser', // 用户管理
                'font_family icon-caidanguanli', // 菜单管理
                'font_family icon-jiaose', // 角色管理

                'font_family icon-2daimashengcheng', // 代码生成配置
                'font_family icon-shujuku', // 数据源配置
                'font_family icon-moxing-miaobian', // 命名空间
                'font_family icon-moban1', // 模板配置
                'font_family icon-daima', // 代码生成

                'font_family icon-wenjianguanli1', // 文件管理
                'font_family icon-wenjianguanli', // 文件管理
                'font_family icon-wenjianshangchuan', // 文件上传

                'font_family icon-shezhi', // 系统设置
                'font_family icon-jiekouguanli', // 接口文档

                'font_family icon-shujuzidian',
                'font_family icon-Reviewsheet', // 自定义表报
                'font_family icon-quanxian2', // 权限管理
                'font_family icon-zuzhi', // 组织架构
                'font_family icon-jiaose1' // 角色管理
            ]
        }
    },
    methods: {
        handleSelectIcon(item) {
            this.$emit('handleSetIcon', item)
        }
    }
}
</script>

<style scoped lang="scss">

    .icon-list {
        overflow: hidden;
        list-style: none;
        padding: 0 !important;
        border: 1px solid #eaeefb;
        border-radius: 4px;
    }

    .icon-list li {
        display: list-item;
        float: left;
        width: 70px;
        text-align: center;
        height: 60px;
        color: #666;
        font-size: 5px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        padding-top: 5px;
        cursor: pointer;
    }

    .icon-list li span {
        line-height: normal;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        color: #99a9bf;
        transition: color .15s linear;
        vertical-align: middle;
    }

    .icon-list li i {
        display: block;
        font-size: 14px;
        margin-bottom: 5px;
        color: #606266;
        transition: color .15s linear;
    }

    .icon-list li .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em;
    }
</style>
