<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<TagsView />
	</div>
</template>

<script setup lang="ts">
const BreadcrumbIndex = defineAsyncComponent(() => import('@/layout/navBars/topBar/index.vue'));
const TagsView = defineAsyncComponent(() => import('@/layout/navBars/tagsView/tagsView.vue'));
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
