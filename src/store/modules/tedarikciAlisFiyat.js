const state = {
  als_fyt: {},
};

const actions = {
  tedarikci_als_fiyati_act({ commit }, data) {
    commit("tedarikci_als_fiyati_mut", data);
  },
};

const mutations = {
  tedarikci_als_fiyati_mut(state, data) {
    state.als_fyt = data;
  },
};

const getters = {
  als_fyt(state) {
    return state.als_fyt;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
