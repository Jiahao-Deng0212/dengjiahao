import pinia from '@/pinia';
import { useThemeConfig } from '@/pinia/themeConfig';
import { storeToRefs } from 'pinia';
import router from '.';

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Local } from '@/utils/storage';
Nprogress.configure({ showSpinner: false });

// ! 在use(pinia)之前需要传入pinia
const themeConfigStore = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(themeConfigStore);
// 获取是否采用前端路由
const { isRequestRoutes } = themeConfig.value;

router.beforeEach((to, from, next) => {
	Nprogress.start();
	// 获取token
	Local.setTarget('sessionStorage').set('token', 'hahahh');

	// if()
});
