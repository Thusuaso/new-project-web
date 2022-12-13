const state = {
  loading: false,
  datatableLoading: false,
};

const actions = {
  loadingBeginAct({ commit }) {
    commit("loadingBeginMut");
  },
  loadingEndAct({ commit }) {
    commit("loadingEndMut");
  },
  datatableLoadingBeginAct({ commit }) {
    commit("datatableLoadingBeginMut");
  },
  datatableLoadingEndAct({ commit }) {
    commit("datatableLoadingEndMut");
  },
};

const mutations = {
  loadingBeginMut(state) {
    state.loading = true;
  },
  loadingEndMut(state) {
    state.loading = false;
  },
  datatableLoadingBeginMut(state) {
    state.datatableLoading = true;
  },
  datatableLoadingEndMut(state) {
    state.datatableLoading = false;
  },

};

const getters = {
  loading(state) {
    return state.loading;
  },
  datatableLoading(state) {
    return state.datatableLoading
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
