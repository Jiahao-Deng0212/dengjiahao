<template>
	<el-header class="layout-header" v-show="!isTagsViewCurrenFull">
		<NavBarsIndex />
	</el-header>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '@/pinia/tagsViewRoutes';

// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('@/layout/navBars/index.vue'));

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
</script>
