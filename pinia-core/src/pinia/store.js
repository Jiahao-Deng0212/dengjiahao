import { computed, getCurrentInstance, inject, reactive, toRefs } from "vue";
import { SymbolPinia } from "./createStore";

export function defineStore(idOrOptions, setup) {
  let id;
  let options;
  let isSetup = typeof setup === 'function'

  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = setup;
  } else {
    id = idOrOptions.id;
    options = idOrOptions;
  }

  function useStore() {
    const currentInstance = getCurrentInstance();
    const pinia = currentInstance && inject(SymbolPinia);

    if (!pinia._s.has(id)) {
      if(isSetup){
      // 创建组合式
      createSetupStore(id,setup,pinia )
      }else{
      // 创建选项时
      createOptionStore(id, options, pinia);
      }
    }
    return pinia._s.get(id);
  }

  return useStore;
}

function createOptionStore(id, options, pinia) {
  const { state, actions, getters = {} } = options;

  function setup() {
    pinia.state.value[id] = state ? state() : {};
    return Object.assign(
      toRefs(pinia.state.value[id]),
      actions,
      Object.keys(getters).reduce((computeds, getterKey) => {
        computeds[getterKey] = computed(() => {
          return getters[getterKey];
        });
        return computeds;
      }, {})
    );
  }
  createSetupStore(id,setup,pinia)

}

function createSetupStore(id,setup,pinia){
  const store = reactive({});

  function wrapAction(act){
    return function(){
      return act.call(store,...arguments)
    }
  }

  const setupstore = setup();

  for (let prop in setupstore) {
    const value = setupstore[prop];
    if (typeof value === "function") {
      setupstore[prop] = wrapAction(setupstore[prop]);
    }
  }

  Object.assign(store, setupstore);
  pinia._s.set(id, store);
}
