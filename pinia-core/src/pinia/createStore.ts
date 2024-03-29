import { ref } from "vue";

export const SymbolPinia = Symbol();
export function createPinia() {
  const state = ref({});

  const pinia = {
    install(app: any) {
      app.provide(SymbolPinia, pinia);
    },
    state,
    _s: new Map(),
  };

  return pinia;
}
