/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
interface LocalType {
	target: string;
	setTarget: (target: string) => LocalType;
	setKey: (key: string) => string;
	set: (key: string, value: any) => void;
	get: (key: string) => any;
	remove: (key: string) => void;
	clear: () => void;
}

export const Local: LocalType = {
	target: 'localStorage',
	setTarget: function (target) {
		this.target = target;
		return Local;
	},
	setKey: function (key) {
		// @ts-ignore
		return `${__NEXT_NAME__}:${key}`;
	},
	set: function (key, value) {
		if (this.target === 'localStorage') {
			window.localStorage.setItem(this.setKey(key), JSON.stringify(value));
		} else {
			window.sessionStorage.setItem(this.setKey(key), JSON.stringify(value));
		}
	},
	get: function (key) {
		let value;
		if (this.target === 'localStorage') {
			value = <string>window.localStorage.getItem(this.setKey(key));
		} else {
			value = <string>window.sessionStorage.getItem(this.setKey(key));
		}
		return JSON.parse(value);
	},
	remove: function (key) {
		if (this.target === 'localStorage') {
			window.localStorage.removeItem(this.setKey(key));
		} else {
			window.sessionStorage.removeItem(this.setKey(key));
		}
	},
	clear: function () {
		if (this.target === 'localStorage') {
			window.localStorage.clear();
		} else {
			window.sessionStorage.clear();
		}
	},
};
