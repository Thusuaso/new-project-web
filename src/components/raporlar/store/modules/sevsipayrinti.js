const state = {
  siparis_ozet_ayrinti: null,
};

const actions = {
  siparis_ozet_ayrinti_act({ commit }, data) {
    commit("siparis_ozet_ayrinti_mut", data);
  },
};

const mutations = {
  siparis_ozet_ayrinti_mut(state, data) {
    state.siparis_ozet_ayrinti = data;
  },
};

const getters = {
  siparis_ozet_ayrinti(state) {
    return state.siparis_ozet_ayrinti;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
