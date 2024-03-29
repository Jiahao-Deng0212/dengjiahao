import { defineStore } from "./pinia";

export const useDemo = defineStore("ddd", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters:{
    doubleCount () {
    return  this.count*2
    }
  },
  actions: {
    increment(a) {
      this.count += 2
    },
  },
});
