import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

// 登录入参
interface LoginPrams {
	username: string;
	password: string;
}

// 用户信息
interface UserInfo {
	username: string;
	photo: string;
	token?: string;
	roles: Array<string>;
	authBtnList: Array<string>;
}

export const useUserInfo = defineStore('userInfo', () => {
	const token = ref<string>('');
	let userInfo = reactive<UserInfo>({
		username: '',
		photo: '',
		roles: [],
		authBtnList: [],
	});

	const login = async (params: LoginPrams) => {};

	const getUserInfo = async () => {
		// mock
		return new Promise((rs, rj) => {
			setTimeout(() => {
				let userName = 'admin';
				// 模拟数据
				let defaultRoles: Array<string> = [];
				let defaultAuthBtnList: Array<string> = [];
				// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
				let adminRoles: Array<string> = ['admin'];
				// admin 按钮权限标识
				let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
				// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
				let testRoles: Array<string> = ['common'];
				// test 按钮权限标识
				let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];

				// 不同用户模拟不同的用户权限
				if (userName === 'admin') {
					defaultRoles = adminRoles;
					defaultAuthBtnList = adminAuthBtnList;
				} else {
					defaultRoles = testRoles;
					defaultAuthBtnList = testAuthBtnList;
				}
				// 用户信息模拟数据
				const userInfos: UserInfo = {
					username: userName + 'D-J-H',
					photo:
						userName === 'admin'
							? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
							: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					roles: defaultRoles,
					authBtnList: defaultAuthBtnList,
				};
				Object.assign(userInfo, userInfos);
				rs(useUserInfo);
			}, 1000);
		});
	};
	return { token, userInfo, login, getUserInfo };
});
