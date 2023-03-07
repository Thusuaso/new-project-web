const state = {
  loading: false,
  datatableLoading: false,
  fullscreenLoading:false,
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
  fullscreenLoadingAct({ commit }, data) {
    commit("fullscreenLoadingMut",data)
  }
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
  fullscreenLoadingMut(state,data) {
    state.fullscreenLoading = data
  }
};

const getters = {
  loading(state) {
    return state.loading;
  },
  datatableLoading(state) {
    return state.datatableLoading
  },
  fullscreenLoading(state) {
    return state.fullscreenLoading
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
