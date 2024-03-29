import { computed,ref } from "vue";
import { defineStore } from "./pinia";

export const useSetxx = defineStore("vam", () => {
  const count = ref(1);

  const double = computed(() => {
    return count.value * 2
  })

  const add = (x) => {
    count.value += x;
  };

  return { count, double,add  };
});
