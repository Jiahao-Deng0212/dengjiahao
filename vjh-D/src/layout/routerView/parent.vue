<template>
	<div class="layout-parent">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component style="background-color: red" :is="Component" class="w100" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/pinia/themeConfig';
import { useKeepAliveNames } from '@/pinia/keepAliveNames';
import { Local } from '@/utils/storage';

// 定义变量内容
const storesKeepAliveNames = useKeepAliveNames();
const storesThemeConfig = useThemeConfig();
const { keepAliveNames } = storeToRefs(storesKeepAliveNames);
const { themeConfig } = storeToRefs(storesThemeConfig);

// 设置主界面切换动画
const setTransitionName = computed(() => {
	return themeConfig.value.animation;
});
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return keepAliveNames.value;
});

// 页面加载时
// onMounted(() => {
// 	nextTick(() => {
// 		setTimeout(() => {
// 			if (themeConfig.value.isCacheTagsView) {
// 				let tagsViewArr: RouteItem[] = Local.setTarget('sessionStorage').get('tagsViewList') || [];
// 				cacheViews.value = tagsViewArr.filter((item) => item.meta?.isKeepAlive).map((item) => item.name as string);
// 			}
// 		}, 0);
// 	});
// });
</script>
