import { RouteRecordRaw } from 'vue-router';

export default <Array<RouteRecordRaw>>[
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
	},
];
