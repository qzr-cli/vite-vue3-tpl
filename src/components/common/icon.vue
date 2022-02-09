<!--
 * @Date         : 2021-09-02 15:05:56
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-02-09 14:21:43
-->

<template>
  <svg class="icon"
       aria-hidden="true"
       :style="style">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts' setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => {}
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

const defaultColor = '#8b8b8b'
const defaultSize = '32px'

const iconName = computed(() => {
  return `#icon-${props.name}`
})

const style = computed(() => {
  return {
    ...{
      fontSize: props.size ?? defaultColor,
      color: props.color ?? defaultSize
    },
    ...props.style
  }
})
</script>

<style scoped lang='stylus'>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
