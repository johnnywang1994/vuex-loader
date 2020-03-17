import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

const handleModuleKeys = function(options) {
  const { vuex } = options;
  const filtedKeys = new Set(['state', 'getters', 'mutations', 'actions']);
  const allKeys = Object.keys(vuex);
  allKeys.forEach((key) => {
    if (!filtedKeys.has(key)) {
      const {
        state: moduleState,
        getters: moduleGetters,
        mutations: moduleMutations,
        actions: moduleActions
      } = vuex[key];
      options.computed = {
        ...options.computed,
        ...(moduleState && mapState(key, moduleState)),
        ...(moduleGetters && mapGetters(key, moduleGetters))
      };
      options.methods = {
        ...options.methods,
        ...(moduleMutations && mapMutations(key, moduleMutations)),
        ...(moduleActions && mapActions(key, moduleActions))
      }
    }
  });
  return options;
};

const handleRootKeys = function(options) {
  const { state, getters, mutations, actions } = options.vuex;
  options.computed = {
    ...options.computed,
    ...(state && mapState(state)),
    ...(getters && mapGetters(getters))
  };
  options.methods = {
    ...options.methods,
    ...(mutations && mapMutations(mutations)),
    ...(actions && mapActions(actions))
  };
  return options;
};

export const bindVuex = function(options) {
  const { vuex } = options;
  if (vuex) {
    options = handleModuleKeys(options);
    options = handleRootKeys(options);
  }
  return options;
};
