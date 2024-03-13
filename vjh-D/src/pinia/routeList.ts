/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteList = defineStore('routeList', () => {
	// TODO any
	const routeList = ref<any[]>();
	const isColumnsMenuHover = ref(false);
	const isColumnsNavHover = ref(false);

	const setRouteList = (value: any) => {
		// * 如何添加未定
		routeList.value?.push(value);
	};

	const setColumnsMenuHover = (status: boolean) => {
		isColumnsMenuHover.value = status;
	};

	const setColumnsNavHover = (status: boolean) => {
		isColumnsNavHover.value = status;
	};

	return { routeList, isColumnsMenuHover, isColumnsNavHover, setRouteList, setColumnsMenuHover, setColumnsNavHover };
});
