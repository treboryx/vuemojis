import Vuemoji from "./vuemoji.vue";

const plugin = {
  install(Vue, options) {
    Vue.component(options?.name || "Emoji", Vuemoji);
  },
};

export default plugin;
