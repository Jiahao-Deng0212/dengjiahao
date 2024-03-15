<template>
	<div class="h100" v-show="!isTagsViewCurrenFull">
		<el-aside class="layout-aside" :class="setCollapseClass">
			<!-- <Logo /> -->
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
				<Navmenu :menuList="state.menuList" />
			</el-scrollbar>
		</el-aside>
	</div>
</template>
<script setup lang="ts">
import { useMenuList } from '@/pinia/menuList';
import { useTagsViewRoutes } from '@/pinia/tagsViewRoutes';
import { useThemeConfig } from '@/pinia/themeConfig';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onBeforeMount, reactive, ref, watch } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import mittBus from '@/utils/mitt';

type AsideState = {
	menuList: RouteRecordRaw[];
	clientWidth: number;
};

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const Navmenu = defineAsyncComponent(() => import('@/layout/navMenu/index.vue'));

/**
 * * 左侧菜单栏
 * & logo 是否显示
 * & 根据判断显示在移动端还是pc端，或者是屏幕尺寸来决定显示menu
 */
const layoutAsideScrollbarRef = ref();
const themeConfigStore = useThemeConfig();
const tagsViewRoutesStore = useTagsViewRoutes();
const menuListStore = useMenuList();
const { menuList } = storeToRefs(menuListStore);
const { themeConfig } = storeToRefs(themeConfigStore);
const { isTagsViewCurrenFull } = storeToRefs(tagsViewRoutesStore);
const state = reactive<AsideState>({
	menuList: [],
	clientWidth: 0,
});

// TODO 此处的响应式可以使用 getComputedStyle(document.documentElement).getPropertyValue(cssVariableName) 修改css变量值，来动态改变sidebar 宽度
const setCollapseClass = computed(() => {
	const { layout, isCollapse, menuBar } = themeConfig.value;
	const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff'];
	const asideBrColor = asideBrTheme.includes(menuBar!) ? 'layout-el-aside-br-color' : '';
	if (state.clientWidth <= 996) {
		// 移动端
		if (isCollapse) {
			// 开启水平折叠
			document.body.setAttribute('class', 'el-popup-parent--hidden');
			const asideEle = document.querySelector('.layout-container') as HTMLElement;
			const modeDivs = document.createElement('div');
			modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
			asideEle.appendChild(modeDivs);
			modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
		} else {
			// 关闭弹窗
			closeLayoutAsideMobileMode();
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
		}
	} else {
		// pc端
		if (isCollapse) return [asideBrColor, 'layout-aside-pc-64'];
		else return [asideBrColor, 'layout-aside-pc-220'];
	}
});

// 关闭移动端蒙版
const closeLayoutAsideMobileMode = () => {
	const el = document.querySelector('.layout-aside-mobile-mode');
	el?.setAttribute('style', 'animation: error-img-two 0.3s');
	setTimeout(() => {
		el?.parentNode?.removeChild(el);
	}, 300);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 996) themeConfig.value.isCollapse = false;
	document.body.setAttribute('class', '');
};

// 设置/过滤路由（非静态路由/是否显示在菜单中）
const setFilterRoutes = () => {
	state.menuList = filterRoutesFun(menuList.value);
};
// 路由过滤递归函数
const filterRoutesFun = (arr: RouteRecordRaw[]) => {
	return arr
		.filter((item: RouteRecordRaw) => !item.meta?.isHide)
		.map((item: RouteRecordRaw) => {
			item = Object.assign({}, item);
			if (item.children) item.children = filterRoutesFun(item.children);
			return item;
		});
};

// 页面挂在之前
onBeforeMount(() => {
	// 获取页面尺寸
	state.clientWidth = document.body.clientWidth;
	// 获取路由列表
	setFilterRoutes();

	// 监听窗口大小改变时(适配移动端)
	mittBus.on('layoutMobileResize', (res: LayoutMobileResize) => {
		state.clientWidth = res.clientWidth;
		closeLayoutAsideMobileMode();
	});
});

// 监听 themeConfig 配置文件的变化，更新菜单 el-scrollbar 的高度
watch(
	() => [themeConfig.value.isShowLogoChange, themeConfig.value.isShowLogo, themeConfig.value.layout, themeConfig.value.isClassicSplitMenu],
	([isShowLogoChange, isShowLogo]) => {
		if (isShowLogoChange !== isShowLogo) {
			if (layoutAsideScrollbarRef.value) layoutAsideScrollbarRef.value.update();
		}
	}
);

// 监听用户权限切换，用于演示 `权限管理 -> 前端控制 -> 页面权限` 权限切换不生效
watch(
	() => menuList.value,
	() => {
		setFilterRoutes();
	}
);
</script>

<style scoped lang="scss"></style>
