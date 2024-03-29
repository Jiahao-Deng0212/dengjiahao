import pinia from '@/pinia';
import { useThemeConfig } from '@/pinia/themeConfig';
import { storeToRefs } from 'pinia';
import router from '.';

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Local } from '@/utils/storage';
import { initControlRoutes } from './initRouter';
import { useMenuList } from '@/pinia/menuList';
Nprogress.configure({ showSpinner: false });

const themeConfigStore = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(themeConfigStore);
// 获取是否采用前端路由
const { isRequestRoutes } = themeConfig.value;

router.beforeEach(async (to, from) => {
	if (to.meta.title) Nprogress.start();
	// 获取token
	// const token = Local.setTarget('localStorage').get('token');
	const token = 'ds';
	if (to.path === '/login' && !token) {
		// next();
		Nprogress.done();
		return true;
	} else {
		if (!token) {
			// 跳转页面是系统页面 没有权限
			// next('/login');
			Local.setTarget('sessionStorage').clear();
			Local.setTarget('localStorage').clear();
			Nprogress.done();
			return '/login';
		} else if (token && to.path === '/login') {
			// next('/login');
			Nprogress.done();
			return true;
		} else {
			// 成功
			// 检查路由列表pinia中是否有数据，有则进行正常跳转，没有则需要路由初始化(因为pinia不会存在缓存，所有没有数据就是用户初次进来)
			const menuListStore = useMenuList(pinia);
			const { menuList } = storeToRefs(menuListStore);
			if (menuList.value?.length === 0) {
				// 前端路由初始化
				await initControlRoutes();
				return to.path;
			} else {
				Nprogress.done();
				return true;
			}
		}
	}
});

router.afterEach(() => {
	window.nextLoading = false;
});
