<template>
	<el-container class="layout-container">
		<!-- 侧边栏 -->
		<el-aside>
			<AsideC />
		</el-aside>
		<el-container class="layout-container-view h100">
			<el-scrollbar class="layout-backtop">
				<!-- 顶栏 -->
				<el-header>
					<HeaderC />
				</el-header>
				<!-- 主要内容 -->
				<el-main>
					<MainC />
				</el-main>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const AsideC = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
const HeaderC = defineAsyncComponent(() => import('@/layout/component/header.vue'));
const MainC = defineAsyncComponent(() => import('@/layout/component/main.vue'));
</script>

<style scoped lang="scss"></style>
