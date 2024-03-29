import { RouteRecordRaw } from 'vue-router';

// 动态路由,根据roles来判断是否显示
export default <RouteRecordRaw[]>[
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home/:id',
				name: 'home',
				component: () => import('@/views/login/login.vue'),
				meta: {
					title: 'message.router.home',
					isKeepAlive: true,
					isAffix: true,
					roles: ['admin', 'common'],
					// icon: 'iconfont icon-shouye',
					icon: 'iconfont icon-shouye',
				},
			},
			// 菜单管理
			{
				path: '/menu',
				name: 'menu',
				component: () => import('@/layout/routerView/parent.vue'),
				redirect: '/menu/menu-1',
				meta: {
					title: 'message.router.menu',
					isKeepAlive: true,
					roles: ['admin', 'common'],
					icon: '#again',
				},
				children: [
					{
						path: '/menu/menu-1',
						name: 'menu1',
						redirect: '/menu/menu-1/menu-1-1',
						meta: {
							title: 'message.router.menu1',
							isKeepAlive: true,
							roles: ['admin', 'common'],
						},
						children: [
							{
								path: '/menu/menu-1/menu-1-1',
								name: 'menu11',
								component: () => import('@/views/menu/menu1/menu11.vue'),
								meta: {
									title: 'message.router.menu11',
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu-1/menu-1-2',
								name: 'menu12',
								redirect: '/menu/menu-1/menu-1-2/menu-1-2-1',
								meta: {
									title: 'message.router.menu12',
									isKeepAlive: true,
									roles: ['admin', 'common'],
								},
								children: [
									{
										path: '/menu/menu-1/menu-1-2/menu-1-2-1',
										name: 'menu121',
										component: () => import('@/views/menu/menu1/menu121.vue'),
										meta: {
											title: 'message.router.menu121',
											isAffix: false,
											isKeepAlive: true,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
									{
										path: '/menu/menu-1/menu-1-2/menu-1-2-2',
										name: 'menu122',
										component: () => import('@/views/menu/menu1/menu122.vue'),
										meta: {
											title: 'message.router.menu122',
											isAffix: false,
											isKeepAlive: true,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
								],
							},
							{
								path: '/menu/menu-1/menu-1-3',
								name: 'menu13',
								component: () => import('@/views/menu/menu1/menu13.vue'),
								meta: {
									title: 'message.router.menu13',
									isKeepAlive: true,
									isAffix: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
						],
					},
					{
						path: '/menu/menu-2',
						name: 'menu2',
						component: () => import('@/views/menu/menu2/menu2.vue'),
						meta: {
							title: 'message.router.menu2',
							isKeepAlive: true,
							isAffix: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
				],
			},
		],
	},
];
