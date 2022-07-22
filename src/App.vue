<!--
 * @Date         : 2021-04-19 17:49:35
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2022-07-22 09:33:58
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
import { inject, onMounted } from 'vue'
import { preFun, preDom } from '@/utils/preFun'
import { useGlobal } from '@/store/global'
import router from '@/router'

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

const keepAliveList = ref<string[]>([])
for (const item of router.options.routes) {
  if (item!.meta!.keepAlive && item!.name) {
    keepAliveList.value.push(item!.name as string)
  }
}
console.log('thissssss', keepAliveList, router.options.routes)
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
