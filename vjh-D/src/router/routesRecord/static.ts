import { RouteRecordRaw } from 'vue-router';

export default <Array<RouteRecordRaw>>[
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login.vue'),
		meta: {
			title: 'message.staticRoutes.login',
			isHide: false,
		},
	},
];
