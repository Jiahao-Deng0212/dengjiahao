import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// * setup 扩展插件
import vueSetupExtendPlus from 'vite-plugin-vue-setup-extend-plus';
// * 压缩静态文件插件
import compression from 'vite-plugin-compression';

import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
	const env = loadEnv(config.mode, process.cwd());
	return {
		plugins: [vue(), compression(), vueSetupExtendPlus()],

		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},

		root: process.cwd(),

		server: {
			port: JSON.parse(env.VITE_SYSTEM_PORT),
			open: JSON.parse(env.VITE_OPEN),
		},

		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
			__NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
			__NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
		},
	};
});
