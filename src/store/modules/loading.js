const state = {
  fullscreenLoading:false,
};

const actions = {

  fullscreenLoadingAct({ commit }, data) {
    commit("fullscreenLoadingMut",data)
  }
};

const mutations = {

  fullscreenLoadingMut(state,data) {
    state.fullscreenLoading = data
  }
};

const getters = {
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
