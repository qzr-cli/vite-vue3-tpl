<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2023-07-19 11:39:12
-->


<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-left"
                appear
                mode="out-in">
      <keep-alive :include="keepAliveList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { preFun, preDom } from '@/utils/preFun'
import router from '@/router'

console.log('env', import.meta.env)

onMounted(() => {
  preFun()
  preDom()
})

const keepAliveList = ref<string[]>([])
for (const item of router.options.routes) {
  if (item!.meta!.keepAlive && item!.name) {
    keepAliveList.value.push(item!.name as string)
  }
}
</script>

<style lang="scss">
body {
	margin: 0;
}

.slide-left-enter-from {
	transform: translateX( -20px);
	opacity: 0;
}

.slide-left-enter-to {
	transform: translateX(0px);
}

.slide-left-leave-from {
	transform: translateX(0);
}

.slide-left-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.3s;
}
</style>
