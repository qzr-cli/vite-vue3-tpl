<!--
  * @Date         : 2022-10-31 11:03:46
  * @Description  : svg通用组件
  * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-10-31 11:57:40
-->

<template>
  <component :is="currentComponent"
             v-if="currentComponent"
             ref="svgRef"
             v-bind="$attrs"
             class="svg-raw"
             :name="name" />
</template>

<script lang='ts' setup>
import type { Component } from 'vue'
// eslint-disable-next-line no-duplicate-imports
import { useAttrs } from 'vue'

const modules = import.meta.glob('@/assets/svg/*.svg', { eager: true })

const props = withDefaults(defineProps<{ name: string }>(), {})
const attrs = useAttrs()
const instance = getCurrentInstance()

const svgRef = ref()

const currentComponent = computed<Component | undefined>(() => {
  const fileName = '/' + props.name + '.svg'
  // eslint-disable-next-line guard-for-in
  for (const path in modules) {
    const mod = modules[path]
    if (path.endsWith(fileName)) {
      return mod as Component
    }
  }
  console.log('not found svg file:' + fileName)
  return undefined
})

// data-v-hash
let scopeId = ''
if (instance?.type) {
  // __scopeId 存在的条件是 <style scoped>
  const __scopeId = (instance?.type as { __scopeId?: string })?.__scopeId
  if (__scopeId) {
    scopeId = __scopeId
  }
}

const attachAttr = async () => {
  await nextTick()
  // 取到 svg dom
  const cpt = svgRef.value
  if (!cpt) return
  const svg = cpt.$el as Element | undefined
  if (!(svg instanceof Element)) return

  // 由于svg不在vue_template里,所以初始没有添加样式隔离,需要手动给svg和所有子dom添加 data-v-hash
  if (scopeId) {
    svg.setAttribute(scopeId, '')
    svg.querySelectorAll('*').forEach((element) => {
      element.setAttribute(scopeId, '')
    })
  }
}

watch(
  () => props.name,
  async () => {
    await nextTick()
    attachAttr()
  },
  {
    immediate: true,
  },
)
</script>

<style scoped>
svg,
path {
    transition: fill 250ms;
}
</style>
