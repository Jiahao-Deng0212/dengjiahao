/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */

// ? 干什么用的这个store

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTagsViewRoutes = defineStore('tagsViewRoutes', () => {
	const tagsViewRoutesList = ref<any[]>();
	const isTagsViewCurrenFull = ref();

	const setTagsViewRoutes = (value: any[]) => {
		tagsViewRoutesList.value = value;
	};

	const setCurrenFullscreen = (status: boolean) => {
		isTagsViewCurrenFull.value = status;
	};

	return { tagsViewRoutesList, isTagsViewCurrenFull, setTagsViewRoutes, setCurrenFullscreen };
});
