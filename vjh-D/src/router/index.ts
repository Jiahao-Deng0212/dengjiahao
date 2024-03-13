import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import staticRouters from './routesRecord/static';

export default createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters],
});
