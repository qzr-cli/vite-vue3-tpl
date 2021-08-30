<!--
 * @Date         : 2021-04-19 18:00:02
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-08-30 10:54:45
-->

<template>
  <div>
    Home
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup() {
    const $api = inject('$api')
    const $utils = inject('$utils')
    console.log($utils)
    console.log($api)
    console.log('Home')
  }
})
</script>

<style scoped lang='stylus'>

</style>
