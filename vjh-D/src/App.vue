<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import { computed, ref, onMounted, onUnmounted, nextTick, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useThemeConfig } from './pinia/themeConfig';
import other from './utils/other';
import mittBus from '@/utils/mitt';
import { Local } from './utils/storage';
import setIntroduction from './utils/setIconfont';
import { storeToRefs } from 'pinia';

// 定义变量内容
const { messages, locale } = useI18n();
const setingsRef = ref();
const route = useRoute();
const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
	return other.globalComponentSize();
});
// 获取全局 i18n
const getGlobalI18n = computed(() => {
	return messages.value[locale.value];
});

// 设置初始化，iconfont
onBeforeMount(() => {
	// 设置批量第三方 icon 图标
	setIntroduction.cssCdn();
	// 设置批量第三方 js
	setIntroduction.jsCdn();
});
// 页面加载时
onMounted(() => {
	nextTick(() => {
		// 监听布局配'置弹窗点击打开
		mittBus.on('openSetingsDrawer', () => {
			setingsRef.value.openDrawer();
		});
		// 获取缓存中的布局配置
		if (Local.setTarget('localStorage').get('themeConfig')) {
			themeConfigStore.setThemeConfig(Local.setTarget('localStorage').get('themeConfig'));
			document.documentElement.style.cssText = Local.get('themeConfigStyle');
		}
	});
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
	mittBus.off('openSetingsDrawer', () => {});
});
// 监听路由的变化，设置网站标题
watch(
	() => route.path,
	() => {
		other.useTitle();
	},
	{
		deep: true,
	}
);
</script>
