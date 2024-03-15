<template>
	<el-menu
		router
		:default-active="state.defaultActive"
		background-color="transparent"
		:collapse="state.isCollapse"
		:unique-opened="getThemeConfig.isUniqueOpened"
		:collapse-transition="false"
	>
		<template v-for="val in routelist">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template #title>
					<!-- <SvgIcon :name="val.meta.icon" /> -->
					<!-- iconpark  -->
					<svg style="width: 20px; margin-right: 8px" class="iconpark-icon"><use :xlink:href="val.meta.icon"></use></svg>
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<svg style="width: 20px; margin-right: 8px" class="iconpark-icon"><use :xlink:href="val.meta.icon"></use></svg>
					<template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
						<span>{{ $t(val.meta.title) }}</span>
					</template>
					<template #title v-else>
						<a class="w100" @click.prevent="onALinkClick(val)">{{ $t(val.meta.title) }}</a>
					</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/pinia/themeConfig';
import other from '@/utils/other';
import { storeToRefs } from 'pinia';
import { RouteRecordRaw, onBeforeRouteUpdate, useRoute } from 'vue-router';

const SubItem = defineAsyncComponent(() => import('@/layout/navMenu/subItem.vue'));

interface Props {
	menuList: RouteRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
	menuList: () => [],
});

const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);
const route = useRoute();
const state = reactive({
	defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
	isCollapse: false,
});

// 获取菜单列表
const routelist = computed(() => {
	console.log('%c [  ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', props.menuList);
	return props.menuList;
});

// 打开外部链接
const onALinkClick = (val: RouteItem) => {
	other.handleOpenLink(val);
};

// 获取布局配置信息
const getThemeConfig = computed(() => {
	return themeConfig.value;
});

// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute: any) => {
	const { path, meta } = currentRoute;
	const pathSplit = meta?.isDynamic ? meta.isDynamicPath!.split('/') : path!.split('/');
	if (pathSplit.length >= 4 && meta?.isHide) return pathSplit.splice(0, 3).join('/');
	else return path;
};
// 页面加载时
onMounted(() => {
	state.defaultActive = setParentHighlight(route);
});
// 路由更新时
onBeforeRouteUpdate((to) => {
	// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
	state.defaultActive = setParentHighlight(to);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 1000) themeConfig.value.isCollapse = false;
});
// 设置菜单的收起/展开
watch(
	() => themeConfig.value.isCollapse,
	(isCollapse) => {
		document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = isCollapse!);
	},
	{
		immediate: true,
	}
);
</script>

<style scoped lang="scss"></style>
