<template>
	<div>
		<input type="text" />
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

defineOptions({
	name: 'home',
});

const router = useRoute();

console.log('%c [  ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', router.params, router.query);
</script>

<style scoped lang="scss"></style>
