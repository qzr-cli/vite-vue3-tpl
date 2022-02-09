<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-02-09 14:32:47
-->


<template>
  <router-view />
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { preFun, preDom } from '@/utils/preFun'
import { useGlobal } from '@/store/global'

const $api = inject('$api')
const $utils:any = inject('$utils')
const globalStore = useGlobal()

console.log($utils)
console.log($api)
console.log('env', import.meta.env)
console.log('pinia:', globalStore.env, globalStore.host)

onMounted(() => {
  preFun()
  preDom()
})
</script>

<style lang="stylus">
body
	margin 0
</style>
