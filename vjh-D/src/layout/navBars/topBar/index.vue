<template>
	<div class="layout-navbars-breadcrumb-index">
		<Logo v-if="false" />
		<Breadcrumb />
		<User />
	</div>
</template>

<script setup lang="ts" name="layoutBreadcrumbIndex">
import { defineAsyncComponent, watch, onMounted, nextTick, ref } from 'vue';

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const Breadcrumb = defineAsyncComponent(() => import('./breadcrumb.vue'));
const User = defineAsyncComponent(() => import('./user.vue'));
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	background: var(--next-bg-topBar);
	border-bottom: 1px solid var(--next-border-color-light);
}
</style>
