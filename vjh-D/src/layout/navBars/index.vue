<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<TagsView />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, onMounted, nextTick, ref } from 'vue';

const BreadcrumbIndex = defineAsyncComponent(() => import('@/layout/navBars/topBar/index.vue'));
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
