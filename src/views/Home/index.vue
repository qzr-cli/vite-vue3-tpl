<!--
 * @Date         : 2021-04-19 18:00:02
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-07-22 09:35:45
-->

<template>
  <div>
    {{ home }}
    <button @click="router.push('/other')">goOther</button>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const home = ref('home')
</script>

<style scoped lang='scss'>

</style>
