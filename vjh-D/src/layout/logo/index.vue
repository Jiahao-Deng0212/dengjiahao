<template>
	<div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
		<span>{{ themeConfig.globalTitle }}</span>
	</div>
	<div class="layout-logo-size" v-else @click="onThemeConfigChange"></div>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/pinia/themeConfig';
import { storeToRefs } from 'pinia';

const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);

// 设置 logo 的显示。
const setShowLogo = computed(() => {
	let { isCollapse } = themeConfig.value;
	return !isCollapse || document.body.clientWidth < 1000;
});

// logo 点击实现菜单展开/收起
const onThemeConfigChange = () => {
	themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
};
</script>

<style scoped lang="scss">
.layout-logo {
	width: 220px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
	color: var(--el-color-primary);
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	span {
		white-space: nowrap;
		display: inline-block;
	}
	&:hover {
		span {
			color: var(--color-primary-light-2);
		}
	}
	&-medium-img {
		width: 20px;
		margin-right: 5px;
	}
}
.layout-logo-size {
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	&-img {
		width: 20px;
		margin: auto;
	}
	&:hover {
		img {
			animation: logoAnimation 0.3s ease-in-out;
		}
	}
}
</style>
