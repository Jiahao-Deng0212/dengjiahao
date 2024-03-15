import { createApp } from 'vue';
import App from './App.vue';

import pinia from './pinia';
import router from './router';

// 添加全局守卫 beforEach
import '@/router/guardBeforeEach';

import ElementPlus from 'element-plus';

// css
import '@/theme/index.scss';
import other from './utils/other';

// 国际化
import { i18n } from '@/i18n/index';

const app = createApp(App);

// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
// 	app.component(key, component);
// }
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus).use(i18n);

app.mount('#app');
