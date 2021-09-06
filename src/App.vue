<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-09-02 18:03:55
-->


<template>
  <router-view />
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'

const $api = inject('$api')
const $utils:any = inject('$utils')

console.log($utils)
console.log($api)

onMounted(() => {
  window.addEventListener('unload', e => {
    $utils.bom.cookie.del('')
  })
})
</script>

<style lang="stylus">
</style>
