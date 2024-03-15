/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export const useMenuList = defineStore('menuList', () => {
	// TODO any
	const menuList = ref<RouteRecordRaw[]>([]);
	const isColumnsMenuHover = ref(false);
	const isColumnsNavHover = ref(false);

	const setMenuList = (value: RouteRecordRaw[]) => {
		// * 如何添加未定
		menuList.value = value;
	};

	const setColumnsMenuHover = (status: boolean) => {
		isColumnsMenuHover.value = status;
	};

	const setColumnsNavHover = (status: boolean) => {
		isColumnsNavHover.value = status;
	};

	return { menuList, isColumnsMenuHover, isColumnsNavHover, setMenuList, setColumnsMenuHover, setColumnsNavHover };
});
