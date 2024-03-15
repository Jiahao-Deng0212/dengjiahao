import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// * setup 扩展插件
import vueSetupExtendPlus from 'vite-plugin-vue-setup-extend-plus';
// * 压缩静态文件插件
import compression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

const pathSrc = resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
	const env = loadEnv(config.mode, process.cwd());
	return {
		plugins: [
			vue(),
			compression(),
			vueSetupExtendPlus(),
			AutoImport({
				// Auto import functions from Vue, e.g. ref, reactive, toRef...
				// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				imports: ['vue'],

				// Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
				// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				resolvers: [
					ElementPlusResolver(),

					// Auto import icon components
					// 自动导入图标组件
					IconsResolver({
						prefix: 'Icon',
					}),
				],

				dts: resolve(pathSrc, 'auto-imports.d.ts'),
			}),

			Components({
				resolvers: [
					// Auto register icon components
					// 自动注册图标组件
					IconsResolver({
						enabledCollections: ['ep'],
					}),
					// Auto register Element Plus components
					// 自动导入 Element Plus 组件
					ElementPlusResolver(),
				],

				dts: resolve(pathSrc, 'components.d.ts'),
			}),

			Icons({
				autoInstall: true,
			}),
		],

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
