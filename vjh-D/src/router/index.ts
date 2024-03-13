import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import staticRouters from './routesRecord/static';
import errorRouters from './routesRecord/error';

// 固定设置静态路由和错误提示路由
export default createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters, ...errorRouters],
});
