<template>
	<el-container class="layout-container">
		<AsideC />
		<el-container class="layout-container-view h100">
			<el-scrollbar ref="scrollbarRef" class="layout-backtop">
				<HeaderC />
				<MainC ref="layoutMainRef" />
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/pinia/themeConfig';
import { NextLoading } from '@/utils/loading';
import { ElScrollbar } from 'element-plus';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const AsideC = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
const HeaderC = defineAsyncComponent(() => import('@/layout/component/header.vue'));
const MainC = defineAsyncComponent(() => import('@/layout/component/main.vue'));

/**
 * * layout：default 布局
 * & 重置滚动条高度
 */
const scrollbarRef = ref<any>();
const router = useRoute();
const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);

// 更新滚动条
const updateScrollbar = () => {
	scrollbarRef.value.update();
	scrollbarRef.value.setScrollTop(0);
};

onMounted(() => {
	// 更新滚动条
	// ! 因为子组件是异步引入，所有需要在nextTick来触发更新，否则可能拿不到引入组件的所有信息
	nextTick().then(() => {
		updateScrollbar();
		NextLoading.done(300);
	});
});

watch(
	// https://cn.vuejs.org/guide/essentials/watchers.html#basic-example
	[() => router.path, () => themeConfig.value.isTagsview, () => themeConfig.value.isFixedHeader],
	// 执行副作用
	() => {
		nextTick(() => {
			updateScrollbar();
		});
	}
);
</script>

<style scoped lang="scss"></style>
