<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-08-31 09:57:30
-->


<template>
  <router-view />
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const $api = inject('$api')
const $utils = inject('$utils')
console.log($utils)
console.log($api)
</script>

<style lang="stylus">
</style>
