<template>
  <div>
    <drawer v-if="mobile" />
    <nav-menu v-else />
  </div>
</template>
<script>
import drawer from './drawer/index'
import navMenu from './navMenu/index'
export default {
    components: {
        drawer,
        navMenu
    },
    data() {
        return {
        }
    },
    computed: {
        mobile() {
            return this.$store.getters.mobile
        }
    },
    methods: {
    }
}
</script>
