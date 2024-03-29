<template>
  <div>{{ st.count }}</div>
  <button @click="add(2)">修改</button>
  <div>{{ st.double }}</div>

  <div>{{ store.count }}</div>
  <button @click="increment(2)">修改</button>
  <div>{{ store.doubleCount() }}</div>
</template>

<script setup lang="ts">
import { useSetxx } from "./vam.js";
import { useDemo } from "./define.js";
// debugger;
const store = useDemo();
const { increment } = store;
const st = useSetxx();
const { add } = st;
</script>

<style scoped lang="scss"></style>
