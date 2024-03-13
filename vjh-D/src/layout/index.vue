<template>
	<component :is="layoutValue"></component>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/pinia/themeConfig';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent } from 'vue';

// 引入动态组件
const layout: any = {
	defaults: defineAsyncComponent(() => import('./main/default.vue')),
	classic: defineAsyncComponent(() => import('./main/classic.vue')),
	transverse: defineAsyncComponent(() => import('./main/transverse.vue')),
	columns: defineAsyncComponent(() => import('./main/columns.vue')),
};

const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);

// 计算布局组件
const layoutValue = computed(() => layout[themeConfig.value.layout]);

// * 适配移动端功能
</script>

<style scoped lang="scss"></style>
