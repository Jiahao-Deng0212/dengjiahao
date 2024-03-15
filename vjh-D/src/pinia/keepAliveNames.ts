/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 Tagsview）
 * @methods addCachedView 添加要缓存的路由 names（关闭 Tagsview）
 * @methods delCachedView 删除要缓存的路由 names（关闭 Tagsview）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 Tagsview）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 Tagsview）
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteRecordName } from 'vue-router';

export const useKeepAliveNames = defineStore('keepAliveNames', () => {
	const keepAliveNames = ref<RouteRecordName[]>([]);
	const cacheViews = ref<Array<string>>([]);

	const setCacheKeepAliveNames = (data: RouteRecordName) => {
		keepAliveNames.value.push(data);
	};

	return { keepAliveNames, cacheViews, setCacheKeepAliveNames };
});
