<!--
 * @Date         : 2021-09-02 15:05:56
 * @Description  : 通用svg模块 如修改颜色需svg文件内的fill="currentColor"
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-10-31 15:45:51
-->

<template>
  <svg class="icon"
       aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts' setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})

</script>

<style scoped lang='stylus'>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

svg {
  font-size: v-bind(size)
}

use {
  color: v-bind(color)
}
</style>
