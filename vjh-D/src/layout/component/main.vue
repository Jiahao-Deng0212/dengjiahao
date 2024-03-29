<template>
	<el-main class="layout-main" :style="isFixedHeader ? `height: calc(100% - ${setMainHeight})` : `minHeight: calc(100% - ${setMainHeight})`">
		<el-scrollbar
			ref="layoutMainScrollbarRef"
			class="layout-main-scroll layout-backtop-header-fixed"
			wrap-class="layout-main-scroll"
			view-class="layout-main-scroll"
		>
			<LayoutParentView />
		</el-scrollbar>
	</el-main>
</template>

<script setup lang="ts" name="layoutMain">
import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '@/pinia/tagsViewRoutes';
import { useThemeConfig } from '@/pinia/themeConfig';
import { NextLoading } from '@/utils/loading';

// 引入组件
const LayoutParentView = defineAsyncComponent(() => import('@/layout/routerView/parent.vue'));

// 定义变量内容
const layoutMainScrollbarRef = ref();
const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

// 设置 header 固定
const isFixedHeader = computed(() => {
	return themeConfig.value.isFixedHeader;
});

// 设置主内容区的高度
const setMainHeight = computed(() => {
	if (isTagsViewCurrenFull.value) return '0px';
	return '51px';
});
// 页面加载
onMounted(() => {
	NextLoading.done(600);
});

// 暴露变量
defineExpose({
	layoutMainScrollbarRef,
});
</script>
