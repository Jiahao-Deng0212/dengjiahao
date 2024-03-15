<template>
	<component :is="layoutValue"></component>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/pinia/themeConfig';
import { Local } from '@/utils/storage';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onBeforeMount, onUnmounted } from 'vue';
import mittBus from '@/utils/mitt';

// 引入动态组件
const layout: any = {
	defaults: defineAsyncComponent(() => import('./main/default.vue')),
	// classic: defineAsyncComponent(() => import('./main/classic.vue')),
	// transverse: defineAsyncComponent(() => import('./main/transverse.vue')),
	// columns: defineAsyncComponent(() => import('./main/columns.vue')),
};

const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);

// 计算布局组件(响应全局配置layout)
const layoutValue = computed(() => layout[themeConfig.value.layout!]);

/**
 * TODO
 * * 适配移动端
 *
 */

const onLayoutResize = () => {
	if (!Local.setTarget('localStorage').get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
	const clientWidth = document.body.clientWidth;
	if (clientWidth <= 996) {
		themeConfig.value.isCollapse = false;
		mittBus.emit('layoutMobileResize', { layout: 'defaults', clientWidth });
	} else {
		mittBus.emit('layoutMobileResize', {
			layout: Local.setTarget('localStorage').get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
			clientWidth,
		});
	}
};

// 页面加载前
onBeforeMount(() => {
	onLayoutResize();
	window.addEventListener('resize', onLayoutResize);
});
// 页面卸载时
onUnmounted(() => {
	window.removeEventListener('resize', onLayoutResize);
});
</script>

<style scoped lang="scss"></style>
