<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-12-14 14:24:19
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
body
	margin 0
</style>
