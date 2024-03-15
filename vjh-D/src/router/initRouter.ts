import pinia from '@/pinia';
import { useUserInfo } from '@/pinia/userInfo';
import { NextLoading } from '@/utils/loading';
import { storeToRefs } from 'pinia';
import { RouteRecordName, RouteRecordRaw } from 'vue-router';
import dynamic from './routesRecord/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import errorRouters from './routesRecord/error';
import { computed } from 'vue';
import router from '.';
import { useKeepAliveNames } from '@/pinia/keepAliveNames';
import { useMenuList } from '@/pinia/menuList';
import { useTagsViewRoutes } from '@/pinia/tagsViewRoutes';

/**
 * 初始化方法，防止刷新时路由丢失（刷新重复此逻辑）
 * @method  NextLoading 界面 loading 动画开始执行
 * @method useUserInfo(pinia).setUserInfos() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initControlRoutes() {
	// 开始全局过度动画
	if (!window.nextLoading) NextLoading.start();
	// 初始化用户信息
	await useUserInfo(pinia).getUserInfo();
	// TODO 添加判断错误校色信息，已经如果有错误校色该如何处理
	await setAddRoute();

	setMenuListOrTagsViewList();
}

// 添加路由
function setAddRoute() {
	processingRoute().then((res) => {
		res.forEach((route: RouteRecordRaw) => {
			router.addRoute(route);
		});
	});
}

/**
 * 路由信息处理(扁平化路由数组 => 添加可缓存路由name到keepAliveNames(pinia) => 过滤出有角色权限的路由 => 合并错误提示路由到动态路由)
 * @returns 处理好的二级路由
 */
async function processingRoute() {
	let filterRouteEnd = <RouteRecordRaw[]>formatTwoStageRoutes(formatFlatteningRoutes(dynamic));
	console.log('%c [ filterRouteEnd ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', filterRouteEnd);
	// * 设置tagsview
	const tagsViewRoutesStore = useTagsViewRoutes(pinia);
	const { setTagsViewRoutes } = tagsViewRoutesStore;
	setTagsViewRoutes(filterRouteEnd[0].children!);

	// notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
	filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children as RouteRecordRaw[]), ...errorRouters];
	return filterRouteEnd;
}

/**
 * 路由多级嵌套数组处理成一维数组（扁平处理）
 * @param arr 初始设置动态路由
 * @returns 返回处理后的一维路由菜单数组
 */
function formatFlatteningRoutes(arr: RouteRecordRaw[]) {
	if (arr.length < 0) return false;
	let newArr = cloneDeep(arr);
	for (let i = 0; i < newArr.length; i++) {
		if (newArr[i].children) {
			newArr = newArr.slice(0, i + 1).concat(newArr[i].children as RouteRecordRaw[], newArr.slice(i + 1));
		}
	}
	return newArr;
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级,支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
function formatTwoStageRoutes(arr: RouteRecordRaw[] | boolean) {
	if (!arr) return false;
	if (Array.isArray(arr)) {
		const newArr: RouteRecordRaw[] = [];

		const keepAliveNameStore = useKeepAliveNames(pinia);
		const { setCacheKeepAliveNames } = keepAliveNameStore;

		for (let i = 0; i < (<RouteRecordRaw[]>arr).length; i++) {
			if (arr[i].path === '/') {
				newArr.push({ ...arr[i], ...{ children: [] } });
			} else {
				
				if (arr[i].path.indexOf('/:') > -1) {
					arr[i].meta!.isDynamic = true;
					arr[i].meta!.isDynamicPath = arr[i].path;
				}

				newArr[0].children?.push(arr[i]);

				// 根据isKeepAlive收集routeList
				if (arr[i].meta?.isKeepAlive) {
					setCacheKeepAliveNames(arr[i].name as RouteRecordName);
				}
			}
		}
		return newArr;
	}
}

/**
 * 获取当前用户权限标识(meta.roles)去比对路由表
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param arr formatTwoStageRoutes 返回值（已经处理成二级路由）
 * @returns 返回有当前用户权限标识的路由数组
 */
function setFilterRoute(arr: RouteRecordRaw[]) {
	if (!arr) return [];
	const hasPermissionRoutes: RouteRecordRaw[] = [];
	if (Array.isArray(arr)) {
		const userInfoStore = useUserInfo(pinia);
		const { userInfo } = storeToRefs(userInfoStore);
		const rolesList = computed(() => {
			return userInfo.value.roles;
		});

		// 过滤出权限路由
		arr.forEach((route: RouteRecordRaw) => {
			rolesList.value.forEach((role: string) => {
				route.meta?.roles?.includes(role) && hasPermissionRoutes.push(route);
			});
		});
	}
	return hasPermissionRoutes;
}

/**
 * 初始化pinia（menuList)
 * @description  根据roles设置menuListStore
 *
 */
function setMenuListOrTagsViewList() {
	const userInfoStore = useUserInfo(pinia);
	const { userInfo } = storeToRefs(userInfoStore);
	const { setMenuList } = useMenuList(pinia);
	const menuListhasPermission = filterMenuListOfRoles(dynamic[0].children!, userInfo.value.roles);
	setMenuList(menuListhasPermission);
}

/**
 * 返回过滤后有权限的dynamic router
 * @param arr dynamic router
 * @param roles 用户角色权限
 */
function filterMenuListOfRoles(arr: RouteRecordRaw[], roles: string[]) {
	let menuList: RouteRecordRaw[] = [];
	arr.forEach((route) => {
		// 判断权限
		if (isPermission(route, roles)) {
			if (route.children && route.children.length > 0) {
				route.children = filterMenuListOfRoles(route.children, roles);
			}
			menuList.push(route);
		}
	});
	return menuList;
}

// 判断是否有权限
function isPermission(route: RouteRecordRaw, roles: string[]): boolean {
	if (route.meta && route.meta.roles) {
		return route.meta.roles.some((m) => roles.includes(m));
	} else return true;
}
